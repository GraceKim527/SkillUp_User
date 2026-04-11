// src/components/mainSection/RecentEvents/index.tsx
// 최근 본 행사
"use client";
import { useRef } from "react";
import Flex from "@/components/common/Flex";
import EventCardSkeleton from "@/components/common/EventCardSkeleton";
import styles from "./styles.module.css";
import EventCard from "@/components/common/EventCard";
import Text from "@/components/common/Text";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useRecentEvents } from "@/hooks/queries/useHome";
import { Event } from "@/types/event";
import { useIsCompactLayout } from "@/hooks/useMediaQuery";

export default function RecentEvent() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isCompactLayout = useIsCompactLayout();

  // API 데이터 가져오기
  const { data, isLoading, error } = useRecentEvents();

  // 데이터가 없으면 섹션 전체를 렌더링하지 않음
  if (!isLoading && (!data || data.length === 0)) {
    return null;
  }

  const getCardWidth = () => {
    if (!carouselRef.current) return 0;
    const firstCard = carouselRef.current.querySelector(
      `.${styles.carouselItem}`,
    ) as HTMLElement;
    if (!firstCard) return 0;
    const cardWidth = firstCard.offsetWidth;
    const gap = 12; // 0.75rem = 12px
    return cardWidth + gap;
  };

  const prev = () => {
    if (carouselRef.current) {
      const scrollAmount = getCardWidth() * 3; // 3개씩 이동
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const next = () => {
    if (carouselRef.current) {
      const scrollAmount = getCardWidth() * 3; // 3개씩 이동
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // 모바일/태블릿 헤더
  const renderMobileHeader = () => (
    <Flex direction="column" gap="0.25rem" className={styles.sectionHeader}>
      <Text typography="label4_m_12" color="primary-strong">
        최근 본 행사
      </Text>
      <Text typography="head3_m_24" color="black" className={styles.mobileTitle}>
        관심있게 본 행사를
        <br />
        다시 만나보세요
      </Text>
    </Flex>
  );

  // 데스크톱 헤더
  const renderDesktopHeader = () => (
    <Flex direction="column" gap="0.5rem">
      <Text typography="sub2_m_18" color="primary-strong">
        최근 본 행사
      </Text>
      <Flex>
        <Text typography="head5_sb_42" color="black">
          관심있게 본 행사
        </Text>
        <Text typography="head1_m_42" color="black">
          를 다시 만나보세요
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Flex
      as="section"
      className={styles.recentEvent}
      aria-labelledby="recent-title"
      gap={isCompactLayout ? "1.25rem" : "2.5rem"}
      direction="column"
    >
      {isCompactLayout ? renderMobileHeader() : renderDesktopHeader()}

      <div className={styles.carouselWrapper}>
        {isLoading ? (
          <Flex gap="0.75rem">
            {[1, 2, 3, 4].map((i) => (
              <EventCardSkeleton
                key={i}
                variant="full"
                imageHeight="240px"
                className={styles.skeletonCard}
              />
            ))}
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-70">
              데이터를 불러오는데 실패했습니다.
            </Text>
          </Flex>
        ) : (
          <div ref={carouselRef} className={styles.carouselContainer}>
            {data?.map((item: Event) => (
              <div key={item.id} className={styles.carouselItem}>
                <EventCard
                  size={isCompactLayout ? "medium" : "large"}
                  event={item}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Flex align="center" justify="space-between" className={styles.bottomRow}>
        <Flex align="center" gap="1.25rem">
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.lightBtn}`}
            onClick={prev}
            aria-label="이전 페이지"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.darkBtn}`}
            onClick={next}
            aria-label="다음 페이지"
          >
            <ChevronRightIcon color="#fff" />
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
}
