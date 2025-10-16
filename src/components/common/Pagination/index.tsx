// src/components/common/Pagination/index.tsx

import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import styles from "./styles.module.css";
import Image from "next/image";
import EllipsisIcon from "@/assets/svg/ellipsisIcon.svg";
import Button from "../Button";
import Dropdown, { DropdownOption } from "../Dropdown";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (option: DropdownOption) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  options,
  selected,
  onSelect,
}: PaginationProps) {
  let pageList = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (totalPages > 3) {
    pageList = pageList.slice(currentPage - 1, currentPage + 2);
  } else {
    pageList = pageList.slice(0, totalPages);
  }

  const handleLeftClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleRightClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.centerPagination}>
        <div className={styles.pageList}>
          <button
            className={styles.paginationPageButton}
            onClick={handleLeftClick}
          >
            <ChevronLeftIcon />
          </button>
          <div className={styles.pageItem}>
            <div className={styles.pageItemList}>
              {pageList.map((page) => (
                <button
                  key={page}
                  className={`${styles.paginationButton} ${
                    currentPage === page ? styles.active : ""
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <span>
              <Image src={EllipsisIcon} alt="ellipsis" />
            </span>
            <button
              className={`${styles.paginationButton} ${
                currentPage === totalPages ? styles.active : ""
              }`}
              onClick={handleRightClick}
            >
              {totalPages}
            </button>
          </div>
          <button
            className={styles.paginationPageButton}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* 오른쪽 영역: Go to Page */}
      <div className={styles.paginationRight}>
        <span className={styles.paginationRightText}>Go to Page</span>
        <div className={styles.paginationRightDropdown}>
          <Dropdown options={options} selected={selected} onSelect={onSelect} />
          <Button variant="secondary" size="large">
            GO
          </Button>
        </div>
      </div>
    </div>
  );
}
