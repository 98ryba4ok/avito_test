import styles from "../pages/ItemDetail/ItemDetail.module.css";

export const QUICK_REASONS = [
  "Запрещённый товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

export const ACTION_MAP: Record<string, { label: string; className: string }> = {
  approved: {
    label: "Одобрено",
    className: styles.itemDetail__status + " " + styles["itemDetail__status--approved"],
  },
  rejected: {
    label: "Отклонено",
    className: styles.itemDetail__status + " " + styles["itemDetail__status--rejected"],
  },
  requestChanges: {
    label: "Вернули на доработку",
    className: styles.itemDetail__status + " " + styles["itemDetail__status--requestChanges"],
  },
};
