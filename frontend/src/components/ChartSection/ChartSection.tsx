import React from "react";
import styles from "./ChartSection.module.css";

interface Props {
  title: string;
  chart: React.ReactNode;
}

const ChartSection: React.FC<Props> = ({ title, chart }) => (
  <div className={styles.chartSection}>
    <h2>{title}</h2>
    <div className={styles.chartWrapper}>{chart}</div>
  </div>
);

export default ChartSection;
