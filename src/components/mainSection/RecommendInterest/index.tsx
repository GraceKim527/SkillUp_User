// src/components/mainSection/RecommendInterest/index.tsx

// 관심있어하실 행사
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import IconButton from "@/components/common/IconButton";
import Text from "@/components/common/Text";
import { useRecommendedEvents } from "@/hooks/queries/useHome";
import { Event } from "@/types/event";
import { useAuth } from "@/hooks/useAuth";
import LoginImage from "@/assets/images/loginImg.png";
import { useIsCompactLayout } from "@/hooks/useMediaQuery";
import { getCategoryPath } from "@/utils/format";

export default function RecommendInterest() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const isCompactLayout = useIsCompactLayout();
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<number>>(
    new Set(),
  );

  // API 데이터 가져오기 (Hook은 항상 먼저 호출)
  const { data, isLoading, error } = useRecommendedEvents();

  // 비로그인 시 섹션을 렌더링하지 않음
  if (!isAuthenticated) {
    return null;
  }

  // 로딩 완료 후 행사가 없으면 섹션을 렌더링하지 않음
  if (!isLoading && (!data || !data.events || data.events.length === 0)) {
    return null;
  }

  const handleBookmarkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    eventId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleCardClick = (event: Event) => {
    const { path } = getCategoryPath(event.category);
    router.push(`${path}/${event.id}`);
  };

  // API에서 받아온 해시태그 사용
  const keywords = data?.hashTags || [];

  // 모바일/태블릿 헤더 렌더링
  const renderMobileHeader = () => (
    <Flex direction="column" gap="0.75rem" className={styles.sectionHeader}>
      <Flex direction="column" gap="0.25rem">
        <Text typography="label4_m_12" color="neutral-95">
          HERE&apos;S AN EVENTS YOU MIGHT BE INTERESTED IN
        </Text>
        <Text typography="head3_m_24" color="white" as="h2">
          관심있어하실 행사를
          <br />
          골라왔어요
        </Text>
      </Flex>
      <Flex wrap="wrap" gap="0.25rem" className={styles.keywordScroll}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} width="60px" height="28px" borderRadius="4px" />
            ))}
          </>
        ) : (
          keywords.map((kw, i) => (
            <span key={i} className={styles.keywordBtn}>
              {kw}
            </span>
          ))
        )}
      </Flex>
    </Flex>
  );

  // 데스크톱 헤더 렌더링
  const renderDesktopHeader = () => (
    <Flex direction="column" gap="1.5rem">
      <Flex direction="column" gap="1rem">
        <Text typography="label1_r_18" color="neutral-95">
          HERE&apos;S EVENTS YOU MIGHT BE INTERESTED IN
        </Text>
        <Flex direction="column">
          <Flex gap="0.5rem">
            <Text typography="head5_sb_42" color="white">
              관심있어하실
            </Text>
            <Text typography="head1_m_42" color="white">
              행사를
            </Text>
          </Flex>
          <Text typography="head1_m_42" color="white">
            골라왔어요
          </Text>
        </Flex>
      </Flex>

      <Flex wrap="wrap" gap="0.5rem" className={styles.keywordBox}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} width="80px" height="34px" borderRadius="4px" />
            ))}
          </>
        ) : (
          keywords.map((kw, i) => (
            <span key={i} className={styles.keywordBtn}>
              {kw}
            </span>
          ))
        )}
      </Flex>
    </Flex>
  );

  return (
    <section className={styles.interestSection}>
      <Flex
        justify="space-between"
        align="flex-start"
        gap={isCompactLayout ? "1.25rem" : "3.75rem"}
        direction={isCompactLayout ? "column" : "row"}
        className={styles.inner}
      >
        {isCompactLayout ? renderMobileHeader() : renderDesktopHeader()}

        <div className={isCompactLayout ? styles.cardGridWrap : undefined}>
          <div className={styles.cardGrid}>
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Flex key={i} direction="column" gap="10px">
                    <Skeleton
                      height="200px"
                      width="100%"
                      borderRadius="4px"
                      className={styles.skeletonImg}
                    />
                    <Flex direction="column" gap="8px">
                      <Skeleton
                        width="120px"
                        height="28px"
                        borderRadius="4px"
                      />
                      <Skeleton width="100%" height="24px" borderRadius="4px" />
                    </Flex>
                  </Flex>
                ))}
              </>
            ) : error ? (
              <Flex
                justify="center"
                align="center"
                style={{ gridColumn: "1 / -1", minHeight: "300px" }}
              >
                <Text typography="body1_r_16" color="neutral-95">
                  데이터를 불러오는데 실패했습니다.
                </Text>
              </Flex>
            ) : !data || !data.events || data.events.length === 0 ? (
              <Flex
                justify="center"
                align="center"
                style={{ gridColumn: "1 / -1", minHeight: "300px" }}
              >
                <Text typography="body1_r_16" color="neutral-95">
                  표시할 행사가 없습니다.
                </Text>
              </Flex>
            ) : (
              data.events.slice(0, 4).map((event: Event) => {
                const isBookmarked = bookmarkedCards.has(event.id);
                return (
                  <Flex
                    key={event.id}
                    direction="column"
                    gap="0.5rem"
                    className={styles.cardItem}
                    onClick={() => handleCardClick(event)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.imgBox}>
                      <img
                        src={event.thumbnailUrl ?? LoginImage.src.toString()}
                        alt={event.title}
                      />
                      <IconButton
                        variant="opacity"
                        size="large"
                        icon={
                          <BookmarkIcon
                            fillColor={
                              isBookmarked ? "var(--Common-white)" : "none"
                            }
                            strokeColor={
                              isBookmarked ? "none" : "var(--Common-white)"
                            }
                          />
                        }
                        onClick={(e) => handleBookmarkClick(e, event.id)}
                        className={styles.bookmarkBtn}
                        ariaLabel="Bookmark Icon"
                      />
                    </div>
                    <Flex
                      direction="column"
                      gap="0.25rem"
                      className={styles.textContent}
                    >
                      <Text
                        typography={
                          isCompactLayout ? "head4_sb_20" : "head4_sb_20"
                        }
                        color="white"
                        className={styles.metaText}
                      >
                        {event.title}
                      </Text>
                      <Text
                        typography={
                          isCompactLayout ? "body2_r_14" : "body1_r_16"
                        }
                        color="neutral-90"
                        className={styles.metaText}
                      >
                        {event.scheduleText}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })
            )}
          </div>
        </div>
      </Flex>
    </section>
  );
}
