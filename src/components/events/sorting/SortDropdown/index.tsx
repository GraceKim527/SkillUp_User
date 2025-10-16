// src/components/events/sorting/SortDropdown/index.tsx

"use client";

import Dropdown, { DropdownOption } from "@/components/common/Dropdown";

export default function SortDropdown({
  selected,
  setSelected,
  options,
}: {
  selected: DropdownOption;
  setSelected: (option: DropdownOption) => void;
  options: DropdownOption[];
}) {
  // TODO: 정렬에 맞춰 API 호출 or 상태 갱신
  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
  };

  return (
    <Dropdown options={options} selected={selected} onSelect={handleSelect} />
  );
}
