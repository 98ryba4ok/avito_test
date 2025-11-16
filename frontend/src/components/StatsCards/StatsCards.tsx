import React from "react";
import type { StatsSummary } from "../../types/stats";
import styles from "./StatsCards.module.css";

interface Props {
  summary: StatsSummary;
}

const StatsCards: React.FC<Props> = ({ summary }) => (
  <div className={styles.cards}>
    <div className={styles.card}>
      <h3>Всего проверено</h3>
      <p>Сегодня: {summary.totalReviewedToday}</p>
      <p>Неделя: {summary.totalReviewedThisWeek}</p>
      <p>Месяц: {summary.totalReviewedThisMonth}</p>
    </div>
    <div className={styles.card}>
      <h3>Процент решений</h3>
      <p>Одобрено: {summary.approvedPercentage}%</p>
      <p>Отклонено: {summary.rejectedPercentage}%</p>
      <p>На доработку: {summary.requestChangesPercentage}%</p>
    </div>
    <div className={styles.card}>
      <h3>Среднее время проверки</h3>
      <p>{summary.averageReviewTime} сек</p>
    </div>
  </div>
);

export default StatsCards;
