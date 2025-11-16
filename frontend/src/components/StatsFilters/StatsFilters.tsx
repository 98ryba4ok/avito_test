import React from "react";
import styles from "./StatsFilters.module.css";

interface StatsFiltersProps {
  period: "today" | "week" | "month";
  setPeriod: (p: "today" | "week" | "month") => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
}

const StatsFilters: React.FC<StatsFiltersProps> = ({
  period,
  setPeriod,
  onExportCSV,
  onExportPDF,
}) => (
  <div className={styles.filters}>
    {["today", "week", "month"].map((p) => (
      <button
        key={p}
        className={period === p ? styles.activeFilter : ""}
        onClick={() => setPeriod(p as "today" | "week" | "month")}
      >
        {p === "today" ? "Сегодня" : p === "week" ? "Последние 7 дней" : "Последние 30 дней"}
      </button>
    ))}
    <button onClick={onExportCSV}>Скачать CSV</button>
    <button onClick={onExportPDF}>Скачать PDF</button>
  </div>
);

export default StatsFilters;
