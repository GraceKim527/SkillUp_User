// src/components/events/filters/views/HackathonFilterView.tsx

"use client";

import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import styles from "./styles.module.css";
import { usePageFilters } from "../../filters/hooks/usePageFilters";
import DateRangeFilter from "../filterElements/DateRangeFilter";

export default function HackathonFilterView() {
  const {
    tempOnOfflineFilter,
    setTempOnOfflineFilter,
    tempStartDate,
    setTempStartDate,
    tempEndDate,
    setTempEndDate,
  } = usePageFilters({
    pageId: "hackathon",
  });
  return (
    <div className={styles.hackathonFilterView}>
      <OnOfflineFilter
        onSelect={setTempOnOfflineFilter}
        selected={tempOnOfflineFilter}
      />
      <DateRangeFilter
        onSelectStartDate={setTempStartDate}
        onSelectEndDate={setTempEndDate}
        selectedStartDate={tempStartDate}
        selectedEndDate={tempEndDate}
      />
    </div>
  );
}
