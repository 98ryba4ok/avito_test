import React from "react";
import styles from "./SavedFiltersPanel.module.css";
import type { SavedFilter } from "../../hooks/useFiltersStorage";

interface SavedFiltersPanelProps {
  savedFilters: SavedFilter[];
  onCopyURL: () => void;
  onSaveFilter: () => void;
  onApplySavedFilter: (url: string) => void;
}

const SavedFiltersPanel: React.FC<SavedFiltersPanelProps> = ({
  savedFilters,
  onCopyURL,
  onSaveFilter,
  onApplySavedFilter,
}) => {
  return (
    <div className={styles.savedFiltersPanel}>
      <button onClick={onCopyURL}>Скопировать URL фильтров</button>
      <button onClick={onSaveFilter}>Сохранить набор фильтров</button>
      {savedFilters.length > 0 && (
        <>
          <label>Сохранённые фильтры:</label>
          <select onChange={(e) => e.target.value && onApplySavedFilter(e.target.value)}>
            <option value="">Выбрать фильтр</option>
            {savedFilters.map((f, idx) => (
              <option key={idx} value={f.url}>
                {f.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default SavedFiltersPanel;
