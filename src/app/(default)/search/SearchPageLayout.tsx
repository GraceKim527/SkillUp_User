// src/app/(default)/search/SearchPageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtom } from "jotai";
import EventCard from "@/components/common/EventCard";
import EmptyState from "@/components/common/EmptyState";
import EventHeader from "@/components/events/EventHeader";
import Dropdown from "@/components/common/Dropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import FilterBadges from "@/components/events/filters/FilterBadges";
import Pagination from "@/components/common/Pagination";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import SearchFilterView from "@/components/events/filters/views/SearchFilterView";
import RecommendedEventsSection from "@/components/events/RecommendedEventsSection";
import { EventSearchRequest } from "@/types/event";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import { ITEMS_PER_PAGE, SORT_OPTIONS } from "@/constants/pagination";
import { EventSortOption } from "@/constants/event";
import { pageFilterAtomsMap } from "@/components/events/filters/atoms/pageFilterAtoms";
import { useSearchEvents } from "@/hooks/queries/useEventList";
import styles from "@/components/events/EventPageLayout/styles.module.css";
import { useIsMobile, useIsTablet, useIsSmallTablet } from "@/hooks/useMediaQuery";

// 검색 페이지 스켈레톤 UI 컴포넌트
function SearchPageSkeleton() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallTablet = useIsSmallTablet();

  // 화면 크기에 따른 카드 개수
  const cardCounts = isSmallTablet ? 2 : isMobile ? 1 : isTablet ? 3 : 4;
  const rowCount = isMobile ? 5 : 3;

  return (
    <Flex direction="column" gap="1.25rem" style={{ width: "100%" }}>
      {/* 헤더 스켈레톤 */}
      <Flex direction="column" gap="1.5rem" style={{ width: "100%" }}>
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <Flex gap="1rem" align="center">
            <Skeleton width="194px" height="36px" borderRadius="100px" />
            <Skeleton width="121px" height="20px" borderRadius="100px" />
          </Flex>
          {!isMobile && (
            <Flex gap="0.5rem" align="center">
              <Skeleton width="98px" height="38px" borderRadius="4px" />
              <Skeleton width="127px" height="38px" borderRadius="4px" />
            </Flex>
          )}
        </Flex>
      </Flex>

      {/* 카드 그리드 스켈레톤 */}
      <div className={styles.cardList}>
        {Array.from({ length: rowCount * cardCounts }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <Skeleton width="100%" height="212px" borderRadius="0" />
            <Flex
              direction="column"
              gap="1.75rem"
              style={{ padding: "1rem" }}
            >
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
      </div>

      {/* 페이지네이션 스켈레톤 */}
      {!isMobile && (
        <Flex justify="center" align="center" style={{ width: "100%", position: "relative" }}>
          <Flex gap="3.75rem" align="center">
            <Skeleton width="40px" height="40px" borderRadius="100px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="40px" height="40px" borderRadius="4px" />
              <Skeleton width="40px" height="40px" borderRadius="4px" />
              <Skeleton width="40px" height="40px" borderRadius="4px" />
            </Flex>
            <Skeleton width="40px" height="40px" borderRadius="100px" />
          </Flex>
          <Flex gap="0.25rem" style={{ position: "absolute", right: 0 }}>
            <Skeleton width="97px" height="40px" borderRadius="4px" />
            <Skeleton width="66px" height="40px" borderRadius="4px" />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

interface SearchPageLayoutProps {
  searchQuery: string;
}

export default function SearchPageLayout({
  searchQuery,
}: SearchPageLayoutProps) {
  const isMobile = useIsMobile();
  const {
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
  } = usePageFilters({ pageId: "search" });

  const [currentPage, setCurrentPage] = useAtom(
    pageFilterAtomsMap.search.currentPageAtom
  );

  // 검색 파라미터 구성
  const searchParams: EventSearchRequest = useMemo(() => {
    const params: EventSearchRequest = {
      searchString: searchQuery,
      sort: sortOption as EventSortOption,
      page: currentPage - 1, // UI는 1부터, API는 0부터
    };

    // 온오프라인 필터
    if (onOfflineFilter === "online") {
      params.eventFormat = "ONLINE";
    } else if (onOfflineFilter === "offline") {
      params.eventFormat = "OFFLINE";
    }

    // 무료 필터
    if (freeFilter) {
      params.isFree = true;
    }

    return params;
  }, [searchQuery, sortOption, currentPage, onOfflineFilter, freeFilter]);

  const { data, isLoading } = useSearchEvents(searchParams);

  // fallback이 true이면 검색 결과가 없는 것으로 처리
  const isFallback = data?.fallback === true;

  const eventList = useMemo(() => {
    if (isFallback) {
      return [];
    }
    return data?.homeEventResponseList || [];
  }, [data?.homeEventResponseList, isFallback]);

  const total = isFallback ? 0 : data?.total || 0;

  // 추천 이벤트 - 검색 결과가 없거나 fallback일 때만 렌더링
  const shouldFetchRecommended =
    !isLoading && (eventList.length === 0 || isFallback);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <Flex
        direction="column"
        align="flex-start"
        gap={1.25}
        className={styles.container}
      >
        <SearchPageSkeleton />
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
      {/* 검색 헤더 - 직군 필터 제외 */}
      <Flex direction="column" gap={1.5} style={{ width: "100%" }}>
        <EventHeader title={`'${searchQuery}' 검색 결과`} count={total} />
        <Flex align="center" justify="flex-end" style={{ width: "100%" }}>
          <Flex align="center" gap={0.5} style={{ width: isMobile ? "100%" : "auto" }}>
            <FilterBadges
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
            />
            <FilterButton onApply={handleApply} onReset={handleReset}>
              <SearchFilterView />
            </FilterButton>
            <Dropdown
              variant="sort"
              selected={
                SORT_OPTIONS.find((option) => option.value === sortOption) ||
                SORT_OPTIONS[0]
              }
              onSelect={(option) =>
                setSortOption(option.value as EventSortOption)
              }
              options={SORT_OPTIONS}
            />
          </Flex>
        </Flex>
      </Flex>

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
              buttonHref="/support"
              buttonText="행사 등록하기"
            />
            <RecommendedEventsSection
              category="CONFERENCE_SEMINAR"
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
              message={
                <div style={{ textAlign: "center" }}>
                  {`'${searchQuery}'`} <br /> 행사 검색 결과가 없습니다.
                </div>
              }
            />
            <RecommendedEventsSection
              category="CONFERENCE_SEMINAR"
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
