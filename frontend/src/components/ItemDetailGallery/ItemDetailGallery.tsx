import React from "react";
import type { Advertisement } from "../../types/ads";
import styles from "./ItemDetailGallery.module.css";

interface ItemDetailGalleryProps {
  images: string[];
  selectedImage: string | null;
  onSelectImage: (image: string) => void;
  title: string;
}

const ItemDetailGallery: React.FC<ItemDetailGalleryProps> = ({
  images,
  selectedImage,
  onSelectImage,
  title,
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <img
          src={selectedImage || "https://placehold.co/400x300"}
          alt="main"
          className={styles.mainImage}
        />
      </div>
      <div className={styles.thumbs}>
        {images.map((img) => (
          <img
            key={img}
            src={img}
            alt="thumb"
            className={styles.thumb}
            onClick={() => onSelectImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemDetailGallery;
