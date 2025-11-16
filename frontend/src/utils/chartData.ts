import type { ActivityData, DecisionsData, CategoriesData } from "../types/stats";

export const getActivityChartData = (activity: ActivityData[]) => ({
  labels: activity.map((a) => a.date),
  datasets: [
    { label: "Одобрено", data: activity.map((a) => a.approved), backgroundColor: "#1a73e8" },
    { label: "Отклонено", data: activity.map((a) => a.rejected), backgroundColor: "#e53935" },
    {
      label: "На доработку",
      data: activity.map((a) => a.requestChanges),
      backgroundColor: "#fbc02d",
    },
  ],
});

export const getDecisionsChartData = (decisions: DecisionsData | null) =>
  decisions
    ? {
        labels: ["Одобрено", "Отклонено", "На доработку"],
        datasets: [
          {
            data: [decisions.approved, decisions.rejected, decisions.requestChanges],
            backgroundColor: ["#1a73e8", "#e53935", "#fbc02d"],
          },
        ],
      }
    : null;

export const getCategoriesChartData = (categories: CategoriesData | null) =>
  categories
    ? {
        labels: Object.keys(categories),
        datasets: [
          {
            label: "Объявления по категориям",
            data: Object.values(categories),
            backgroundColor: "#1a73e8",
          },
        ],
      }
    : null;
