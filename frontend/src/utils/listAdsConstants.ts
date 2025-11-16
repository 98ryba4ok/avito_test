export const QUICK_REASONS = [
  "Запрещённый товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

export const STATUS_TRANSLATE: Record<string, string> = {
  pending: "На модерации",
  approved: "Одобрено",
  rejected: "Отклонено",
  draft: "Черновик",
};

export const STATUS_COLOR_MAP: Record<string, string> = {
  pending: "gray",
  approved: "green",
  rejected: "red",
  draft: "gray",
};

export const REFRESH_INTERVAL = 10000;
export const PAGE_LIMIT = 10;
