export const getPeriodLabel = (period: "today" | "week" | "month") =>
  period === "today"
    ? "Период: Сегодня"
    : period === "week"
      ? "Период: Последние 7 дней"
      : "Период: Последние 30 дней";
