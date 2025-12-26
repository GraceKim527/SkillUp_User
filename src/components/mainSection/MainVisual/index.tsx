"use client";
import React, { useState } from "react";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";
import { useBanners } from "@/hooks/useHome";
import Banner from "@/assets/images/main_banner.jpg";

export default function MainVisual() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, error } = useBanners();

  // API 데이터가 없거나 로딩 중이거나 에러일 경우 기본 배너 표시
  if (
    isLoading ||
    error ||
    !data ||
    !data.homeBannerResponseList ||
    data.homeBannerResponseList.length === 0
  ) {
    return (
      <section id="mainVisual" className={styles.mainVisual}>
        <div className={styles.visualSlide}>
          <Image src={Banner} alt="비주얼 배너" fill priority />
        </div>
      </section>
    );
  }

  // displayOrder로 정렬
  const sortedBanners = [...data.homeBannerResponseList].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  const currentBanner = sortedBanners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sortedBanners.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === sortedBanners.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="mainVisual" className={styles.mainVisual}>
      <div className={styles.visualSlide}>
        <Image
          src={currentBanner.bannerImageUrl}
          alt={currentBanner.title}
          fill
          priority
        />

        <Flex align="center" gap="12px" className={styles.paging}>
          <button onClick={handlePrev}>&lt;</button>
          <span className={styles.current}>{currentIndex + 1}</span>/
          <span>{sortedBanners.length}</span>
          <button onClick={handleNext}>&gt;</button>
        </Flex>
      </div>
    </section>
  );
}
