import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { approveAd, rejectAd, requestChanges } from "../api/adById";
import type { Advertisement } from "../types/ads";

export const useItemDetailActions = (ad: Advertisement | null) => {
  const navigate = useNavigate();

  const handleApprove = useCallback(async () => {
    if (!ad) return;
    try {
      await approveAd(ad.id);
      alert("Объявление одобрено");
      navigate("/");
    } catch {
      alert("Ошибка при одобрении");
    }
  }, [ad, navigate]);

  const handleReject = useCallback(
    async (reason: string, comment: string) => {
      if (!ad) return;
      if (!reason) return alert("Выберите причину отклонения");
      try {
        await rejectAd(ad.id, { reason, comment });
        alert("Объявление отклонено");
        navigate("/");
      } catch {
        alert("Ошибка при отклонении");
      }
    },
    [ad, navigate]
  );

  const handleRequestChanges = useCallback(
    async (reason: string, comment: string) => {
      if (!ad) return;
      if (!reason) return alert("Выберите причину запроса изменений");
      try {
        await requestChanges(ad.id, { reason, comment });
        alert("Запрос изменений отправлен");
        navigate("/");
      } catch {
        alert("Ошибка при запросе изменений");
      }
    },
    [ad, navigate]
  );

  return {
    handleApprove,
    handleReject,
    handleRequestChanges,
  };
};
