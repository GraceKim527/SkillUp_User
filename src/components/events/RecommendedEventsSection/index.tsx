// src/components/events/RecommendedEventsSection/index.tsx

"use client";

import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import EventCard from "@/components/common/EventCard";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useRecommendedEvents } from "@/hooks/useRecommendedEvents";
import { EventCategory } from "@/constants/event";
import { Event } from "@/types/event";

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
  const { data: recommendedEvents, isLoading: isLoadingRecommended } =
    useRecommendedEvents(category, shouldFetch);

  const renderContent = () => {
    if (isLoadingRecommended) {
      return (
        <Text typography="body1_r_16" color="neutral-40">
          추천 행사를 불러오는 중...
        </Text>
      );
    }

    if (recommendedEvents && recommendedEvents.length > 0) {
      return recommendedEvents
        .slice(0, 3)
        .map((event: Event) => (
          <EventCard
            key={event.id}
            size={cardSize}
            event={event}
            block={blockCard}
          />
        ));
    }

    return (
      <Text typography="body1_r_16" color="neutral-40">
        추천할 행사가 없습니다.
      </Text>
    );
  };

  return (
    <Flex direction="column" gap={1}>
      <Flex align="center" justify="space-between">
        <Text typography="head3_m_24" color="black" as="h3">
          이런 행사는 어떠세요?
        </Text>
        {showMoreButton && (
          <Button variant="textOnly" icon={<ChevronRightIcon />} size="medium">
            IT 행사 더보기
          </Button>
        )}
      </Flex>

      {containerType === "flex" ? (
        <Flex align="center" gap={flexGap}>
          {renderContent()}
        </Flex>
      ) : (
        <div className={cardContainerClassName}>{renderContent()}</div>
      )}
    </Flex>
  );
}
