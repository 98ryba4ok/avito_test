import { useCallback, useState } from "react";

export interface SavedFilter {
  name: string;
  url: string;
}

export const useFiltersStorage = () => {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>(() => {
    const saved = localStorage.getItem("savedFilters");
    return saved ? JSON.parse(saved) : [];
  });

  const copyURL = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL фильтров скопирован!");
  }, []);

  const saveFilter = useCallback(() => {
    const name = prompt("Введите название для фильтра:");
    if (!name) return;
    const url = window.location.href;
    const newSaved = [...savedFilters, { name, url }];
    setSavedFilters(newSaved);
    localStorage.setItem("savedFilters", JSON.stringify(newSaved));
    alert("Фильтр сохранён!");
  }, [savedFilters]);

  const applySavedFilter = useCallback((url: string) => {
    window.location.href = url;
  }, []);

  return {
    savedFilters,
    copyURL,
    saveFilter,
    applySavedFilter,
  };
};
