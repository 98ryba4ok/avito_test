import React from "react";
import styles from "./ReasonModal.module.css";

interface ReasonModalProps {
  title: string;
  reason: string;
  setReason: (r: string) => void;
  comment: string;
  setComment: (c: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  reasons?: string[];
}

const DEFAULT_REASONS = [
  "Запрещённый товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

const ReasonModal: React.FC<ReasonModalProps> = ({
  title,
  reason,
  setReason,
  comment,
  setComment,
  onSubmit,
  onCancel,
  reasons = DEFAULT_REASONS,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={styles.select}
        >
          <option value="">Выберите причину</option>
          {reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <textarea
          className={styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Комментарий (необязательно)"
        />
        <div className={styles.buttons}>
          <button onClick={onCancel}>Отмена</button>
          <button onClick={onSubmit}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;
