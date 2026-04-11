// src/components/events/filters/views/EventFilterView.tsx

"use client";

import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import FreeFilter from "../filterElements/FreeFilter";
import DateRangeFilter from "../filterElements/DateRangeFilter";
import Flex from "@/components/common/Flex";
import { usePageFilters } from "../hooks/usePageFilters";
import { EventPageId } from "@/components/events/EventPageLayout/config";

interface EventFilterViewProps {
  pageId: EventPageId;
}

/**
 * 이벤트 페이지(컨퍼런스/부트캠프/해커톤) 공용 필터 뷰.
 * - conference: 온오프라인 + 무료
 * - bootcamp: 온오프라인 + 무료(국비교육)
 * - hackathon: 온오프라인 + 날짜 범위
 */
export default function EventFilterView({ pageId }: EventFilterViewProps) {
  const {
    tempOnOfflineFilter,
    setTempOnOfflineFilter,
    tempFreeFilter,
    setTempFreeFilter,
    tempStartDate,
    setTempStartDate,
    tempEndDate,
    setTempEndDate,
  } = usePageFilters({ pageId });

  return (
    <Flex direction="column" gap={1.5}>
      <OnOfflineFilter
        onSelect={setTempOnOfflineFilter}
        selected={tempOnOfflineFilter}
      />
      {pageId === "conference" && (
        <FreeFilter checked={tempFreeFilter} setChecked={setTempFreeFilter} />
      )}
      {pageId === "bootcamp" && (
        <FreeFilter
          checked={tempFreeFilter}
          setChecked={setTempFreeFilter}
          label="무료(국비교육)만 보기"
        />
      )}
      {pageId === "hackathon" && (
        <DateRangeFilter
          onSelectStartDate={setTempStartDate}
          onSelectEndDate={setTempEndDate}
          selectedStartDate={tempStartDate}
          selectedEndDate={tempEndDate}
        />
      )}
    </Flex>
  );
}
