import React from "react";
import { useNavigate } from "react-router-dom";
import type { Advertisement } from "../../types/ads";
import { STATUS_TRANSLATE, STATUS_COLOR_MAP } from "../../utils/listAdsConstants";
import styles from "./AdsList.module.css";

interface AdsListProps {
  ads: Advertisement[];
  loading: boolean;
  selectedAds: Set<number>;
  onSelectAd: (id: number) => void;
}

const AdsList: React.FC<AdsListProps> = ({ ads, loading, selectedAds, onSelectAd }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.grid}>
      {loading
        ? Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className={styles.cardSkeleton}></div>
          ))
        : ads.map((ad) => {
            const statusText = STATUS_TRANSLATE[ad.status] || ad.status;
            const statusColor = STATUS_COLOR_MAP[ad.status] || "gray";
            return (
              <div key={ad.id} className={styles.card}>
                <input
                  type="checkbox"
                  className={styles.cardCheckbox}
                  checked={selectedAds.has(ad.id)}
                  onChange={() => onSelectAd(ad.id)}
                />
                <div className={styles.imageWrapper}>
                  <img
                    src={ad.images?.[0] || "https://placehold.co/300x200"}
                    alt={ad.title}
                    className={styles.image}
                  />
                  {ad.priority === "urgent" && <div className={styles.urgentIcon}>🔥</div>}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.titleAd}>{ad.title}</h3>
                  <div className={styles.bottomInfo}>
                    <p className={styles.price}>{ad.price} ₽</p>
                    <p className={styles.category}>{ad.category}</p>
                    <p style={{ color: statusColor, fontWeight: 600 }}>{statusText}</p>
                    <button className={styles.openBtn} onClick={() => navigate(`/item/${ad.id}`)}>
                      Открыть
                    </button>
                  </div>
                </div>
                <div className={styles.date}>{new Date(ad.createdAt).toLocaleDateString()}</div>
              </div>
            );
          })}
    </div>
  );
};

export default AdsList;
