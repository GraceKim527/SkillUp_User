// src/components/events/filters/hooks/usePageFilters.ts

import { useAtom } from "jotai";
import { pageFilterAtomsMap, PageId } from "../atoms/pageFilterAtoms";

interface UsePageFiltersProps {
  pageId: PageId;
}

export const usePageFilters = ({ pageId }: UsePageFiltersProps) => {
  const atoms = pageFilterAtomsMap[pageId];

  // Atom 상태 관리
  const [selectedRoles, setSelectedRoles] = useAtom(atoms.roleFilterAtom);
  const [onOfflineFilter, setOnOfflineFilter] = useAtom(
    atoms.onOfflineFilterAtom
  );
  const [freeFilter, setFreeFilter] = useAtom(atoms.freeFilterAtom);
  const [sortOption, setSortOption] = useAtom(atoms.sortOptionAtom);
  const [startDate, setStartDate] = useAtom(atoms.startDateAtom);
  const [endDate, setEndDate] = useAtom(atoms.endDateAtom);
  const [tempOnOfflineFilter, setTempOnOfflineFilter] = useAtom(
    atoms.tempOnOfflineFilterAtom
  );
  const [tempFreeFilter, setTempFreeFilter] = useAtom(atoms.tempFreeFilterAtom);
  const [tempStartDate, setTempStartDate] = useAtom(atoms.tempStartDateAtom);
  const [tempEndDate, setTempEndDate] = useAtom(atoms.tempEndDateAtom);

  // 필터 적용 함수
  const handleApply = () => {
    setOnOfflineFilter(tempOnOfflineFilter);
    setFreeFilter(tempFreeFilter);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  // 필터 초기화 함수
  const handleReset = () => {
    // 실제 필터 상태 초기화
    setOnOfflineFilter("");
    setFreeFilter(false);
    setStartDate(undefined);
    setEndDate(undefined);

    // 임시 필터 상태도 초기화
    setTempOnOfflineFilter("");
    setTempFreeFilter(false);
    setTempStartDate(undefined);
    setTempEndDate(undefined);
  };

  // 역할 필터 초기화 함수
  const resetRoleFilter = () => {
    setSelectedRoles(["전체"]);
  };

  // 정렬 옵션 초기화 함수
  const resetSortOption = () => {
    setSortOption("인기순");
  };

  // 모든 필터 초기화 함수
  const resetAllFilters = () => {
    handleReset();
    resetRoleFilter();
    resetSortOption();
    setStartDate(undefined);
    setEndDate(undefined);
    setTempStartDate(undefined);
    setTempEndDate(undefined);
  };

  return {
    // 상태
    selectedRoles,
    onOfflineFilter,
    freeFilter,
    sortOption,
    tempOnOfflineFilter,
    tempFreeFilter,
    startDate,
    endDate,
    tempStartDate,
    tempEndDate,
    // 액션
    setSelectedRoles,
    setOnOfflineFilter,
    setFreeFilter,
    setSortOption,
    setTempOnOfflineFilter,
    setTempFreeFilter,
    setStartDate,
    setEndDate,
    setTempStartDate,
    setTempEndDate,
    // 핸들러
    handleApply,
    handleReset,
    resetRoleFilter,
    resetSortOption,
    resetAllFilters,
  };
};
