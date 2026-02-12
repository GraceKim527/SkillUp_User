// src/components/events/RecommendedEventsSection/index.tsx

"use client";

import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import EventCard from "@/components/common/EventCard";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useRecommendedEvents } from "@/hooks/queries/useRecommendedEvents";
import { EventCategory } from "@/constants/event";
import { Event } from "@/types/event";
import RecommendedEventsEmpty from "../RecommendedEventsEmpty";
import { getCategoryPath } from "@/utils/format";
import { useRouter } from "next/navigation";

interface RecommendedEventsSectionProps {
  category: EventCategory;
  shouldFetch?: boolean;
  cardSize?: "small" | "medium";
  showMoreButton?: boolean;
  cardContainerClassName?: string;
  blockCard?: boolean;
  containerType?: "div" | "flex";
  flexGap?: string | number;
}

export default function RecommendedEventsSection({
  category,
  shouldFetch = true,
  cardSize = "medium",
  showMoreButton = false,
  cardContainerClassName,
  blockCard = false,
  containerType = "div",
  flexGap = "0.5rem",
}: RecommendedEventsSectionProps) {
  const router = useRouter();
  const { data: recommendedEvents, isLoading: isLoadingRecommended } =
    useRecommendedEvents(category, shouldFetch);

  // 추천 행사의 첫 번째 이벤트 카테고리에 따라 이동
  const handleMoreClick = () => {
    if (recommendedEvents && recommendedEvents.length > 0) {
      const firstEventCategory = recommendedEvents[0].category;
      const { path } = getCategoryPath(firstEventCategory);

      // URL 파라미터에 reset 플래그 추가 (useUrlSync에서 처리)
      router.push(`${path}?reset=true`);
    }
  };

  const renderContent = () => {
    if (isLoadingRecommended) {
      if (containerType === "flex") {
        return (
          <Text typography="body1_r_16" color="neutral-40">
            추천 행사를 불러오는 중...
          </Text>
        );
      }
      return (
        <div className={cardContainerClassName}>
          <Text typography="body1_r_16" color="neutral-40">
            추천 행사를 불러오는 중...
          </Text>
        </div>
      );
    }

    if (recommendedEvents && recommendedEvents.length > 0) {
      const cards = recommendedEvents
        .slice(0, 3)
        .map((event: Event) => (
          <EventCard
            key={event.id}
            size={cardSize}
            event={event}
            block={blockCard}
          />
        ));

      if (containerType === "flex") {
        return cards;
      }
      return <div className={cardContainerClassName}>{cards}</div>;
    }

    return <RecommendedEventsEmpty />;
  };

  return (
    <Flex direction="column" gap={1}>
      <Flex align="center" justify="space-between">
        <Text typography="head3_m_24" color="black" as="h3">
          이런 행사는 어떠세요?
        </Text>
        {showMoreButton && (
          <Button
            variant="textOnly"
            icon={
              <ChevronRightIcon
                color="var(--Neutral-60)"
                width={16}
                height={16}
              />
            }
            size="medium"
            onClick={handleMoreClick}
          >
            IT 행사 더보기
          </Button>
        )}
      </Flex>

      {containerType === "flex" ? (
        <Flex align="center" gap={flexGap}>
          {renderContent()}
        </Flex>
      ) : (
        renderContent()
      )}
    </Flex>
  );
}
