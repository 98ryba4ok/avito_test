import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface ListAdsFilters {
  page: number;
  statusFilter: string[];
  categoryFilter: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  search: string;
  sortBy: "createdAt" | "price" | "priority";
  sortOrder: "asc" | "desc";
}

export const useListAdsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [statusFilter, setStatusFilter] = useState<string[]>(
    searchParams.get("status")?.split(",") || []
  );
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(
    searchParams.get("category") ? Number(searchParams.get("category")) : undefined
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState<"createdAt" | "price" | "priority">(
    (searchParams.get("sortBy") as "createdAt" | "price" | "priority") || "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (searchParams.get("sortOrder") as "asc" | "desc") || "desc"
  );

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (statusFilter.length) params.status = statusFilter.join(",");
    if (categoryFilter) params.category = String(categoryFilter);
    if (minPrice) params.minPrice = String(minPrice);
    if (maxPrice) params.maxPrice = String(maxPrice);
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    params.page = String(page);
    setSearchParams(params);
  }, [
    search,
    statusFilter,
    categoryFilter,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    page,
    setSearchParams,
  ]);

  const resetFilters = useCallback(() => {
    setStatusFilter([]);
    setCategoryFilter(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSearch("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  }, []);

  return {
    filters: {
      page,
      statusFilter,
      categoryFilter,
      minPrice,
      maxPrice,
      search,
      sortBy,
      sortOrder,
    },
    setters: {
      setPage,
      setStatusFilter,
      setCategoryFilter,
      setMinPrice,
      setMaxPrice,
      setSearch,
      setSortBy,
      setSortOrder,
    },
    resetFilters,
  };
};
