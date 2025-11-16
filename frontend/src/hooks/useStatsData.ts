import { useState, useEffect } from "react";
import type { StatsSummary, ActivityData, DecisionsData, CategoriesData } from "../types/stats";

import {
  fetchStatsSummary,
  fetchActivityData,
  fetchDecisionsData,
  fetchCategoriesData,
} from "../api/statsApi";

export const useStatsData = (period: "today" | "week" | "month") => {
  const [summary, setSummary] = useState<StatsSummary | null>(null);
  const [activity, setActivity] = useState<ActivityData[]>([]);
  const [decisions, setDecisions] = useState<DecisionsData | null>(null);
  const [categories, setCategories] = useState<CategoriesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [summaryData, activityData, decisionsData, categoriesData] = await Promise.all([
          fetchStatsSummary(period),
          fetchActivityData(period),
          fetchDecisionsData(period),
          fetchCategoriesData(period),
        ]);

        setSummary(summaryData);
        setActivity(activityData);
        setDecisions(decisionsData);
        setCategories(categoriesData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Неизвестная ошибка");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return { summary, activity, decisions, categories, loading, error };
};
