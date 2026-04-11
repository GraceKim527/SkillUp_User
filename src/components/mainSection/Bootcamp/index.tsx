// src/components/mainSection/Bootcamp/index.tsx

"use client";
import EventCard from "@/components/common/EventCard";
import EventCardSkeleton from "@/components/common/EventCardSkeleton";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Tab from "@/components/common/Tab";
import Text from "@/components/common/Text";
import { useCategoryEvents } from "@/hooks/queries/useHome";
import { EVENT_CATEGORY } from "@/constants/event";
import { Event } from "@/types/event";
import {
  JOB_CATEGORY,
  JOB_CATEGORY_TABS,
  getJobCategoryByLabel,
  getJobCategoryLabel,
} from "@/constants/category";
import { useState } from "react";
import { JobCategory } from "@/constants/category";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

export default function Bootcamp() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>(
    JOB_CATEGORY.ALL,
  );
  // API 데이터 가져오기 (부트캠프 카테고리, 4개)
  const { data, isLoading, error } = useCategoryEvents(
    EVENT_CATEGORY.BOOTCAMP_CLUB,
    selectedCategory,
    4,
    1,
  );

  // 모바일/태블릿 헤더
  const renderMobileHeader = () => (
    <Flex direction="column" gap="0.75rem" className={styles.sectionHeader}>
      <Flex direction="column" gap="0.25rem">
        <Text typography="label4_m_12" color="primary-light">
          부트캠프
        </Text>
        <Text
          typography="head3_m_24"
          color="white"
          className={styles.mobileTitle}
        >
          지금 모집중인 부트캠프
        </Text>
      </Flex>
      <Tab
        tabs={JOB_CATEGORY_TABS}
        defaultIndex={JOB_CATEGORY_TABS.indexOf(
          getJobCategoryLabel(selectedCategory),
        )}
        onChange={(_index, label) => {
          const category = getJobCategoryByLabel(label);
          setSelectedCategory(category);
        }}
        theme="dark"
      />
    </Flex>
  );

  // 데스크톱 헤더
  const renderDesktopHeader = () => (
    <Flex justify="space-between" align="flex-end" gap="2.5rem">
      <Flex direction="column">
        <Text typography="sub2_m_18" color="primary-strong">
          부트캠프
        </Text>
        <Flex gap="0.5rem">
          <Text typography="head1_m_42" color="white">
            지금
          </Text>
          <Text typography="head5_sb_42" color="white">
            모집중인 부트캠프
          </Text>
        </Flex>
      </Flex>

      <Tab
        tabs={JOB_CATEGORY_TABS}
        defaultIndex={JOB_CATEGORY_TABS.indexOf(
          getJobCategoryLabel(selectedCategory),
        )}
        onChange={(_index, label) => {
          const category = getJobCategoryByLabel(label);
          setSelectedCategory(category);
        }}
        theme="dark"
      />
    </Flex>
  );

  const isEmpty =
    !isLoading && !error && (!data?.homeEventResponseList?.length);

  if (isEmpty) return null;

  return (
    <Flex
      as="section"
      className={styles.bootcampSection}
      aria-labelledby="recent-title"
    >
      <Flex
        direction="column"
        gap={isMobile || isTablet ? "1.25rem" : "2.5rem"}
        className={styles.inner}
      >
        {isMobile || isTablet ? renderMobileHeader() : renderDesktopHeader()}

        {isLoading ? (
          <Flex gap="0.75rem">
            {[1, 2, 3, 4].map((i) => (
              <EventCardSkeleton
                key={i}
                variant="compact"
                imageHeight="212px"
                className={styles.skeletonCard}
              />
            ))}
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-95">
              데이터를 불러오는데 실패했습니다.
            </Text>
          </Flex>
        ) : (
          <div className={styles.carouselWrapper}>
            <div className={styles.carouselContainer}>
              {data?.homeEventResponseList?.map((item: Event) => (
                <div key={item.id} className={styles.carouselItem}>
                  <EventCard size="medium" event={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Flex>
    </Flex>
  );
}
