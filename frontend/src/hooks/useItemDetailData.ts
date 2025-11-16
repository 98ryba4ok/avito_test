import { useEffect, useState } from "react";
import { fetchAdById } from "../api/adById";
import { axiosClient } from "../api/axiosClient";
import type { Advertisement } from "../types/ads";
import { AxiosError } from "axios";

interface AdsListResponse {
  ads: Advertisement[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const useItemDetailData = (adId: number | undefined) => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    if (!adId) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAdById(adId, controller.signal);
        setAd(data);
        setSelectedImage(data.images[0] || null);
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.code === "ERR_CANCELED") return;
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [adId]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTotalItems = async () => {
      try {
        const res = await axiosClient.get<AdsListResponse>("/ads", {
          params: { limit: 1 },
          signal: controller.signal,
        });
        setTotalItems(res.data.pagination.totalItems);
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.code === "ERR_CANCELED") return;
        console.error(err);
      }
    };

    fetchTotalItems();
    return () => controller.abort();
  }, []);

  return {
    ad,
    loading,
    selectedImage,
    setSelectedImage,
    totalItems,
  };
};
