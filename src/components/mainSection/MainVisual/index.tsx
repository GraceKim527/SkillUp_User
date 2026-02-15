"use client";
import React, { useState, useEffect, useRef } from "react";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import { useBanners } from "@/hooks/queries/useHome";
import Banner from "@/assets/images/main_banner.png";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";

export default function MainVisual() {
  const [currentIndex, setCurrentIndex] = useState(1); // 무한 슬라이드: 초기값 1
  const [isTransitioning, setIsTransitioning] = useState(false); // 초기 마운트 시 transition 비활성화
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 중 클릭 방지
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // 마운트 상태 추적
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
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
      if (currentIndex === sortedBanners.length + 1) {
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
  }, [currentIndex, sortedBanners.length]);

  // 초기 마운트 후 transition 활성화
  useEffect(() => {
    if (!isLoading && sortedBanners.length > 0 && !isMounted) {
      // 첫 렌더링 후 약간의 딜레이를 주고 transition 활성화
      const timer = setTimeout(() => {
        setIsMounted(true);
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading, sortedBanners.length, isMounted]);

  // transition 상태 복원 (무한 슬라이드 점프 후)
  useEffect(() => {
    if (isMounted && !isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [isTransitioning, isMounted]);

  // 실제 페이지 번호 계산 (복제본 제외)
  const getActualIndex = (index: number, length: number) => {
    if (index === 0) return length;
    if (index === length + 1) return 1;
    return index;
  };

  // API 배너 핸들러
  const handlePrev = () => {
    if (!isTransitioning || isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isTransitioning || isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating || sortedBanners.length <= 1) return;
    setIsDragging(true);
    setIsTransitioning(false);
    dragStartXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartXRef.current);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const threshold = 80;
    const moved = dragOffset;

    setIsDragging(false);
    setIsTransitioning(true);
    setDragOffset(0);

    if (Math.abs(moved) < threshold) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (moved > 0 ? prev - 1 : prev + 1));
  };

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <section id="mainVisual" className={styles.mainVisual}>
        <div
          className={styles.skeletonBg}
          style={{ backgroundColor: "var(--fill-normal, #ddd)" }}
        >
          <div className={styles.slideInner}>
            <div className={styles.slideContent}>
              <Skeleton width="120px" height="20px" borderRadius="4px" />
              <Flex direction="column" gap="4px">
                <Skeleton width="468px" height="50px" borderRadius="4px" />
                <Skeleton width="240px" height="50px" borderRadius="4px" />
              </Flex>
              <Flex direction="column" gap="6px">
                <Skeleton width="305px" height="26px" borderRadius="4px" />
                <Skeleton width="148px" height="26px" borderRadius="4px" />
              </Flex>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // API 데이터가 없거나 에러일 경우 표시하지 않음
  if (
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
          className={`${styles.sliderTrack} ${isDragging ? styles.dragging : ""}`}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          style={{
            transform:
              dragOffset === 0
                ? `translateX(-${currentIndex * 100}%)`
                : `calc(-${currentIndex * 100}% + ${dragOffset}px)`,
            transition:
              isTransitioning && !isDragging ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {extendedBanners.map((banner, index) => (
            <div key={`banner-${index}`} className={styles.slideItem}>
              <div className={styles.slideItemImage}>
                <img
                  src={banner.bannerImageUrl ?? Banner.src.toString()}
                  alt={banner.mainTitle}
                  draggable={false}
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
