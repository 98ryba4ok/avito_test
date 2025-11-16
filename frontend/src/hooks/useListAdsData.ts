import { useCallback, useEffect, useState } from "react";
import { fetchAds } from "../api/ads";
import type { AdsResponse, FetchAdsParams } from "../api/ads";
import type { Advertisement } from "../types/ads";
import { PAGE_LIMIT, REFRESH_INTERVAL } from "../utils/listAdsConstants";
import type { ListAdsFilters } from "./useListAdsFilters";

export const useListAdsData = (filters: ListAdsFilters) => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [newAds, setNewAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const loadAds = useCallback(async () => {
    setLoading(true);
    try {
      const params: FetchAdsParams = {
        page: filters.page,
        limit: PAGE_LIMIT,
        status: filters.statusFilter.length ? filters.statusFilter : undefined,
        categoryId: filters.categoryFilter,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        search: filters.search || undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };
      const data: AdsResponse = await fetchAds(params);
      setAds(data.ads);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalItems);

      if (!categories.length) {
        const uniqueCategories: { id: number; name: string }[] = [];
        data.ads.forEach((ad) => {
          if (!uniqueCategories.find((c) => c.id === ad.categoryId)) {
            uniqueCategories.push({ id: ad.categoryId, name: ad.category });
          }
        });
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error("Error loading ads:", err);
    } finally {
      setLoading(false);
    }
  }, [
    filters.page,
    filters.statusFilter,
    filters.categoryFilter,
    filters.minPrice,
    filters.maxPrice,
    filters.search,
    filters.sortBy,
    filters.sortOrder,
    categories.length,
  ]);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!ads.length) return;

      try {
        const data: AdsResponse = await fetchAds({
          page: filters.page,
          limit: PAGE_LIMIT,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          status: filters.statusFilter.length ? filters.statusFilter : undefined,
          categoryId: filters.categoryFilter,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search || undefined,
        });

        setAds((prev) => prev.map((ad) => data.ads.find((a) => a.id === ad.id) || ad));

        const existingIds = new Set(ads.map((ad) => ad.id));
        const freshAds = data.ads.filter((ad) => !existingIds.has(ad.id));
        if (freshAds.length) setNewAds(freshAds);
      } catch (err) {
        console.error("Auto-refresh error:", err);
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [
    ads,
    filters.page,
    filters.statusFilter,
    filters.categoryFilter,
    filters.minPrice,
    filters.maxPrice,
    filters.search,
    filters.sortBy,
    filters.sortOrder,
  ]);

  const showNewAds = () => {
    setAds((prev) => [...newAds, ...prev]);
    setNewAds([]);
  };

  return {
    ads,
    newAds,
    loading,
    totalPages,
    totalItems,
    categories,
    showNewAds,
    loadAds,
  };
};
