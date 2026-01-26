"use client";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";
import { useCategoryEvents } from "@/hooks/queries/useHome";
import { EVENT_CATEGORY } from "@/constants/event";
import { Event } from "@/types/event";
import { useRouter } from "next/navigation";
import LoginImage from "@/assets/images/loginImg.png";
import { useScrollCarousel } from "@/hooks/useScrollCarousel";

export default function Club() {
  const router = useRouter();

  // API 데이터 가져오기 (동아리·해커톤·공모전 카테고리, 8개)
  const { data, isLoading, error } = useCategoryEvents(
    EVENT_CATEGORY.COMPETITION_HACKATHON,
    undefined,
    8,
    0
  );

  // 무한 캐러셀을 위해 카드를 3번 복제
  const originalCards = data?.homeEventResponseList || [];
  const cards = [...originalCards, ...originalCards, ...originalCards];

  // 무한 루프 캐러셀 훅 사용
  const { carouselRef, prev, next } = useScrollCarousel({
    infinite: true,
    itemCount: originalCards.length,
    gap: 24, // 1.5rem = 24px
    cardSelector: `.${styles.card}`,
  });

  return (
    <Flex
      as="section"
      className={styles.challengeSection}
      aria-labelledby="club-title"
      gap="2.5rem"
      direction="column"
    >
      <Flex justify="space-between" align="center" gap="2.5rem">
        <Flex direction="column" gap="0.25rem">
          <Text typography="sub2_m_18" color="primary-strong">
            동아리 · 해커톤 · 공모전
          </Text>
          <Flex gap="0.5rem">
            <Text typography="head1_m_42" color="black">
              바로 도전 가능한
            </Text>
            <Text typography="head5_sb_42" color="black">
              동아리·해커톤·공모전
            </Text>
          </Flex>
        </Flex>

        <Flex align="center" gap="0.75rem">
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={prev}
            aria-label="이전"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.dark}`}
            onClick={next}
            aria-label="다음"
          >
            <ChevronRightIcon color="#fff" />
          </button>
        </Flex>
      </Flex>
      {isLoading ? (
        <Flex gap="1.5rem" style={{ overflow: "hidden" }}>
          {[1, 2, 3, 4].map((i) => (
            <Flex key={i} direction="column" gap="0.75rem" style={{ flex: "0 0 calc(25% - 1.125rem)" }}>
              <Skeleton height="400px" borderRadius="0.75rem" />
            </Flex>
          ))}
        </Flex>
      ) : error ? (
        <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
          <Text typography="body1_r_16" color="neutral-70">
            데이터를 불러오는데 실패했습니다.
          </Text>
        </Flex>
      ) : originalCards.length === 0 ? (
        <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
          <Text typography="body1_r_16" color="neutral-70">
            도전 가능한 동아리·해커톤·공모전이 없습니다.
          </Text>
        </Flex>
      ) : (
        <div className={styles.trackWrap}>
          <Flex gap="1.5rem" className={styles.track} as="div">
            <div ref={carouselRef} className={styles.trackInner}>
              {cards.map((event: Event, idx) => (
                <article
                  key={`${event.id}-${idx}`}
                  className={styles.card}
                  onClick={() => router.push(`/hackathon/${event.id}`)}
                >
                  <div
                    className={styles.thumb}
                    style={{
                      backgroundImage: `url(${
                        event.thumbnailUrl || LoginImage.src.toString()
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <Flex
                    align="flex-end"
                    gap="0.75rem"
                    className={styles.overlay}
                  >
                    <Flex
                      direction="column"
                      gap="0.375rem"
                      className={styles.texts}
                    >
                      <Text
                        typography="sub1_m_20"
                        color="white"
                        className={styles.cardText}
                      >
                        {event.title}
                      </Text>
                      <Text
                        typography="body2_r_14"
                        color="white"
                        className={styles.cardText}
                      >
                        {event.scheduleText}
                      </Text>
                    </Flex>
                    <Button size="small" variant="secondary">
                      자세히 보기
                    </Button>
                  </Flex>
                </article>
              ))}
            </div>
          </Flex>
        </div>
      )}
    </Flex>
  );
}
