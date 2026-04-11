// src/components/events/EventPageLayout/index.tsx

"use client";

import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import EventCard from "@/components/common/EventCard";
import EmptyState from "@/components/common/EmptyState";
import EventPageHeader from "@/components/events/EventPageHeader";
import Pagination from "@/components/common/Pagination";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import EventCardSkeleton from "@/components/common/EventCardSkeleton";
import RecommendedEventsSection from "@/components/events/RecommendedEventsSection";
import { Event, EventSearchParams } from "@/types/event";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import styles from "./styles.module.css";
import { EventSortOption } from "@/constants/event";
import { useEventList } from "@/hooks/queries/useEventList";
import {
  PAGE_CATEGORY_MAP,
  pageFilterAtomsMap,
  createEventSearchParamsAtom,
} from "@/components/events/filters/atoms/pageFilterAtoms";
import { PAGE_CONFIGS, EventPageId } from "./config";
import { useIsMobile, useIsTablet, useIsSmallTablet } from "@/hooks/useMediaQuery";

function EventPageSkeleton() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallTablet = useIsSmallTablet();

  // 화면 크기에 따른 카드 개수
  const cardCounts = isSmallTablet ? 2 : isMobile ? 1 : isTablet ? 3 : 4;
  const rowCount = isMobile ? 5 : 3;

  return (
    <Flex direction="column" gap="20px" style={{ width: "100%" }}>
      {/* 헤더 스켈레톤 */}
      <Flex direction="column" gap="24px">
        <Flex gap="16px" align="center">
          <Skeleton width="194px" height="36px" borderRadius="100px" />
          <Skeleton width="121px" height="20px" borderRadius="100px" />
        </Flex>
        {!isMobile && (
          <Flex justify="space-between" align="center">
            <Flex gap="8px">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} width="80px" height="40px" borderRadius="100px" />
              ))}
            </Flex>
            <Flex gap="8px">
              <Skeleton width="98px" height="40px" borderRadius="100px" />
              <Skeleton width="127px" height="40px" borderRadius="100px" />
            </Flex>
          </Flex>
        )}
      </Flex>

      {/* 카드 그리드 스켈레톤 */}
      <div className={styles.cardList}>
        {Array.from({ length: rowCount * cardCounts }).map((_, index) => (
          <EventCardSkeleton
            key={index}
            variant="compact"
            imageHeight="212px"
            className={styles.skeletonCard}
          />
        ))}
      </div>

      {/* 페이지네이션 스켈레톤 */}
      {!isMobile && (
        <Flex justify="center" align="center" gap="60px" style={{ marginTop: "40px" }}>
          <Skeleton width="40px" height="40px" borderRadius="100px" />
          <Flex gap="8px" align="center">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} width="40px" height="40px" borderRadius="4px" />
            ))}
          </Flex>
          <Skeleton width="40px" height="40px" borderRadius="100px" />
        </Flex>
      )}
    </Flex>
  );
}

interface EventPageLayoutProps {
  pageId: EventPageId;
  initialEventList: Event[];
  initialParams: EventSearchParams;
}

export default function EventPageLayout({
  pageId,
  initialEventList,
  initialParams,
}: EventPageLayoutProps) {
  // config에서 페이지 설정 가져오기
  const config = PAGE_CONFIGS[pageId];
  const { title, emptyUrl } = config;

  // searchParams atom 생성
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom(pageId),
    [pageId]
  );
  const searchParams = useAtomValue(searchParamsAtom);

  // 이벤트 목록 조회
  const { data, isLoading: isLoadingEventList } = useEventList(
    searchParams,
    initialEventList,
    initialParams
  );

  const eventList = data?.homeEventResponseList || [];
  const total = data?.total || 0;
  const {
    selectedRoles,
    setSelectedRoles,
    onOfflineFilter,
    setOnOfflineFilter,
    freeFilter,
    setFreeFilter,
    sortOption,
    setSortOption,
    setTempOnOfflineFilter,
    setTempFreeFilter,
    handleApply,
    handleReset,
  } = usePageFilters({ pageId });

  const [currentPage, setCurrentPage] = useAtom(
    pageFilterAtomsMap[pageId].currentPageAtom
  );

  // 추천 이벤트 조회 - 검색 결과가 없을 때만 호출 (로딩 중이 아닐 때)
  const category = PAGE_CATEGORY_MAP[pageId]!;
  const shouldFetchRecommended = !isLoadingEventList && eventList.length === 0;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRolesChange = (roles: typeof selectedRoles) => {
    setSelectedRoles(roles);
    setCurrentPage(1);
  };

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoadingEventList) {
    return (
      <Flex
        direction="column"
        align="flex-start"
        gap={1.25}
        className={styles.container}
      >
        <EventPageSkeleton />
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="flex-start"
      gap={1.25}
      className={styles.container}
    >
      <EventPageHeader
        title={title}
        count={total}
        selectedRoles={selectedRoles}
        onRolesChange={handleRolesChange}
        onOfflineFilter={onOfflineFilter}
        freeFilter={freeFilter}
        onClearOnOfflineFilter={() => {
          setOnOfflineFilter("");
          setTempOnOfflineFilter("");
        }}
        onClearFreeFilter={() => {
          setFreeFilter(false);
          setTempFreeFilter(false);
        }}
        sortOption={sortOption}
        onSortChange={(value) => setSortOption(value as EventSortOption)}
        onApply={handleApply}
        onReset={handleReset}
        pageId={pageId}
      />

      <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
        {total > 0 && eventList.length === 0 ? (
          // total은 있는데 현재 페이지에 데이터가 없는 경우 (페이지 범위 초과)
          <>
            <EmptyState
              message={
                <div style={{ textAlign: "center" }}>
                  조건에 맞는 행사가 없어요. <br /> 조건을 다시 설정해보세요
                </div>
              }
              buttonHref={emptyUrl}
              buttonText="행사 등록하기"
            />
            <RecommendedEventsSection
              category={category}
              shouldFetch={shouldFetchRecommended}
              cardSize="medium"
              showMoreButton={true}
              cardContainerClassName={styles.cardList}
            />
          </>
        ) : eventList.length === 0 ? (
          // total도 0이고 데이터도 없는 경우 (실제로 데이터가 없음)
          <>
            <EmptyState
              message={<>{title}에 등록된 행사가 없어요</>}
              buttonHref={emptyUrl}
              buttonText="행사 등록하기"
            />
            <RecommendedEventsSection
              category={category}
              shouldFetch={shouldFetchRecommended}
              cardSize="medium"
              showMoreButton={true}
              cardContainerClassName={styles.cardList}
            />
          </>
        ) : (
          // 데이터가 있는 경우
          <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
            <div className={styles.cardList}>
              {eventList.map((item) => (
                <EventCard key={item.id} size="medium" event={item} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
