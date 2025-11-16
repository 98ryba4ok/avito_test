import React, { useRef, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { exportCSV, exportPDF } from "../../utils/export";
import StatsFilters from "../../components/StatsFilters/StatsFilters";
import StatsCards from "../../components/StatsCards/StatsCards";
import ChartSection from "../../components/ChartSection/ChartSection";

import {
  getActivityChartData,
  getDecisionsChartData,
  getCategoriesChartData,
} from "../../utils/chartData";
import { getPeriodLabel } from "../../utils/period";
import { useStatsData } from "../../hooks/useStatsData";

import styles from "./Stats.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Stats: React.FC = () => {
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");
  const pdfRef = useRef<HTMLDivElement>(null);

  const { summary, activity, decisions, categories, loading, error } = useStatsData(period);

  return (
    <div className={styles.container}>
      <StatsFilters
        period={period}
        setPeriod={setPeriod}
        onExportCSV={() => summary && exportCSV(summary, period)}
        onExportPDF={() => pdfRef.current && exportPDF(pdfRef.current, period)}
      />

      <div ref={pdfRef}>
        <h1 className={styles.title}>Статистика модератора</h1>
        <div className={styles.periodLabel}>{getPeriodLabel(period)}</div>

        {loading && <p>Загрузка данных...</p>}
        {!loading && error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            {summary && <StatsCards summary={summary} />}

            {activity.length > 0 && (
              <ChartSection
                title="Активность по дням"
                chart={
                  <Bar
                    data={getActivityChartData(activity)}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                }
              />
            )}

            {decisions && (
              <ChartSection
                title="Распределение решений"
                chart={
                  <Pie
                    data={getDecisionsChartData(decisions)!}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                }
              />
            )}

            {categories && (
              <ChartSection
                title="График по категориям"
                chart={
                  <Bar
                    data={getCategoriesChartData(categories)!}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;
