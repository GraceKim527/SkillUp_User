// src/components/events/EventPageLayout/index.tsx

"use client";

import { useState, useMemo } from "react";
import EventCard from "@/components/common/EventCard";
import EventEmpty from "@/components/events/EventEmpty";
import EventPageHeader from "@/components/events/EventPageHeader";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/common/Button";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { Event } from "@/types/event/event";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import { ITEMS_PER_PAGE, generatePageOptions } from "@/constants/pagination";
import styles from "./styles.module.css";

interface EventPageLayoutProps {
  pageId: "bootcamp" | "conference" | "hackathon" | "mentoring";
  title: string;
  eventList: Event[];
  FilterView: React.ComponentType;
  emptyUrl: string;
}

export default function EventPageLayout({
  pageId,
  title,
  eventList,
  FilterView,
  emptyUrl,
}: EventPageLayoutProps) {
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

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(eventList.length / ITEMS_PER_PAGE);
  const pageOptions = useMemo(
    () => generatePageOptions(totalPages),
    [totalPages]
  );

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
    <Flex direction="column" align="flex-start" gap={1.25} className={styles.container}>
      <EventPageHeader
        title={title}
        count={eventList.length}
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
        onSortChange={setSortOption}
        onApply={handleApply}
        onReset={handleReset}
        FilterView={FilterView}
      />

      <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
        {eventList.length === 0 ? (
          <>
            <EventEmpty title={title} url={emptyUrl} />
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
              <div className={styles.cardList}>
                {/* 추천 행사 데이터는 props로 받을 수 있도록 확장 가능 */}
              </div>
            </Flex>
          </>
        ) : (
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
              options={pageOptions}
              selected={
                pageOptions.find((opt) => opt.value === `${currentPage}`) ||
                pageOptions[0]
              }
              onSelect={(option) => setCurrentPage(parseInt(option.value))}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
