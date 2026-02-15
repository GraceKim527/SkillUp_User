// src/components/mainSection/RecommendNow/index.tsx
// 지금 주목받고 있어요

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Flex from "@/components/common/Flex";
import EventCard from "@/components/common/EventCard";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";
import { useFeaturedEvents } from "@/hooks/queries/useHome";
import { Event } from "@/types/event";
import {
  JobCategory,
  JOB_CATEGORY,
  JOB_CATEGORY_TABS,
  getJobCategoryByLabel,
} from "@/constants/category";
import { EVENT_SORT_OPTIONS } from "@/constants/event";
import { useScrollCarousel } from "@/hooks/useScrollCarousel";
import { useIsDesktop, useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

export default function RecommendNow() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>(
    JOB_CATEGORY.ALL,
  );

  // API 데이터 가져오기
  const { data, isLoading, error } = useFeaturedEvents(selectedCategory);

  // 스크롤 캐러셀 훅 사용
  const { carouselRef, prev, next } = useScrollCarousel({
    gap: isMobile ? 8 : 12, // 모바일: 8px, 데스크톱: 12px
    cardSelector: `.${styles.carouselItem}`,
    scrollCount: isMobile ? 1 : 3, // 모바일: 1개씩, 데스크톱: 3개씩
  });

  const handleMoreClick = () => {
    router.push(`/conference?sort=${EVENT_SORT_OPTIONS.POPULARITY}`);
  };

  // 모바일/태블릿에서 헤더 구조 분리
  const renderMobileHeader = () => (
    <Flex direction="column" gap="0.75rem" className={styles.sectionHeader}>
      <Flex direction="column" gap="0.25rem">
        <Text typography="label4_m_12" color="primary-strong">
          추천행사
        </Text>
        <div className={styles.titleRow}>
          <Text typography="head3_m_24" color="black">
            지금 주목받고 있어요
          </Text>
          <button
            type="button"
            className={styles.moreBtn}
            onClick={handleMoreClick}
          >
            더보기
            <ChevronRightIcon width={16} height={16} color="var(--Neutral-40)" />
          </button>
        </div>
      </Flex>
      <TabMenu
        tabs={JOB_CATEGORY_TABS}
        defaultIndex={0}
        onChange={(selected: string) => {
          const category = getJobCategoryByLabel(selected);
          setSelectedCategory(category);
        }}
        theme="light"
      />
    </Flex>
  );

  const renderDesktopHeader = () => (
    <Flex justify="space-between" align="flex-end">
      <Flex direction="column" gap="0.5rem">
        <Text typography="sub2_m_18" color="primary-strong">
          추천행사
        </Text>
        <Flex gap="0.5rem">
          <Text typography="head1_m_42" color="black">
            지금
          </Text>
          <Text typography="head5_sb_42" color="black">
            주목받고 있어요
          </Text>
        </Flex>
      </Flex>
      <TabMenu
        tabs={JOB_CATEGORY_TABS}
        defaultIndex={0}
        onChange={(selected: string) => {
          const category = getJobCategoryByLabel(selected);
          setSelectedCategory(category);
        }}
        theme="light"
      />
    </Flex>
  );

  return (
    <section className={styles.recommendNow}>
      <Flex direction="column" gap={isMobile ? "1rem" : "2.5rem"}>
        {/* 섹션 헤더 */}
        {isMobile || isTablet ? renderMobileHeader() : renderDesktopHeader()}

        <div className={styles.carouselWrapper}>
          {isLoading ? (
            <Flex gap="0.75rem">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <Skeleton
                    height="240px"
                    width="100%"
                    borderRadius="8px 8px 0 0"
                  />
                  <Flex
                    direction="column"
                    gap="12px"
                    style={{ padding: "16px", flex: 1 }}
                  >
                    <Flex direction="column" gap="4px">
                      <Skeleton width="103px" height="24px" borderRadius="100px" />
                      <Skeleton width="100%" height="36px" borderRadius="100px" />
                    </Flex>
                    <Flex direction="column" gap="6px">
                      <Skeleton width="224px" height="18px" borderRadius="100px" />
                      <Skeleton width="224px" height="18px" borderRadius="100px" />
                    </Flex>
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{ marginTop: "auto" }}
                    >
                      <Skeleton width="121px" height="28px" borderRadius="100px" />
                      <Skeleton width="102px" height="36px" borderRadius="4px" />
                    </Flex>
                  </Flex>
                </div>
              ))}
            </Flex>
          ) : error ? (
            <Flex
              justify="center"
              align="center"
              style={{ minHeight: "300px" }}
            >
              <Text typography="body1_r_16" color="neutral-70">
                데이터를 불러오는데 실패했습니다.
              </Text>
            </Flex>
          ) : !data ||
            !data.homeEventResponseList ||
            data.homeEventResponseList.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              style={{ minHeight: "300px" }}
            >
              <Text typography="body1_r_16" color="neutral-70">
                표시할 행사가 없습니다.
              </Text>
            </Flex>
          ) : (
            <div ref={carouselRef} className={styles.carouselContainer}>
              {data.homeEventResponseList.map((item: Event) => (
                <div key={item.id} className={styles.carouselItem}>
                  <EventCard
                    size="medium"
                    event={item}
                    className={styles.carouselItem}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Flex
          align="center"
          justify="space-between"
          className={styles.bottomRow}
        >
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

          <Flex justify="center">
            {isDesktop && ( <button
                type="button"
                className={styles.moreBtn}
                onClick={handleMoreClick}
              >
                IT 인기 행사 더보기
              </button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
}
