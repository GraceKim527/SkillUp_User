// src/components/mainSection/RecommendInterest/index.tsx

// 관심있어하실 행사
"use client";
import { useState } from "react";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import IconButton from "@/components/common/IconButton";
import Text from "@/components/common/Text";
import { useRecommendedEvents } from "@/hooks/queries/useHome";
import { Event } from "@/types/event";
import { useAuth } from "@/hooks/useAuth";

export default function RecommendInterest() {
  const { isAuthenticated } = useAuth();
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<number>>(
    new Set()
  );

  // API 데이터 가져오기 (Hook은 항상 먼저 호출)
  const { data, isLoading, error } = useRecommendedEvents();

  // 비로그인 시 섹션을 렌더링하지 않음
  if (!isAuthenticated) {
    return null;
  }

  const handleBookmarkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    eventId: number
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

  const keywords = [
    "#기획",
    "#디자인",
    "#AI",
    "#개발",
    "#마케팅",
    "#교육",
    "#데이터",
  ];

  return (
    <section className={styles.interestSection}>
      <Flex
        justify="space-between"
        align="flex-start"
        gap="3.75rem"
        className={styles.inner}
      >
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
            {keywords.map((kw, i) => (
              <button
                key={i}
                type="button"
                className={styles.keywordBtn}
                aria-label={`${kw} 카테고리 필터`}
              >
                {kw}
              </button>
            ))}
          </Flex>
        </Flex>

        <div className={styles.cardGrid}>
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Flex key={i} direction="column" gap="0.5rem">
                  <Skeleton height="360px" borderRadius="0.75rem" />
                  <Skeleton height="1.5rem" width="90%" />
                  <Skeleton height="1rem" width="70%" />
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
          ) : !data ||
            !data.homeEventResponseList ||
            data.homeEventResponseList.length === 0 ? (
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
            data.homeEventResponseList.map((event: Event) => {
              const isBookmarked = bookmarkedCards.has(event.id);
              return (
                <Flex key={event.id} direction="column" gap="0.5rem">
                  <div className={styles.imgBox}>
                    <img src={event.thumbnailUrl} alt={event.title} />
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
                  <Flex direction="column">
                    <Text
                      typography="head4_sb_20"
                      color="white"
                      className={styles.metaText}
                    >
                      {event.title}
                    </Text>
                    <Text
                      typography="body1_r_16"
                      color="neutral-95"
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
      </Flex>
    </section>
  );
}
