// src/components/mainSection/Bootcamp/index.tsx

"use client";
import EventCard from "@/components/common/EventCard";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
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
import CautionIcon from "@/assets/icons/CautionIcon";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

export default function Bootcamp() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>(
    JOB_CATEGORY.ALL
  );
  // API 데이터 가져오기 (부트캠프 카테고리, 4개)
  const { data, isLoading, error } = useCategoryEvents(
    EVENT_CATEGORY.BOOTCAMP_CLUB,
    selectedCategory,
    4,
    1
  );

  // 모바일/태블릿 헤더
  const renderMobileHeader = () => (
    <Flex direction="column" gap="0.75rem" className={styles.sectionHeader}>
      <Flex direction="column" gap="0.25rem">
        <Text typography="label4_m_12" color="primary-normal">
          부트캠프
        </Text>
        <Text typography="head3_m_24" color="white" className={styles.mobileTitle}>
          지금 모집중인 부트캠프
        </Text>
      </Flex>
      <TabMenu
        tabs={JOB_CATEGORY_TABS}
        defaultIndex={JOB_CATEGORY_TABS.indexOf(
          getJobCategoryLabel(selectedCategory)
        )}
        onChange={(selected: string) => {
          const category = getJobCategoryByLabel(selected);
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

      <TabMenu
        tabs={JOB_CATEGORY_TABS}
        defaultIndex={JOB_CATEGORY_TABS.indexOf(
          getJobCategoryLabel(selectedCategory)
        )}
        onChange={(selected: string) => {
          const category = getJobCategoryByLabel(selected);
          setSelectedCategory(category);
        }}
        theme="dark"
      />
    </Flex>
  );

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
              <div key={i} className={styles.skeletonCard}>
                <Skeleton
                  height="212px"
                  width="100%"
                  borderRadius="8px 8px 0 0"
                />
                <Flex
                  direction="column"
                  gap="28px"
                  style={{ padding: "16px", flex: 1 }}
                >
                  <Flex direction="column" gap="12px">
                    <Flex direction="column" gap="4px">
                      <Skeleton width="103px" height="24px" borderRadius="100px" />
                      <Skeleton width="100%" height="36px" borderRadius="100px" />
                    </Flex>
                    <Flex direction="column" gap="6px">
                      <Skeleton width="224px" height="18px" borderRadius="100px" />
                      <Skeleton width="224px" height="18px" borderRadius="100px" />
                    </Flex>
                  </Flex>
                  <Flex gap="8px" align="center">
                    <Skeleton width="121px" height="28px" borderRadius="100px" />
                    <Skeleton width="28px" height="28px" borderRadius="100px" />
                  </Flex>
                </Flex>
              </div>
            ))}
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-95">
              데이터를 불러오는데 실패했습니다.
            </Text>
          </Flex>
        ) : !data ||
          !data.homeEventResponseList ||
          data.homeEventResponseList.length === 0 ? (
          <Flex
            justify="center"
            align="center"
            gap={0.5}
            direction="column"
            className={styles.empty}
          >
            <CautionIcon color="#9B9B9B" />
            <Text typography="head4_sb_20" color="white">
              지금 모집 중인 부트캠프가 없어요
            </Text>
            <Text typography="body2_r_14" color="neutral-60" align="center">
              원하는 행사가 있다면 <br /> 상단의 문의하기를 통해 문의해주세요.
            </Text>
          </Flex>
        ) : (
          <div className={styles.carouselWrapper}>
            <div className={styles.carouselContainer}>
              {data.homeEventResponseList.map((item: Event) => (
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
