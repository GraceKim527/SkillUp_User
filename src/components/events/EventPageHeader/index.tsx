// src/components/events/EventPageHeader/index.tsx

"use client";

import EventHeader from "@/components/events/EventHeader";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import RoleSelector from "@/components/events/filters/RoleSelector";
import FilterBadges from "@/components/events/filters/FilterBadges";
import Flex from "@/components/common/Flex";
import { SORT_OPTIONS } from "@/constants/pagination";
import { RoleOption } from "@/components/events/filters/types/role";

interface EventPageHeaderProps {
  title: string;
  count: number;
  selectedRoles: RoleOption[];
  onRolesChange: (roles: RoleOption[]) => void;
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
  return (
    <Flex direction="column" gap={1.5} style={{ width: "100%" }}>
      <EventHeader title={title} count={count} />
      <Flex align="center" justify="space-between">
        <RoleSelector selected={selectedRoles} onSelect={onRolesChange} />
        <Flex align="center" gap={0.5}>
          <FilterBadges
            onOfflineFilter={onOfflineFilter}
            freeFilter={freeFilter}
            onClearOnOfflineFilter={onClearOnOfflineFilter}
            onClearFreeFilter={onClearFreeFilter}
          />
          <FilterButton onApply={onApply} onReset={onReset}>
            <FilterView />
          </FilterButton>
          <SortDropdown
            selected={
              SORT_OPTIONS.find((option) => option.value === sortOption) ||
              SORT_OPTIONS[0]
            }
            setSelected={(option) => onSortChange(option.value)}
            options={SORT_OPTIONS}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
