// src/components/events/filters/filterElements/DateRangeFilter/index.tsx

"use client";

import CalendarDatePicker from "@/components/common/CalendarDatePicker";
import styles from "./styles.module.css";
import Image from "next/image";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import { useEffect, useRef, useState } from "react";

interface DateRangeFilterProps {
  onSelectStartDate: (date: Date | undefined) => void;
  onSelectEndDate: (date: Date | undefined) => void;
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;
}

export default function DateRangeFilter({
  onSelectStartDate,
  onSelectEndDate,
  selectedStartDate,
  selectedEndDate,
}: DateRangeFilterProps) {
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const startDatePickerRef = useRef<HTMLDivElement>(null);
  const endDatePickerRef = useRef<HTMLDivElement>(null);

  const handleToggleStartDatePicker = () => {
    setIsStartDatePickerOpen(!isStartDatePickerOpen);
    setIsEndDatePickerOpen(false);
  };

  const handleToggleEndDatePicker = () => {
    setIsEndDatePickerOpen(!isEndDatePickerOpen);
    setIsStartDatePickerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !startDatePickerRef.current?.contains(e.target as Node) &&
        !endDatePickerRef.current?.contains(e.target as Node)
      ) {
        setIsStartDatePickerOpen(false);
        setIsEndDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStartDatePickerOpen, isEndDatePickerOpen]);

  return (
    <div className={styles.dateRangeFilterContainer}>
      <span className={styles.dateRangeFilterTitle}>행사 기간</span>
      <div className={styles.dateRangeFilter}>
        <div className={styles.dateRangeFilterItem}>
          <button
            className={styles.dateRangeFilterButton}
            onClick={handleToggleStartDatePicker}
          >
            <span>
              {selectedStartDate
                ? selectedStartDate.toLocaleDateString()
                : "시작일"}
            </span>
            <Image src={CalendarIcon} alt="calendar" />
          </button>
          {isStartDatePickerOpen && (
            <div
              className={styles.dateRangeFilterPicker}
              ref={startDatePickerRef}
            >
              <CalendarDatePicker
                selectedDate={selectedStartDate}
                onDateChange={onSelectStartDate}
              />
            </div>
          )}
        </div>

        <span className={styles.dateRangeFilterSeparator}>~</span>
        <div className={styles.dateRangeFilterItem}>
          <button
            className={styles.dateRangeFilterButton}
            onClick={handleToggleEndDatePicker}
          >
            <span>
              {selectedEndDate
                ? selectedEndDate.toLocaleDateString()
                : "종료일"}
            </span>
            <Image src={CalendarIcon} alt="calendar" />
          </button>
          {isEndDatePickerOpen && (
            <div
              className={styles.dateRangeFilterPicker}
              ref={endDatePickerRef}
            >
              <CalendarDatePicker
                selectedDate={selectedEndDate}
                onDateChange={onSelectEndDate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
