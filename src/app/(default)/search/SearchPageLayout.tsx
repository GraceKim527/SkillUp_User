// src/app/(default)/search/SearchPageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtom } from "jotai";
import EventCard from "@/components/common/EventCard";
import EventEmpty from "@/components/events/EventEmpty";
import EventHeader from "@/components/events/EventHeader";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import FilterBadges from "@/components/events/filters/FilterBadges";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/common/Button";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import SearchFilterView from "@/components/events/filters/views/SearchFilterView";
import { Event, EventSearchRequest } from "@/types/event";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import { ITEMS_PER_PAGE, SORT_OPTIONS } from "@/constants/pagination";
import { EventSortOption } from "@/constants/event";
import { useRecommendedEvents } from "@/hooks/queries/useRecommendedEvents";
import { pageFilterAtomsMap } from "@/components/events/filters/atoms/pageFilterAtoms";
import { useSearchEvents } from "@/hooks/queries/useEventList";
import styles from "@/components/events/EventPageLayout/styles.module.css";
import RecommendedEventsEmpty from "@/components/events/RecommendedEventsEmpty";

interface SearchPageLayoutProps {
  searchQuery: string;
}

export default function SearchPageLayout({
  searchQuery,
}: SearchPageLayoutProps) {
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

  // 추천 이벤트 조회 - 검색 결과가 없거나 fallback일 때만 호출
  const shouldFetchRecommended =
    !isLoading && (eventList.length === 0 || isFallback);
  const { data: recommendedEvents, isLoading: isLoadingRecommended } =
    useRecommendedEvents("CONFERENCE_SEMINAR", shouldFetchRecommended);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return eventList.slice(startIndex, endIndex);
  }, [eventList, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <Flex align="center" justify="flex-end">
          <Flex align="center" gap={0.5}>
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
            <SortDropdown
              selected={
                SORT_OPTIONS.find((option) => option.value === sortOption) ||
                SORT_OPTIONS[0]
              }
              setSelected={(option) =>
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
            <EventEmpty
              description={
                <div style={{ textAlign: "center" }}>
                  조건에 맞는 행사가 없어요. <br /> 조건을 다시 설정해보세요
                </div>
              }
              url="/support"
              buttonText="행사 등록하기"
            />
            <Flex direction="column" gap={1}>
              <Flex align="center" justify="space-between">
                <Text typography="head3_m_24" color="black" as="h3">
                  이런 행사는 어떠세요?
                </Text>
                <Button
                  variant="textOnly"
                  icon={<ChevronRightIcon />}
                  size="medium"
                >
                  IT 행사 더보기
                </Button>
              </Flex>
              {isLoadingRecommended ? (
                <div className={styles.cardList}>
                  <Text typography="body1_r_16" color="neutral-40">
                    추천 행사를 불러오는 중...
                  </Text>
                </div>
              ) : recommendedEvents && recommendedEvents.length > 0 ? (
                <div className={styles.cardList}>
                  {recommendedEvents.slice(0, 3).map((event: Event) => (
                    <EventCard key={event.id} size="medium" event={event} />
                  ))}
                </div>
              ) : (
                <RecommendedEventsEmpty />
              )}
            </Flex>
          </>
        ) : eventList.length === 0 ? (
          // total도 0이고 데이터도 없는 경우 (실제로 데이터가 없음)
          <>
            <EventEmpty
              description={
                <div style={{ textAlign: "center" }}>
                  {`'${searchQuery}'`} <br /> 행사 검색 결과가 없습니다.
                </div>
              }
            />
            <Flex direction="column" gap={1}>
              <Flex align="center" justify="space-between">
                <Text typography="head3_m_24" color="black" as="h3">
                  이런 행사는 어떠세요?
                </Text>
                <Button
                  variant="textOnly"
                  icon={<ChevronRightIcon />}
                  size="medium"
                >
                  IT 행사 더보기
                </Button>
              </Flex>
              {isLoadingRecommended ? (
                <div className={styles.cardList}>
                  <Text typography="body1_r_16" color="neutral-40">
                    추천 행사를 불러오는 중...
                  </Text>
                </div>
              ) : recommendedEvents && recommendedEvents.length > 0 ? (
                <div className={styles.cardList}>
                  {recommendedEvents.slice(0, 3).map((event: Event) => (
                    <EventCard key={event.id} size="medium" event={event} />
                  ))}
                </div>
              ) : (
                <RecommendedEventsEmpty />
              )}
            </Flex>
          </>
        ) : (
          // 데이터가 있는 경우
          <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
            <div className={styles.cardList}>
              {paginatedEvents.map((item) => (
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
