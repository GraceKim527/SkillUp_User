// src/hooks/useBookmarkPage.ts

import { useState, useMemo } from "react";
import { DropdownOption } from "@/components/common/Dropdown";
import { useUserBookmarks } from "@/hooks/useUser";

const sortOptions: DropdownOption[] = [
  { label: "마감임박순", value: "deadline" },
  { label: "최근 북마크순", value: "latest" },
];

export const useBookmarkPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedSort, setSelectedSort] = useState<DropdownOption>(
    sortOptions[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageOption, setSelectedPageOption] = useState<DropdownOption>({
    label: "1",
    value: "1",
  });

  const {
    data: bookmarkData,
    isLoading,
    error,
  } = useUserBookmarks(
    selectedSort.value as "deadline" | "latest",
    currentPage
  );

  const eventList =
    activeTabIndex === 0
      ? bookmarkData?.recruitingEvents || []
      : bookmarkData?.closedEvents || [];

  const totalPages = bookmarkData?.pageInfo.totalPages || 1;

  const pageOptions = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }, [totalPages]);

  // 유틸리티 함수: 페이지를 첫 페이지로 리셋
  const resetToFirstPage = () => {
    setCurrentPage(1);
    setSelectedPageOption({ label: "1", value: "1" });
  };

  // 유틸리티 함수: 스크롤을 맨 위로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    resetToFirstPage();
  };

  const handleSortChange = (option: DropdownOption) => {
    setSelectedSort(option);
    resetToFirstPage();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedPageOption({ label: `${page}`, value: `${page}` });
    scrollToTop();
  };

  const handleDropdownSelect = (option: DropdownOption) => {
    setSelectedPageOption(option);
    const page = parseInt(option.value);
    setCurrentPage(page);
    scrollToTop();
  };

  return {
    // API 데이터
    bookmarkData,
    isLoading,
    error,
    // 상태
    activeTabIndex,
    selectedSort,
    currentPage,
    selectedPageOption,
    // 계산된 값
    eventList,
    totalPages,
    pageOptions,
    sortOptions,
    // 핸들러
    handleTabChange,
    handleSortChange,
    handlePageChange,
    handleDropdownSelect,
  };
};
