import React from "react";
import type { ModerationHistory } from "../../types/ads";
import styles from "./ItemDetailHistory.module.css";
import { ACTION_MAP } from "../../utils/itemDetailConstants";

interface ItemDetailHistoryProps {
  history: ModerationHistory[];
}

const ItemDetailHistory: React.FC<ItemDetailHistoryProps> = ({ history }) => {
  return (
    <div className={styles.historySection}>
      <h2>История модерации</h2>
      <ul className={styles.historyList}>
        {history.length === 0 && <li>Нет записей</li>}
        {history.map((h: ModerationHistory) => {
          const action = ACTION_MAP[h.action];
          return (
            <li key={h.id} className={styles.historyItem}>
              <p className={styles.moderatorName}>{h.moderatorName}</p>
              {h.reason && <p className={styles.reason}>Причина: {h.reason}</p>}
              {h.comment && <p className={styles.comment}>Комментарий: {h.comment}</p>}
              <span className={action.className}>{action.label}</span>
              <p className={styles.timestamp}>Дата: {new Date(h.timestamp).toLocaleString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemDetailHistory;
