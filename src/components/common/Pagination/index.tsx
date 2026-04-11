// src/components/common/Pagination/index.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import EllipsisIcon from "@/assets/svg/ellipsisIcon.svg";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "../Button";
import Dropdown, { DropdownOption } from "../Dropdown";
import Text from "../Text";
import Flex from "../Flex";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

type PaginationMode = "mobile" | "tablet" | "desktop";

type PageItem = number | "ellipsis";

/**
 * 화면 크기별 표시할 페이지 목록 생성
 * - 모바일: 현재 페이지 1개만
 * - 태블릿: 최대 3개 (이전/다음 1개씩)
 * - 데스크톱: 최대 5개 (양쪽 끝 + ellipsis)
 */
const createPageList = (
  mode: PaginationMode,
  currentPage: number,
  totalPages: number
): PageItem[] => {
  const pages: PageItem[] = [];

  if (mode === "mobile") {
    pages.push(currentPage);
    return pages;
  }

  if (mode === "tablet") {
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    if (currentPage === 1) {
      pages.push(1, 2, 3);
    } else if (currentPage === totalPages) {
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }
    return pages;
  }

  // 데스크톱
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  if (currentPage <= 3) {
    pages.push(1, 2, 3);
    pages.push("ellipsis");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push("ellipsis");
    for (let i = currentPage; i < currentPage + 4 && i <= totalPages; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
  }

  return pages;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  options?: DropdownOption[];
  selected?: DropdownOption;
  onSelect?: (option: DropdownOption) => void;
  goToPage?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  options: externalOptions,
  selected: externalSelected,
  onSelect: externalOnSelect,
  goToPage = true,
}: PaginationProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const mode: PaginationMode = isMobile
    ? "mobile"
    : isTablet
      ? "tablet"
      : "desktop";

  // totalPages에서 파생: 전체 페이지 옵션
  const pageOptions = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => ({
        label: `${i + 1}`,
        value: `${i + 1}`,
      })),
    [totalPages]
  );

  // 내부 드롭다운 선택 상태 — 외부 onSelect가 없을 때 "GO" 버튼이 누르기 전까지의 pending 선택을 담는다.
  const [selectedPageOption, setSelectedPageOption] =
    useState<DropdownOption | null>(() => pageOptions[0] || null);

  // currentPage 변경 시 드롭다운 선택값 동기화
  useEffect(() => {
    if (pageOptions.length > 0) {
      const currentOption = pageOptions.find(
        (opt) => opt.value === `${currentPage}`
      );
      if (currentOption) {
        setSelectedPageOption(currentOption);
      }
    }
  }, [currentPage, pageOptions]);

  const handleGoClick = () => {
    if (selectedPageOption) {
      const pageNumber = parseInt(selectedPageOption.value, 10);
      onPageChange(pageNumber);
    }
  };

  const handlePageSelect = (option: DropdownOption) => {
    setSelectedPageOption(option);
    if (externalOnSelect) {
      externalOnSelect(option);
    }
  };

  const dropdownOptions = externalOptions || pageOptions;
  const dropdownSelected = externalSelected || selectedPageOption;
  const dropdownOnSelect = externalOnSelect || handlePageSelect;

  const pageList = createPageList(mode, currentPage, totalPages);

  const handleLeftClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleRightClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // 모바일 레이아웃
  if (isMobile) {
    return (
      <div className={`${styles.pagination} ${styles.mobilePagination}`}>
        <Flex gap="1.25rem" align="center" justify="center">
          <button
            className={`${styles.paginationPageButton} ${styles.mobileButton}`}
            onClick={handleLeftClick}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>

          <Flex gap="0.5rem" align="center">
            {pageList.map((item) => {
              if (item === "ellipsis") return null;
              return (
                <button
                  key={item}
                  className={`${styles.paginationButton} ${styles.mobileButton} ${
                    currentPage === item ? styles.active : ""
                  }`}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              );
            })}
          </Flex>

          <button
            className={`${styles.paginationPageButton} ${styles.mobileButton}`}
            onClick={handleRightClick}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon color="#000" />
          </button>
        </Flex>
      </div>
    );
  }

  // 태블릿 레이아웃
  if (isTablet) {
    return (
      <div className={`${styles.pagination} ${styles.tabletPagination}`}>
        <Flex gap="2rem" align="center" justify="center">
          <button
            className={styles.paginationPageButton}
            onClick={handleLeftClick}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>

          <Flex gap="0.5rem" align="center">
            {pageList.map((item, idx) => {
              if (item === "ellipsis") {
                return (
                  <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                    <Image src={EllipsisIcon} alt="..." />
                  </span>
                );
              }
              return (
                <button
                  key={item}
                  className={`${styles.paginationButton} ${
                    currentPage === item ? styles.active : ""
                  }`}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              );
            })}
          </Flex>

          <button
            className={styles.paginationPageButton}
            onClick={handleRightClick}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon color="#000" />
          </button>
        </Flex>
      </div>
    );
  }

  // 데스크톱 레이아웃
  return (
    <div className={styles.pagination}>
      <Flex gap="8px" className={styles.centerPagination}>
        <Flex gap="3.75rem" align="center">
          <button
            className={styles.paginationPageButton}
            onClick={handleLeftClick}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>

          <Flex gap="0.5rem" align="center">
            {pageList.map((item, idx) => {
              if (item === "ellipsis") {
                return (
                  <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                    <Image src={EllipsisIcon} alt="..." />
                  </span>
                );
              }

              return (
                <button
                  key={item}
                  className={`${styles.paginationButton} ${
                    currentPage === item ? styles.active : ""
                  }`}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              );
            })}
          </Flex>

          <button
            className={styles.paginationPageButton}
            onClick={handleRightClick}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon color="#000" />
          </button>
        </Flex>
      </Flex>

      {goToPage && dropdownSelected && (
        <Flex align="center" gap="0.75rem" className={styles.paginationRight}>
          <Text typography="label2_m_16" color="neutral-30">
            Go to Page
          </Text>
          <Flex gap="0.25rem" align="center">
            <Dropdown
              options={dropdownOptions}
              selected={dropdownSelected}
              onSelect={dropdownOnSelect}
            />
            <Button variant="secondary" size="large" onClick={handleGoClick}>
              GO
            </Button>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default Pagination;
