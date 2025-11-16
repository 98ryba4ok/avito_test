import React, { useState, useEffect, useRef } from "react";
import styles from "./Filters.module.css";

interface FiltersProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string[];
  setStatusFilter: (val: string[]) => void;
  categories: { id: number; name: string }[];
  categoryFilter?: number;
  setCategoryFilter: (val?: number) => void;
  minPrice?: number;
  maxPrice?: number;
  setMinPrice: (val?: number) => void;
  setMaxPrice: (val?: number) => void;
  sortBy: "createdAt" | "price" | "priority";
  setSortBy: (val: "createdAt" | "price" | "priority") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (val: "asc" | "desc") => void;
  onReset: () => void;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
  { value: "draft", label: "Черновик" },
];
const SORT_OPTIONS = [
  { value: "createdAt", label: "Дата создания" },
  { value: "price", label: "Цена" },
  { value: "priority", label: "Приоритет" },
] as const;
const ORDER_OPTIONS = [
  { value: "asc", label: "По возрастанию" },
  { value: "desc", label: "По убыванию" },
] as const;

const Filters: React.FC<FiltersProps> = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  categories,
  categoryFilter,
  setCategoryFilter,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onReset,
}) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [statusOpen, setStatusOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [localMin, setLocalMin] = useState(minPrice ?? "");
  const [localMax, setLocalMax] = useState(maxPrice ?? "");

  const statusRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setSearch(localSearch), 800);
    return () => clearTimeout(handler);
  }, [localSearch, setSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setMinPrice(localMin === "" ? undefined : Number(localMin));
    }, 800);
    return () => clearTimeout(handler);
  }, [localMin, setMinPrice]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setMaxPrice(localMax === "" ? undefined : Number(localMax));
    }, 800);
    return () => clearTimeout(handler);
  }, [localMax, setMaxPrice]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setStatusOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node))
        setCategoryOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) setOrderOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStatus = (value: string) => {
    if (statusFilter.includes(value)) {
      setStatusFilter(statusFilter.filter((v) => v !== value));
    } else {
      setStatusFilter([...statusFilter, value]);
    }
  };

  return (
    <div className={styles.filters}>
      <input
        ref={searchRef}
        type="text"
        placeholder="Поиск..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />

      <div className={styles.multiSelect} ref={statusRef}>
        <div className={styles.selected} onClick={() => setStatusOpen(!statusOpen)}>
          {statusFilter.length > 0
            ? STATUS_OPTIONS.filter((o) => statusFilter.includes(o.value))
                .map((o) => o.label)
                .join(", ")
            : "Статус"}
          <span className={styles.arrow}>{statusOpen ? "▲" : "▼"}</span>
        </div>
        {statusOpen && (
          <div className={styles.dropdown}>
            {STATUS_OPTIONS.map((opt) => (
              <label key={opt.value} className={styles.option}>
                <input
                  type="checkbox"
                  checked={statusFilter.includes(opt.value)}
                  onChange={() => toggleStatus(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div
        className={styles.singleSelect}
        ref={categoryRef}
        onClick={() => setCategoryOpen(!categoryOpen)}
      >
        <div className={styles.selected}>
          {categories.find((c) => c.id === categoryFilter)?.name || "Все категории"}
          <span className={styles.arrow}>{categoryOpen ? "▲" : "▼"}</span>
        </div>
        {categoryOpen && (
          <div className={styles.dropdown}>
            <div
              className={styles.option}
              onClick={() => {
                setCategoryFilter(undefined);
                setCategoryOpen(false);
              }}
            >
              Все категории
            </div>
            {categories.map((c) => (
              <div
                key={c.id}
                className={styles.option}
                onClick={() => {
                  setCategoryFilter(c.id);
                  setCategoryOpen(false);
                }}
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="number"
        placeholder="Мин. цена"
        value={localMin}
        onChange={(e) => setLocalMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Макс. цена"
        value={localMax}
        onChange={(e) => setLocalMax(e.target.value)}
      />

      <div className={styles.singleSelect} ref={sortRef} onClick={() => setSortOpen(!sortOpen)}>
        <div className={styles.selected}>
          {SORT_OPTIONS.find((s) => s.value === sortBy)?.label || "Сортировка"}
          <span className={styles.arrow}>{sortOpen ? "▲" : "▼"}</span>
        </div>
        {sortOpen && (
          <div className={styles.dropdown}>
            {SORT_OPTIONS.map((s) => (
              <div
                key={s.value}
                className={styles.option}
                onClick={() => {
                  setSortBy(s.value);
                  setSortOpen(false);
                }}
              >
                {s.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.singleSelect} ref={orderRef} onClick={() => setOrderOpen(!orderOpen)}>
        <div className={styles.selected}>
          {ORDER_OPTIONS.find((o) => o.value === sortOrder)?.label || "Порядок"}
          <span className={styles.arrow}>{orderOpen ? "▲" : "▼"}</span>
        </div>
        {orderOpen && (
          <div className={styles.dropdown}>
            {ORDER_OPTIONS.map((o) => (
              <div
                key={o.value}
                className={styles.option}
                onClick={() => {
                  setSortOrder(o.value);
                  setOrderOpen(false);
                }}
              >
                {o.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={onReset}>Сбросить фильтры</button>
    </div>
  );
};

export default Filters;
