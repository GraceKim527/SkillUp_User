"use client";
import React, { useState, useEffect, useRef } from "react";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import { useBanners } from "@/hooks/queries/useHome";
import Banner from "@/assets/images/main_banner.png";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";

export default function MainVisual() {
  const [currentIndex, setCurrentIndex] = useState(1); // 무한 슬라이드: 초기값 1
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 중 클릭 방지
  const sliderRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useBanners();

  // displayOrder로 정렬
  const sortedBanners =
    data && data.eventMainBannerReponseList
      ? [...data.eventMainBannerReponseList].sort(
          (a, b) => a.displayOrder - b.displayOrder,
        )
      : [];

  // 무한 슬라이드를 위한 복제: [마지막, 원본들, 첫번째]
  const extendedBanners =
    sortedBanners.length > 0
      ? [
          sortedBanners[sortedBanners.length - 1],
          ...sortedBanners,
          sortedBanners[0],
        ]
      : [];

  // API 배너 transition 끝날 때 처리
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || sortedBanners.length === 0) return;

    const handleTransitionEnd = () => {
      setIsAnimating(false); // 애니메이션 완료, 클릭 가능

      // 마지막 복제본에 도달했을 때 (첫번째 실제 배너로 점프)
      if (currentIndex === extendedBanners.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
      // 첫번째 복제본에 도달했을 때 (마지막 실제 배너로 점프)
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(sortedBanners.length);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, sortedBanners.length, extendedBanners.length]);

  // transition 상태 복원
  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [isTransitioning]);

  // 실제 페이지 번호 계산 (복제본 제외)
  const getActualIndex = (index: number, length: number) => {
    if (index === 0) return length;
    if (index === length + 1) return 1;
    return index;
  };

  // API 배너 핸들러
  const handlePrev = () => {
    if (!isTransitioning || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isTransitioning || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // API 데이터가 없거나 로딩 중이거나 에러일 경우 표시하지 않음
  if (
    isLoading ||
    error ||
    !data ||
    !data.eventMainBannerReponseList ||
    data.eventMainBannerReponseList.length === 0
  ) {
    return null;
  }

  return (
    <section id="mainVisual" className={styles.mainVisual}>
      <div className={styles.visualSlide}>
        <div
          ref={sliderRef}
          className={styles.sliderTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {extendedBanners.map((banner, index) => (
            <div key={`banner-${index}`} className={styles.slideItem}>
              <div className={styles.slideItemImage}>
                <img
                  src={banner.bannerImageUrl ?? Banner.src.toString()}
                  alt={banner.mainTitle}
                />
              </div>
              <div className={styles.slideInner}>
                <div className={styles.slideContent}>
                  <Text typography="sub2_m_18" color="primary-strong" as="p">
                    {banner.subTitle || ""}
                  </Text>
                  <Text typography="head1_m_42" color="white" as="h2">
                    {banner.mainTitle}
                  </Text>
                  <Text typography="body1_r_16" color="neutral-70" as="p">
                    {banner.description || ""}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Flex align="center" gap="12px" className={styles.paging}>
          <button
            onClick={handlePrev}
            className={styles.pagingButton}
            disabled={isAnimating}
          >
            <ChevronLeftIcon color="#fff" width={18} height={18} />
          </button>
          <Flex align="center" gap={0.1}>
            <Text typography="body2_r_14" color="white">
              {getActualIndex(currentIndex, sortedBanners.length)}
            </Text>
            <Text typography="body2_r_14" color="white">
              /
            </Text>
            <Text typography="body2_r_14" color="white">
              {sortedBanners.length}
            </Text>
          </Flex>

          <button
            onClick={handleNext}
            className={styles.pagingButton}
            disabled={isAnimating}
          >
            <ChevronRightIcon color="#fff" width={18} height={18} />
          </button>
        </Flex>
      </div>
    </section>
  );
}
