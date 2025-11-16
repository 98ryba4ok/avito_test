import React from "react";
import styles from "./BulkPanel.module.css";

interface BulkPanelProps {
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
}

const BulkPanel: React.FC<BulkPanelProps> = ({
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onApprove,
  onReject,
  onRequestChanges,
}) => {
  return (
    <div className={styles.bulkPanel}>
      <button onClick={onSelectAll}>Выбрать все</button>
      <button onClick={onDeselectAll}>Снять выделение</button>
      <button disabled={selectedCount === 0} onClick={onApprove}>
        Одобрить выбранные
      </button>
      <button disabled={selectedCount === 0} onClick={onReject}>
        Отклонить выбранные
      </button>
      <button disabled={selectedCount === 0} onClick={onRequestChanges}>
        Вернуть на доработку
      </button>
      <span>Выбрано: {selectedCount}</span>
    </div>
  );
};

export default BulkPanel;
