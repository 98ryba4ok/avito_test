import { axiosClient } from "./axiosClient";
import type { Advertisement, Pagination } from "../types/ads";

export interface AdsResponse {
  ads: Advertisement[];
  pagination: Pagination;
}

export interface FetchAdsParams {
  page?: number;
  limit?: number;
  status?: string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "createdAt" | "price" | "priority";
  sortOrder?: "asc" | "desc";
  signal?: AbortSignal;
}

export const fetchAds = async (params: FetchAdsParams = {}): Promise<AdsResponse> => {
  const { signal, ...restParams } = params;
  const res = await axiosClient.get("/ads", {
    params: restParams,
    signal,
  });
  return res.data;
};
