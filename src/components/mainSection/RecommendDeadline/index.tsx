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
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

export default function RecommendDeadline() {
  const { data, isLoading, error } = useEndingSoonEvents(4);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // 모바일/태블릿 헤더
  const renderMobileHeader = () => (
    <Flex direction="column" gap="0.25rem">
      <Text typography="head3_m_24" color="white">
        곧 신청 마감되는 행사에요
      </Text>
    </Flex>
  );

  // 데스크톱 헤더
  const renderDesktopHeader = () => (
    <Flex direction="column" gap="1rem">
      <Flex>
        <Text typography="head5_sb_42" color="white">
          곧 신청 마감되는 행사
        </Text>
        <Text typography="head1_m_42" color="white">
          에요
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <section className={styles.deadlineSection}>
      <Flex
        direction="column"
        gap={isMobile || isTablet ? "1.25rem" : "2.5rem"}
        className={styles.inner}
      >
        {/* 섹션 헤더 */}
        {isMobile || isTablet ? renderMobileHeader() : renderDesktopHeader()}

        {/* 카드 캐러셀 영역 */}
        <div className={styles.carouselWrapper}>
          {isLoading ? (
            <div className={styles.carouselContainer}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <Skeleton
                    height={isMobile ? "160px" : "212px"}
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
            </div>
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
            <div className={styles.carouselContainer}>
              {data.homeEventResponseList.map((item: Event) => (
                <div key={item.id} className={styles.carouselItem}>
                  <EventCard size="medium" event={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Flex>
    </section>
  );
}
