import { axiosClient } from "./axiosClient";
import type { Advertisement } from "../types/ads";

export const fetchAdById = async (id: number, signal?: AbortSignal): Promise<Advertisement> => {
  const res = await axiosClient.get(`/ads/${id}`, { signal });
  return res.data;
};

export const approveAd = async (id: number) => {
  const res = await axiosClient.post(`/ads/${id}/approve`);
  return res.data;
};

export const rejectAd = async (
  id: number,
  body: { reason: string; comment?: string },
  signal?: AbortSignal
) => {
  const res = await axiosClient.post(`/ads/${id}/reject`, body, { signal });
  return res.data;
};

export const requestChanges = async (
  id: number,
  body: { reason: string; comment?: string },
  signal?: AbortSignal
) => {
  const res = await axiosClient.post(`/ads/${id}/request-changes`, body, { signal });
  return res.data;
};
