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
export default function Bootcamp() {
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

  return (
    <Flex
      as="section"
      className={styles.bootcampSection}
      aria-labelledby="recent-title"
    >
      <Flex direction="column" gap="2.5rem" className={styles.inner}>
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

        {isLoading ? (
          <Flex gap="0.75rem">
            {[1, 2, 3, 4].map((i) => (
              <Flex key={i} direction="column" gap="0.5rem" style={{ flex: 1 }}>
                <Skeleton height="280px" borderRadius="0.75rem" />
                <Skeleton height="1.5rem" width="85%" />
                <Skeleton height="1rem" width="65%" />
              </Flex>
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
          <Flex gap="0.75rem">
            {data.homeEventResponseList.map((item: Event) => (
              <EventCard key={item.id} size="medium" event={item} />
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
