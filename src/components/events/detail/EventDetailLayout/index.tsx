// src/components/events/detail/EventDetailLayout/index.tsx

"use client";

import styles from "./styles.module.css";
import StickyApplySection from "@/components/events/detail/StickyApplySection";
import EventInfoCard from "@/components/events/detail/EventInfoCard";
import Badge from "@/components/common/Badge";
import GlobeIcon from "@/assets/svg/globeIcon.svg";
import CursorIcon from "@/assets/svg/cursorIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import RecommendedEventsSection from "@/components/events/RecommendedEventsSection";
import { useEventDetail } from "@/hooks/queries/useEventDetail";
import { formatDate, formatPriceWithUnit, getDdayLabel } from "@/utils/format";
import { EventCategory } from "@/constants/event";
import NaverMap from "@/components/common/NaverMap";
import parse from "html-react-parser";

// 스켈레톤 UI 컴포넌트
function EventDetailSkeleton() {
  return (
    <Flex gap="1rem" className={styles.container}>
      {/* 왼쪽 사이드바 스켈레톤 */}
      <div className={styles.skeletonSidebar}>
        <Flex direction="column" gap="1.5rem">
          {/* 헤더: 카테고리 + 제목 + 이미지 */}
          <Flex direction="column" gap="0.75rem">
            <Flex direction="column" gap="0.25rem">
              <Skeleton width="121px" height="20px" borderRadius="100px" />
              <Skeleton width="194px" height="36px" borderRadius="100px" />
            </Flex>
            <Skeleton width="284px" height="160px" borderRadius="4px" />
          </Flex>

          {/* 정보 섹션 */}
          <Flex direction="column" gap="1rem" style={{ width: "100%" }}>
            {/* 정보 행 3개 */}
            {[1, 2, 3].map((i) => (
              <Flex key={i} gap="0.375rem" align="flex-start" style={{ width: "100%" }}>
                <Skeleton width="20px" height="20px" borderRadius="100px" />
                <Flex direction="column" gap="0.375rem" style={{ flex: 1 }}>
                  <Skeleton width="121px" height="20px" borderRadius="100px" />
                  <Skeleton width="121px" height="24px" borderRadius="100px" />
                </Flex>
              </Flex>
            ))}

            {/* 구분선 + 태그 */}
            <div className={styles.skeletonDivider} />
            <Flex gap="0.25rem">
              <Skeleton width="60px" height="24px" borderRadius="100px" />
              <Skeleton width="60px" height="24px" borderRadius="100px" />
            </Flex>
          </Flex>
        </Flex>

        {/* 버튼들 */}
        <Flex direction="column" gap="0.25rem" style={{ width: "100%" }}>
          <Skeleton width="100%" height="46px" borderRadius="8px" />
          <Skeleton width="100%" height="46px" borderRadius="8px" />
        </Flex>

        {/* 문의 섹션 */}
        <Skeleton width="100%" height="46px" borderRadius="8px" />
      </div>

      {/* 오른쪽 메인 콘텐츠 스켈레톤 */}
      <Flex direction="column" gap="6.25rem" style={{ width: "56.25rem" }}>
        <Flex direction="column" gap="0.75rem">
          {/* 행사 설명 카드 */}
          <div className={styles.skeletonCard}>
            <Skeleton width="120px" height="36px" borderRadius="8px" />
            <Flex direction="column" gap="1.25rem" style={{ width: "100%" }}>
              <Flex direction="column" gap="0.5rem" style={{ width: "100%" }}>
                <Skeleton width="100%" height="18px" borderRadius="100px" />
                <Skeleton width="100%" height="18px" borderRadius="100px" />
                <Skeleton width="740px" height="18px" borderRadius="100px" />
                <Skeleton width="580px" height="18px" borderRadius="100px" />
                <Skeleton width="580px" height="18px" borderRadius="100px" />
                <Skeleton width="100%" height="18px" borderRadius="100px" />
              </Flex>
              <Skeleton width="100%" height="160px" borderRadius="4px" />
              <Flex direction="column" gap="0.5rem" style={{ width: "100%" }}>
                <Skeleton width="100%" height="18px" borderRadius="100px" />
                <Skeleton width="580px" height="18px" borderRadius="100px" />
                <Skeleton width="740px" height="18px" borderRadius="100px" />
              </Flex>
            </Flex>
          </div>

          {/* 모집 기간 카드 */}
          <div className={styles.skeletonCard}>
            <Skeleton width="120px" height="36px" borderRadius="8px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="121px" height="24px" borderRadius="100px" />
              <Skeleton width="121px" height="24px" borderRadius="100px" />
              <Skeleton width="121px" height="24px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 참가비 카드 */}
          <div className={styles.skeletonCard}>
            <Skeleton width="120px" height="36px" borderRadius="8px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="121px" height="24px" borderRadius="100px" />
              <Skeleton width="121px" height="24px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 장소 카드 */}
          <div className={styles.skeletonCard}>
            <Skeleton width="120px" height="36px" borderRadius="8px" />
            <Flex direction="column" gap="0.5rem">
              <Skeleton width="240px" height="20px" borderRadius="100px" />
              <Skeleton width="240px" height="20px" borderRadius="100px" />
            </Flex>
            <Skeleton width="100%" height="320px" borderRadius="4px" />
          </div>
        </Flex>

        {/* 추천 이벤트 섹션 */}
        <Flex direction="column" gap="1rem" style={{ width: "100%" }}>
          <Skeleton width="120px" height="36px" borderRadius="8px" />
          <Flex gap="0.5rem">
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonEventCard}>
                <Skeleton width="100%" height="212px" borderRadius="0" />
                <Flex direction="column" gap="1.75rem" style={{ padding: "1rem" }}>
                  <Flex direction="column" gap="0.75rem" style={{ width: "100%" }}>
                    <Flex direction="column" gap="0.25rem" style={{ width: "100%" }}>
                      <Skeleton width="103px" height="24px" borderRadius="100px" />
                      <Skeleton width="100%" height="36px" borderRadius="100px" />
                    </Flex>
                    <Flex direction="column" gap="0.375rem" style={{ width: "100%" }}>
                      <Skeleton width="224px" height="18px" borderRadius="100px" />
                      <Skeleton width="224px" height="18px" borderRadius="100px" />
                    </Flex>
                  </Flex>
                  <Flex gap="0.5rem" align="center">
                    <Skeleton width="121px" height="28px" borderRadius="100px" />
                    <Skeleton width="28px" height="28px" borderRadius="100px" />
                  </Flex>
                </Flex>
              </div>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

interface EventDetailLayoutProps {
  eventId: number;
  category: EventCategory;
  className?: string;
}

export default function EventDetailLayout({
  eventId,
  category,
  className,
}: EventDetailLayoutProps) {
  const { data: eventDetail, isLoading } = useEventDetail(eventId);

  if (isLoading) {
    return <EventDetailSkeleton />;
  }

  if (!eventDetail) return null;
  const hasRecruitPeriod =
    eventDetail.recruitStart != null && eventDetail.recruitEnd != null;

  return (
    <Flex gap="1rem" className={className || styles.container}>
      <StickyApplySection
        eventId={eventId}
        category={eventDetail.category}
        title={eventDetail.title}
        eventStart={formatDate(eventDetail.eventStart)}
        eventEnd={formatDate(eventDetail.eventEnd)}
        place={eventDetail.locationText}
        price={eventDetail.isFree ? 0 : eventDetail.price}
        phoneNumber={eventDetail.contact}
        image={eventDetail.thumbnailUrl}
        hashTags={eventDetail.hashTags}
        bookmarked={eventDetail.bookmarked}
        applyLink={eventDetail.applyLink ?? undefined}
      />
      <Flex
        direction="column"
        gap="6.25rem"
        style={{ marginBottom: "11.25rem" }}
      >
        <Flex direction="column" gap="0.75rem">
          <EventInfoCard title="행사 설명">
            <div className={styles.markdown}>
              {parse(eventDetail.description)}
            </div>
          </EventInfoCard>
          {hasRecruitPeriod && (
            <EventInfoCard title="모집 기간" isDate>
              <Flex align="center" gap="1rem">
                <Text typography="body1_r_16" color="neutral-20">
                  {formatDate(eventDetail.recruitStart)} ~{" "}
                  {formatDate(eventDetail.recruitEnd)}
                </Text>
                <Badge label={getDdayLabel(eventDetail.recruitEnd)} />
              </Flex>
            </EventInfoCard>
          )}
          <EventInfoCard title="참가비">
            <Flex align="center" gap="1rem">
              <Text typography="body1_r_16" color="neutral-20">
                {formatPriceWithUnit(eventDetail.price)}
              </Text>
              {eventDetail.isFree && <Badge label="무료" />}
            </Flex>
          </EventInfoCard>
          <EventInfoCard title="장소">
            <Flex direction="column" gap="0.75rem">
              <Flex align="center" gap="0.375rem">
                <Image src={GlobeIcon} alt="globe icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.isOnline ? "온라인" : "오프라인"}
                </Text>
              </Flex>
              <Flex align="center" gap="0.375rem">
                <Image src={CursorIcon} alt="cursor icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.locationText || "온라인"}
                </Text>
              </Flex>
              {!eventDetail.isOnline && (
                <NaverMap
                  latitude={eventDetail.latitude}
                  longitude={eventDetail.longitude}
                  height="400px"
                />
              )}
            </Flex>
          </EventInfoCard>
        </Flex>
        <RecommendedEventsSection
          category={category}
          cardSize="small"
          blockCard={true}
          containerType="flex"
          flexGap="0.5rem"
        />
      </Flex>
    </Flex>
  );
}
