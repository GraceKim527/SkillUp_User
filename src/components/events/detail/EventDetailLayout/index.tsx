// src/components/events/detail/EventDetailLayout/index.tsx

"use client";

import { useRef, useState } from "react";
import styles from "./styles.module.css";
import StickyApplySection from "@/components/events/detail/StickyApplySection";
import Badge from "@/components/common/Badge";
import GlobeIcon from "@/assets/svg/globeIcon.svg";
import CursorIcon from "@/assets/svg/cursorIcon.svg";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import RecommendedEventsSection from "@/components/events/RecommendedEventsSection";
import Tab from "@/components/common/Tab";
import { useEventDetail } from "@/hooks/queries/useEventDetail";
import { formatDate, formatPriceWithUnit, getDdayLabel } from "@/utils/format";
import { EventCategory } from "@/constants/event";
import NaverMap from "@/components/common/NaverMap";
import parse from "html-react-parser";
import LoginImage from "@/assets/images/loginImg.png";
import { useIsMobile, useMediaQuery } from "@/hooks/useMediaQuery";

// 스켈레톤 UI 컴포넌트
function EventDetailSkeleton({
  isCompactLayout,
}: {
  isCompactLayout: boolean;
}) {
  return (
    <Flex
      gap={isCompactLayout ? "2.5rem" : "1.5rem"}
      direction={isCompactLayout ? "column" : "row"}
      className={styles.container}
    >
      {/* 왼쪽 콘텐츠 스켈레톤 */}
      <Flex
        direction="column"
        gap={isCompactLayout ? "2rem" : "2.5rem"}
        style={{ flex: 1, minWidth: 0 }}
      >
        {/* 히어로 이미지 */}
        <Skeleton width="100%" height="31.6875rem" borderRadius="0.75rem" />

        {/* 제목 + 탭바 */}
        <Flex direction="column" gap="2.5rem">
          <Skeleton width="60%" height="48px" borderRadius="100px" />
          <div className={styles.skeletonDivider} />
        </Flex>

        {/* 섹션들 */}
        <Flex direction="column" gap="3.75rem">
          {/* 행사 설명 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="120px" height="28px" borderRadius="100px" />
            <Flex direction="column" gap="0.5rem" style={{ width: "100%" }}>
              <Skeleton width="100%" height="18px" borderRadius="100px" />
              <Skeleton width="100%" height="18px" borderRadius="100px" />
              <Skeleton width="75%" height="18px" borderRadius="100px" />
              <Skeleton width="60%" height="18px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 모집 기간 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="100px" height="28px" borderRadius="100px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="160px" height="24px" borderRadius="100px" />
              <Skeleton width="80px" height="24px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 참가비 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="80px" height="28px" borderRadius="100px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="80px" height="24px" borderRadius="100px" />
              <Skeleton width="56px" height="24px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 장소 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="60px" height="28px" borderRadius="100px" />
            <Flex direction="column" gap="0.5rem">
              <Skeleton width="200px" height="20px" borderRadius="100px" />
              <Skeleton width="240px" height="20px" borderRadius="100px" />
            </Flex>
            <Skeleton width="100%" height="22.125rem" borderRadius="0.75rem" />
          </div>
        </Flex>
      </Flex>

      {/* 오른쪽 사이드바 스켈레톤 */}
      <div className={styles.skeletonSidebar}>
        <Flex direction="column" gap="0.5rem">
          <Skeleton width="121px" height="20px" borderRadius="100px" />
          <Skeleton width="194px" height="28px" borderRadius="100px" />
        </Flex>

        <Flex direction="column" gap="1rem" style={{ width: "100%" }}>
          {[1, 2, 3].map((i) => (
            <Flex
              key={i}
              gap="0.375rem"
              align="flex-start"
              style={{ width: "100%" }}
            >
              <Skeleton width="24px" height="24px" borderRadius="100px" />
              <Flex direction="column" gap="0.25rem" style={{ flex: 1 }}>
                <Skeleton width="80px" height="18px" borderRadius="100px" />
                <Skeleton width="130px" height="22px" borderRadius="100px" />
              </Flex>
            </Flex>
          ))}
          <div className={styles.skeletonDivider} />
          <Flex gap="0.25rem" wrap="wrap">
            <Skeleton width="60px" height="24px" borderRadius="100px" />
            <Skeleton width="60px" height="24px" borderRadius="100px" />
          </Flex>
        </Flex>

        <Flex direction="column" gap="0.25rem" style={{ width: "100%" }}>
          <Skeleton width="100%" height="52px" borderRadius="8px" />
          <Skeleton width="100%" height="52px" borderRadius="8px" />
        </Flex>

        <Skeleton width="100%" height="46px" borderRadius="4px" />
      </div>
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
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isCompactLayout = isMobile || isTablet;
  const { data: eventDetail, isLoading } = useEventDetail(eventId);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const recruitRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <EventDetailSkeleton isCompactLayout={isCompactLayout} />;
  }

  if (!eventDetail) return null;

  const hasRecruitPeriod =
    !!eventDetail.recruitStart && !!eventDetail.recruitEnd;
  const titleTypography = isCompactLayout ? "head2_sb_30" : "head1_sb_42";
  const sectionTitleTypography = isCompactLayout
    ? "head4_sb_20"
    : "head4_sb_24";
  const contentGap = isCompactLayout ? "2.5rem" : "1.5rem";
  const contentWrapperGap = isCompactLayout ? "1.5rem" : "2.5rem";
  const sectionGap = isCompactLayout ? "2.5rem" : "3.75rem";
  const rootGap = isCompactLayout ? "4rem" : "6.25rem";
  const mapHeight = isMobile ? "16rem" : isTablet ? "18rem" : "22.125rem";

  const fullLocationText = eventDetail.locationText
    ? `${eventDetail.locationText}${
        eventDetail.locationTextDetail
          ? ` ${eventDetail.locationTextDetail}`
          : ""
      }`
    : "";

  // 탭 목록 구성 (모집 기간은 데이터 있을 때만 포함)
  const tabs = [
    { label: "행사 설명" },
    ...(hasRecruitPeriod ? [{ label: "모집 기간" }] : []),
    { label: "참가비" },
    { label: "장소" },
  ];

  // 탭 인덱스 → ref 매핑
  const tabRefs = [
    descriptionRef,
    ...(hasRecruitPeriod ? [recruitRef] : []),
    priceRef,
    locationRef,
  ];

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    tabRefs[index]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Flex
      direction="column"
      gap={rootGap}
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      <Flex
        gap={contentGap}
        align="flex-start"
        direction={isCompactLayout ? "column" : "row"}
        className={styles.contentContainer}
      >
        {/* 왼쪽 콘텐츠 */}
        <Flex
          direction="column"
          gap={contentWrapperGap}
          className={styles.contentWrapper}
        >
          {/* 히어로 이미지 */}
          <div className={styles.heroImageWrapper}>
            {eventDetail.thumbnailUrl ? (
              <Image
                src={eventDetail.thumbnailUrl}
                alt={eventDetail.title}
                width={900}
                height={507}
                unoptimized
                className={styles.heroImage}
                priority
              />
            ) : (
              <Image src={LoginImage} alt="login" width={900} height={507} />
            )}
          </div>

          {/* 모바일/태블릿: 포스터 바로 아래에 신청 섹션 */}
          {isCompactLayout && (
            <StickyApplySection
              eventId={eventId}
              category={eventDetail.category}
              title={eventDetail.title}
              eventStart={formatDate(eventDetail.eventStart)}
              eventEnd={formatDate(eventDetail.eventEnd)}
              place={fullLocationText}
              price={eventDetail.price}
              isFree={eventDetail.isFree}
              phoneNumber={eventDetail.contact}
              hashTags={eventDetail.hashTags}
              bookmarked={eventDetail.bookmarked}
              applyLink={eventDetail.applyLink ?? undefined}
            />
          )}

          <Text typography={titleTypography} color="black" as="h1">
            {eventDetail.title}
          </Text>

          <div className={styles.tabBarWrapper}>
            <Tab
              tabs={tabs}
              activeIndex={activeTabIndex}
              onChange={handleTabChange}
              justify="flex-start"
            />
          </div>

          {/* 섹션들 */}
          <Flex direction="column" gap={sectionGap}>
            {/* 행사 설명 */}
            <div ref={descriptionRef} className={styles.section}>
              <div className={styles.markdown}>
                {parse(eventDetail.description)}
              </div>
            </div>

            {/* 모집 기간 */}
            {hasRecruitPeriod && (
              <div ref={recruitRef} className={styles.section}>
                <Flex direction="column" gap="1rem">
                  <div className={styles.sectionTitle}>
                    <Text
                      typography={sectionTitleTypography}
                      color="black"
                      as="h2"
                    >
                      모집 기간
                    </Text>
                    <Image
                      src={CalendarIcon}
                      alt="calendar"
                      width={28}
                      height={28}
                    />
                  </div>
                  <Flex align="center" gap="1rem">
                    <Text typography="body1_r_16" color="neutral-20">
                      {formatDate(eventDetail.recruitStart)} ~{" "}
                      {formatDate(eventDetail.recruitEnd)}
                    </Text>
                    <Badge label={getDdayLabel(eventDetail.recruitEnd)} />
                  </Flex>
                </Flex>
              </div>
            )}

            {/* 참가비 */}
            <div ref={priceRef} className={styles.section}>
              <Flex direction="column" gap="1rem">
                <Text typography={sectionTitleTypography} color="black" as="h2">
                  참가비
                </Text>
                <Flex align="center" gap="1rem">
                  <Text typography="body1_r_16" color="neutral-20">
                    {formatPriceWithUnit(eventDetail.price)}
                  </Text>
                  {eventDetail.isFree && <Badge label="무료" />}
                </Flex>
              </Flex>
            </div>

            {/* 장소 */}
            <div ref={locationRef} className={styles.section}>
              <Flex direction="column" gap="1rem">
                <Text typography={sectionTitleTypography} color="black" as="h2">
                  장소
                </Text>
                <Flex direction="column" gap="0.75rem">
                  <div className={styles.placeRow}>
                    <Image src={GlobeIcon} alt="globe" width={18} height={18} />
                    <Text typography="body1_r_16" color="neutral-20">
                      {eventDetail.isOnline ? "온라인" : "오프라인"}
                    </Text>
                  </div>
                  <div className={styles.placeRow}>
                    <Image
                      src={CursorIcon}
                      alt="cursor"
                      width={18}
                      height={18}
                    />
                    <Text typography="body1_r_16" color="neutral-20">
                      {fullLocationText || "온라인"}
                    </Text>
                  </div>
                  {!eventDetail.isOnline && (
                    <NaverMap
                      latitude={eventDetail.latitude}
                      longitude={eventDetail.longitude}
                      height={mapHeight}
                    />
                  )}
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Flex>

        {/* 데스크톱: 오른쪽 사이드바 */}
        {!isCompactLayout && <StickyApplySection
          eventId={eventId}
          category={eventDetail.category}
          title={eventDetail.title}
          eventStart={formatDate(eventDetail.eventStart)}
          eventEnd={formatDate(eventDetail.eventEnd)}
          place={fullLocationText}
          price={eventDetail.price}
          isFree={eventDetail.isFree}
          phoneNumber={eventDetail.contact}
          hashTags={eventDetail.hashTags}
          bookmarked={eventDetail.bookmarked}
          applyLink={eventDetail.applyLink ?? undefined}
        />}
      </Flex>
      {/* 추천 행사 */}
      <RecommendedEventsSection
        category={category}
        cardSize="small"
        blockCard={true}
        containerType={isCompactLayout ? "div" : "flex"}
        cardContainerClassName={
          isCompactLayout ? styles.recommendedGrid : undefined
        }
        flexGap="0.75rem"
        maxCards={4}
        showMoreButton
      />
    </Flex>
  );
}
