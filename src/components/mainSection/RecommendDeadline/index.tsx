// 신청 마감 행사
"use client";
import Flex from "@/components/common/Flex";
import EventCard from "@/components/common/EventCard";
import Skeleton from "@/components/common/Skeleton";
import Text from "@/components/common/Text";
import styles from "./styles.module.css";
import { useEndingSoonEvents } from "@/hooks/queries/useHome";
import { Event } from "@/types/event";
import CautionIcon from "@/assets/icons/CautionIcon";

export default function RecommendDeadline() {
  const { data, isLoading, error } = useEndingSoonEvents(4);

  return (
    <section className={styles.deadlineSection}>
      <Flex direction="column" gap="2.5rem" className={styles.inner}>
        <Flex direction="column" gap="1rem">
          <Text typography="label1_r_18" color="neutral-95">
            SEE THE LIVE REVIEWS OF THE EVENT
          </Text>
          <Flex>
            <Text typography="head5_sb_42" color="white">
              곧 신청 마감되는 행사
            </Text>
            <Text typography="head1_m_42" color="white">
              에요
            </Text>
          </Flex>
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
        ) : !data.homeEventResponseList ||
          data.homeEventResponseList.length === 0 ? (
          <Flex justify="center" align="center" className={styles.empty}>
            <Flex direction="column" gap={0.5} align="center">
              <CautionIcon color="#9B9B9B" />
              <Text typography="head4_sb_20" color="white">
                곧 신청 마감되는 행사가 없어요
              </Text>
              <Text typography="body2_r_14" color="neutral-60" align="center">
                원하는 행사가 있다면 <br /> 상단의 문의하기를 통해 문의해주세요.
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Flex gap="0.75rem">
            {data.homeEventResponseList.map((item: Event) => (
              <EventCard key={item.id} size="medium" event={item} />
            ))}
          </Flex>
        )}
      </Flex>
    </section>
  );
}
