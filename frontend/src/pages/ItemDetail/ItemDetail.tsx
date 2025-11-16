import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItemDetailData } from "../../hooks/useItemDetailData";
import { useItemDetailActions } from "../../hooks/useItemDetailActions";
import { useItemDetailKeyboard } from "../../hooks/useItemDetailKeyboard";
import { QUICK_REASONS } from "../../utils/itemDetailConstants";
import ItemDetailGallery from "../../components/ItemDetailGallery/ItemDetailGallery";
import ItemDetailInfo from "../../components/ItemDetailInfo/ItemDetailInfo";
import ItemDetailHistory from "../../components/ItemDetailHistory/ItemDetailHistory";
import ItemDetailActions from "../../components/ItemDetailActions/ItemDetailActions";
import ReasonModal from "../../components/ReasonModal/ReasonModal";
import styles from "./ItemDetail.module.css";

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const { ad, loading, selectedImage, setSelectedImage, totalItems } = useItemDetailData(
    id ? Number(id) : undefined
  );
  const { handleApprove, handleReject, handleRequestChanges } = useItemDetailActions(ad);
  const { goPrev, goNext } = useItemDetailKeyboard({
    id,
    totalItems,
    showRejectModal,
    showRequestModal,
    onApprove: handleApprove,
    onReject: () => {
      setShowRejectModal(true);
      setReason("");
      setComment("");
    },
  });

  if (loading) return <div>Загрузка...</div>;
  if (!ad) return <div>Объявление не найдено</div>;

  return (
    <div className={styles.itemDetail__container}>
      <h1>{ad.title}</h1>

      <ItemDetailGallery
        images={ad.images}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
        title={ad.title}
      />

      <ItemDetailInfo ad={ad} />

      <ItemDetailHistory history={ad.moderationHistory} />

      <ItemDetailActions
        onApprove={handleApprove}
        onReject={() => {
          setShowRejectModal(true);
          setReason("");
          setComment("");
        }}
        onRequestChanges={() => {
          setShowRequestModal(true);
          setReason("");
          setComment("");
        }}
        onGoBack={() => navigate("/")}
        onGoPrev={goPrev}
        onGoNext={goNext}
        disablePrev={Number(id) <= 1}
        disableNext={Number(id) >= totalItems}
      />

      {showRejectModal && (
        <ReasonModal
          title="Отклонить объявление"
          reason={reason}
          setReason={setReason}
          comment={comment}
          setComment={setComment}
          onCancel={() => setShowRejectModal(false)}
          onSubmit={() => {
            handleReject(reason, comment);
            setShowRejectModal(false);
          }}
          reasons={QUICK_REASONS}
        />
      )}

      {showRequestModal && (
        <ReasonModal
          title="Вернуть на доработку"
          reason={reason}
          setReason={setReason}
          comment={comment}
          setComment={setComment}
          onCancel={() => setShowRequestModal(false)}
          onSubmit={() => {
            handleRequestChanges(reason, comment);
            setShowRequestModal(false);
          }}
          reasons={QUICK_REASONS}
        />
      )}
    </div>
  );
};

export default ItemDetail;
