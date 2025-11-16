import { axiosClient } from "./axiosClient";
import type { StatsSummary, ActivityData, DecisionsData, CategoriesData } from "../types/stats";

export const fetchStatsSummary = (period: string, signal?: AbortSignal) =>
  axiosClient
    .get<StatsSummary>(`/stats/summary`, { params: { period }, signal })
    .then((r) => r.data);

export const fetchActivityData = (period: string, signal?: AbortSignal) =>
  axiosClient
    .get<ActivityData[]>(`/stats/chart/activity`, { params: { period }, signal })
    .then((r) => r.data);

export const fetchDecisionsData = (period: string, signal?: AbortSignal) =>
  axiosClient
    .get<DecisionsData>(`/stats/chart/decisions`, { params: { period }, signal })
    .then((r) => r.data);

export const fetchCategoriesData = (period: string, signal?: AbortSignal) =>
  axiosClient
    .get<CategoriesData>(`/stats/chart/categories`, { params: { period }, signal })
    .then((r) => r.data);
