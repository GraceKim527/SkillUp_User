// src/components/myPage/profile/ProfileImageUploader/index.tsx

"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { PenIcon } from "@/assets/icons/PenIcon";
import { useRef } from "react";
import logoDefaultImg from "@/assets/images/logoDefaultImg.png";

interface ProfileImageUploaderProps {
  imageUrl: string;
  onChangeImage: (file: File) => void;
}

export default function ProfileImageUploader({
  imageUrl,
  onChangeImage,
}: ProfileImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChangeImage(file);
    }
  };

  // 유효한 이미지 URL인지 확인
  const isValidUrl = imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http://') || imageUrl.startsWith('https://'));

  return (
    <div className={styles.wrapper}>
      <Image
        src={isValidUrl ? imageUrl : logoDefaultImg}
        alt="Profile"
        width={120}
        height={120}
        className={styles.profileImg}
      />
      <button className={styles.editBtn} onClick={handleClick}>
        <PenIcon fillColor="none" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
}
