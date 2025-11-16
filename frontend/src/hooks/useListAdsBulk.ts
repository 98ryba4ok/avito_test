import { useCallback, useState } from "react";
import { approveAd, rejectAd, requestChanges } from "../api/adById";

export const useListAdsBulk = (onSuccess: () => void) => {
  const [selectedAds, setSelectedAds] = useState<Set<number>>(new Set());
  const [bulkAction, setBulkAction] = useState<"reject" | "requestChanges" | null>(null);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const toggleSelectAd = (id: number) => {
    setSelectedAds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const selectAllAds = useCallback((ids: number[]) => {
    setSelectedAds(new Set(ids));
  }, []);

  const deselectAllAds = useCallback(() => {
    setSelectedAds(new Set());
  }, []);

  const handleBulkApprove = useCallback(async () => {
    if (!window.confirm("Одобрить выбранные объявления?")) return;
    for (const id of selectedAds) {
      await approveAd(id);
    }
    alert("Выбранные объявления одобрены");
    setSelectedAds(new Set());
    onSuccess();
  }, [selectedAds, onSuccess]);

  const handleBulkActionSubmit = useCallback(async () => {
    if (!reason) return alert("Выберите причину");
    for (const id of selectedAds) {
      if (bulkAction === "reject") await rejectAd(id, { reason, comment });
      if (bulkAction === "requestChanges") await requestChanges(id, { reason, comment });
    }
    alert(
      bulkAction === "reject" ? "Выбранные объявления отклонены" : "Запрос изменений отправлен"
    );
    setSelectedAds(new Set());
    setBulkAction(null);
    setReason("");
    setComment("");
    onSuccess();
  }, [selectedAds, bulkAction, reason, comment, onSuccess]);

  const clearBulkAction = useCallback(() => {
    setBulkAction(null);
    setReason("");
    setComment("");
  }, []);

  return {
    selectedAds,
    bulkAction,
    reason,
    comment,
    toggleSelectAd,
    selectAllAds,
    deselectAllAds,
    setBulkAction,
    setReason,
    setComment,
    handleBulkApprove,
    handleBulkActionSubmit,
    clearBulkAction,
  };
};
