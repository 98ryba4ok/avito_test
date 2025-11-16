import React from "react";
import type { Advertisement } from "../../types/ads";
import styles from "./ItemDetailInfo.module.css";

interface ItemDetailInfoProps {
  ad: Advertisement;
}

const ItemDetailInfo: React.FC<ItemDetailInfoProps> = ({ ad }) => {
  return (
    <div className={styles.infoSection}>
      <div className={styles.description}>
        <h2>Описание</h2>
        <p>{ad.description}</p>
      </div>

      <div className={styles.characteristics}>
        <h2>Характеристики</h2>
        <table className={styles.characteristicsTable}>
          <tbody>
            {Object.entries(ad.characteristics).map(([key, value]) => (
              <tr key={key}>
                <td className={styles.charKey}>{key}</td>
                <td className={styles.charValue}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemDetailInfo;
