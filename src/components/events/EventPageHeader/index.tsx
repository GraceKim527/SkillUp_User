// src/components/events/EventPageHeader/index.tsx

"use client";

import EventHeader from "@/components/events/EventHeader";
import Dropdown from "@/components/common/Dropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import RoleSelector from "@/components/events/filters/RoleSelector";
import FilterBadges from "@/components/events/filters/FilterBadges";
import Flex from "@/components/common/Flex";
import { SORT_OPTIONS } from "@/constants/pagination";
import {
  getJobCategoryLabel,
  getJobCategoryByLabel,
  JOB_CATEGORY_TABS,
  JobCategory,
} from "@/constants/category";
import { useIsMobile } from "@/hooks/useMediaQuery";
import Tab from "@/components/common/Tab";
import Text from "@/components/common/Text";

interface EventPageHeaderProps {
  title: string;
  count: number;
  selectedRoles: JobCategory[];
  onRolesChange: (roles: JobCategory[]) => void;
  onOfflineFilter: string;
  freeFilter: boolean;
  onClearOnOfflineFilter: () => void;
  onClearFreeFilter: () => void;
  sortOption: string;
  onSortChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  FilterView: React.ComponentType;
}

export default function EventPageHeader({
  title,
  count,
  selectedRoles,
  onRolesChange,
  onOfflineFilter,
  freeFilter,
  onClearOnOfflineFilter,
  onClearFreeFilter,
  sortOption,
  onSortChange,
  onApply,
  onReset,
  FilterView,
}: EventPageHeaderProps) {
  const isMobile = useIsMobile();

  const sortDropdown = (
    <Dropdown
      variant="sort"
      selected={
        SORT_OPTIONS.find((option) => option.value === sortOption) ||
        SORT_OPTIONS[0]
      }
      onSelect={(option) => onSortChange(option.value)}
      options={SORT_OPTIONS}
    />
  );

  const filterControls = (
    <>
      <FilterBadges
        onOfflineFilter={onOfflineFilter}
        freeFilter={freeFilter}
        onClearOnOfflineFilter={onClearOnOfflineFilter}
        onClearFreeFilter={onClearFreeFilter}
      />
      <FilterButton onApply={onApply} onReset={onReset}>
        <FilterView />
      </FilterButton>
      {sortDropdown}
    </>
  );

  if (isMobile) {
    return (
      <Flex direction="column" gap={1.5} style={{ width: "100%" }}>
        <EventHeader title={title} count={count} />
        {/* 모바일: 세로 정렬 */}
        <Flex direction="column" gap={0.75} style={{ width: "100%" }}>
          <Tab
            tabs={JOB_CATEGORY_TABS}
            defaultIndex={JOB_CATEGORY_TABS.indexOf(
              getJobCategoryLabel(selectedRoles[0]),
            )}
            onChange={(_index, label) => {
              const category = getJobCategoryByLabel(label);
              onRolesChange([category]);
            }}
            theme="light"
          />
          <Flex align="center" justify="space-between" gap={0.5}>
            <Flex align="center" gap={0.25}>
              <Text typography="sub3_m_16" color="neutral-50" as="span">
                {count}개
              </Text>
              <Text typography="body1_r_16" color="neutral-50" as="span">
                행사
              </Text>
            </Flex>

            <Flex align="center" gap={0.5}>
              {filterControls}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={1.5} style={{ width: "100%" }}>
      <EventHeader title={title} count={count} />
      {/* 데스크톱: 가로 정렬 */}
      <Flex align="center" justify="space-between">
        <RoleSelector selected={selectedRoles} onSelect={onRolesChange} />
        <Flex align="center" gap={0.5}>
          {filterControls}
        </Flex>
      </Flex>
    </Flex>
  );
}
