import React from "react";
import styles from "./ItemDetailActions.module.css";

interface ItemDetailActionsProps {
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  onGoBack: () => void;
  onGoPrev: () => void;
  onGoNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const ItemDetailActions: React.FC<ItemDetailActionsProps> = ({
  onApprove,
  onReject,
  onRequestChanges,
  onGoBack,
  onGoPrev,
  onGoNext,
  disablePrev,
  disableNext,
}) => {
  return (
    <div className={styles.actionsContainer}>
      <div className={styles.moderationActions}>
        <button
          className={`${styles.btn} ${styles["btn--approve"]}`}
          onClick={onApprove}
          title="Hotkey: A"
        >
          Одобрить
        </button>
        <button
          className={`${styles.btn} ${styles["btn--changes"]}`}
          onClick={onRequestChanges}
          title="Hotkey: R"
        >
          Вернуть на доработку
        </button>
        <button
          className={`${styles.btn} ${styles["btn--reject"]}`}
          onClick={onReject}
          title="Hotkey: D"
        >
          Отклонить
        </button>
      </div>

      <div className={styles.navigationActions}>
        <button onClick={onGoBack}>← Назад к списку</button>
        <button onClick={onGoPrev} disabled={disablePrev} title="Hotkey: S or ArrowLeft">
          ← Предыдущее
        </button>
        <button onClick={onGoNext} disabled={disableNext} title="Hotkey: W or ArrowRight">
          Следующее →
        </button>
      </div>
    </div>
  );
};

export default ItemDetailActions;
