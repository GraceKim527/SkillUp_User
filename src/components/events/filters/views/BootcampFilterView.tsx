// src/components/events/filters/views/BootcampFilterView.tsx

"use client";

import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import FreeFilter from "../filterElements/FreeFilter";
import styles from "./styles.module.css";
import { usePageFilters } from "../../filters/hooks/usePageFilters";

export default function BootcampFilterView() {
  const {
    tempOnOfflineFilter,
    setTempOnOfflineFilter,
    tempFreeFilter,
    setTempFreeFilter,
  } = usePageFilters({ pageId: "bootcamp" });
  return (
    <div className={styles.bootcampFilterView}>
      <OnOfflineFilter
        onSelect={setTempOnOfflineFilter}
        selected={tempOnOfflineFilter}
      />
      <FreeFilter
        checked={tempFreeFilter}
        setChecked={setTempFreeFilter}
        label="무료(국비교육)만 보기"
      />
    </div>
  );
}
