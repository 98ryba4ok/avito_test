import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UseItemDetailKeyboardProps {
  id: string | undefined;
  totalItems: number;
  showRejectModal: boolean;
  showRequestModal: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export const useItemDetailKeyboard = ({
  id,
  totalItems,
  showRejectModal,
  showRequestModal,
  onApprove,
  onReject,
}: UseItemDetailKeyboardProps) => {
  const navigate = useNavigate();

  const goPrev = useCallback(() => {
    const prevId = Number(id) - 1;
    if (prevId >= 1) navigate(`/item/${prevId}`);
  }, [id, navigate]);

  const goNext = useCallback(() => {
    const nextId = Number(id) + 1;
    if (nextId <= totalItems) navigate(`/item/${nextId}`);
  }, [id, totalItems, navigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showRejectModal || showRequestModal) return;

      if (e.key.toLowerCase() === "a") onApprove();
      if (e.key.toLowerCase() === "d") onReject();
      if (e.key === "w" || e.key === "ArrowRight") goNext();
      if (e.key === "s" || e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showRejectModal, showRequestModal, onApprove, onReject, goNext, goPrev]);

  return {
    goPrev,
    goNext,
  };
};
