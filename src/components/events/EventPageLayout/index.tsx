// src/components/events/EventPageLayout/index.tsx

"use client";

import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import EventCard from "@/components/common/EventCard";
import EventEmpty from "@/components/events/EventEmpty";
import EventPageHeader from "@/components/events/EventPageHeader";
import Pagination from "@/components/common/Pagination";
import Flex from "@/components/common/Flex";
import RecommendedEventsSection from "@/components/events/RecommendedEventsSection";
import { Event, EventSearchParams } from "@/types/event";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import styles from "./styles.module.css";
import { EventSortOption } from "@/constants/event";
import { useEventList } from "@/hooks/useEventList";
import {
  PAGE_CATEGORY_MAP,
  pageFilterAtomsMap,
  createEventSearchParamsAtom,
} from "@/components/events/filters/atoms/pageFilterAtoms";
import { PAGE_CONFIGS, PageId } from "./config";

interface EventPageLayoutProps {
  pageId: PageId;
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
  const { title, FilterView, emptyUrl } = config;

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
        onRolesChange={setSelectedRoles}
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
        FilterView={FilterView}
      />

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
              url={emptyUrl}
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
            <EventEmpty
              description={<>{title}에 등록된 행사가 없어요</>}
              url={emptyUrl}
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
