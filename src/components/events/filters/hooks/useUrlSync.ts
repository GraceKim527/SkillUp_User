// src/components/events/filters/hooks/useUrlSync.ts

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EventSortOption } from "@/constants/event";
import {
  JobCategory,
  JOB_CATEGORY,
  getJobCategoryByLabel,
  getJobCategoryLabel,
} from "@/constants/category";

interface UrlSyncParams {
  selectedRoles: JobCategory[];
  onOfflineFilter: string;
  freeFilter: boolean;
  sortOption: EventSortOption;
  startDate: Date | undefined;
  endDate: Date | undefined;
  currentPage: number;
}

interface SettersParams {
  setSelectedRoles: (roles: JobCategory[]) => void;
  setOnOfflineFilter: (filter: string) => void;
  setFreeFilter: (free: boolean) => void;
  setSortOption: (sort: EventSortOption) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  setCurrentPage: (page: number) => void;
  setTempOnOfflineFilter: (filter: string) => void;
  setTempFreeFilter: (free: boolean) => void;
  setTempStartDate: (date: Date | undefined) => void;
  setTempEndDate: (date: Date | undefined) => void;
}

// 필터 상태를 URL 쿼리 파라미터와 동기화하는 훅
export const useUrlSync = (
  params: UrlSyncParams,
  setters: SettersParams,
  pageId: string
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitializedRef = useRef(false);
  const isUpdatingFromUrlRef = useRef(false);

  // URL에서 초기 상태 읽기 (컴포넌트 마운트 시 한 번만)
  useEffect(() => {
    if (isInitializedRef.current) return;

    isUpdatingFromUrlRef.current = true;
    isInitializedRef.current = true;

    const rolesParam = searchParams.get("roles");
    const onOfflineParam = searchParams.get("mode");
    const freeParam = searchParams.get("isFree");
    const sortParam = searchParams.get("sort");
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const pageParam = searchParams.get("page");

    if (rolesParam) {
      // URL에서 한국어 라벨 또는 enum 값을 읽어서 JobCategory로 변환
      const roles = rolesParam
        .split(",")
        .map((role) => getJobCategoryByLabel(role) || (role as JobCategory));
      setters.setSelectedRoles(roles);
    }

    if (onOfflineParam) {
      setters.setOnOfflineFilter(onOfflineParam);
      setters.setTempOnOfflineFilter(onOfflineParam);
    }

    if (freeParam === "true") {
      setters.setFreeFilter(true);
      setters.setTempFreeFilter(true);
    }

    if (sortParam) {
      setters.setSortOption(sortParam as EventSortOption);
    }

    if (startDateParam) {
      const date = new Date(startDateParam);
      setters.setStartDate(date);
      setters.setTempStartDate(date);
    }

    if (endDateParam) {
      const date = new Date(endDateParam);
      setters.setEndDate(date);
      setters.setTempEndDate(date);
    }

    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page > 0) {
        setters.setCurrentPage(page);
      }
    }

    // URL 초기화가 완료된 후 플래그 해제
    setTimeout(() => {
      isUpdatingFromUrlRef.current = false;
    }, 0);
  }, [pageId, searchParams, setters]);

  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    if (!isInitializedRef.current || isUpdatingFromUrlRef.current) return;

    // 기존 URL 파라미터를 보존하기 위해 현재 searchParams에서 시작
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // 필터 관련 파라미터만 업데이트/삭제
    // roles - JobCategory enum을 한국어 라벨로 변환하여 URL에 저장
    if (
      params.selectedRoles.length > 0 &&
      !params.selectedRoles.includes(JOB_CATEGORY.ALL)
    ) {
      const roleLabels = params.selectedRoles.map((role) =>
        getJobCategoryLabel(role)
      );
      newSearchParams.set("roles", roleLabels.join(","));
    } else {
      newSearchParams.delete("roles");
    }

    // mode (online/offline)
    if (params.onOfflineFilter) {
      newSearchParams.set("mode", params.onOfflineFilter);
    } else {
      newSearchParams.delete("mode");
    }

    // isFree
    if (params.freeFilter) {
      newSearchParams.set("isFree", "true");
    } else {
      newSearchParams.delete("isFree");
    }

    // sort (POPULARITY가 기본값이므로 POPULARITY일 때는 URL에 표시 안 함)
    if (params.sortOption !== "POPULARITY") {
      newSearchParams.set("sort", params.sortOption);
    } else {
      newSearchParams.delete("sort");
    }

    // startDate
    if (params.startDate) {
      newSearchParams.set(
        "startDate",
        params.startDate.toISOString().split("T")[0]
      );
    } else {
      newSearchParams.delete("startDate");
    }

    // endDate
    if (params.endDate) {
      newSearchParams.set(
        "endDate",
        params.endDate.toISOString().split("T")[0]
      );
    } else {
      newSearchParams.delete("endDate");
    }

    // page
    if (params.currentPage > 1) {
      newSearchParams.set("page", params.currentPage.toString());
    } else {
      newSearchParams.delete("page");
    }

    const queryString = newSearchParams.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    // 현재 URL과 다를 때만 업데이트
    const currentSearch = window.location.search;
    const newSearch = queryString ? `?${queryString}` : "";
    if (currentSearch !== newSearch) {
      router.replace(newUrl, { scroll: false });
    }
  }, [
    params.selectedRoles,
    params.onOfflineFilter,
    params.freeFilter,
    params.sortOption,
    params.startDate,
    params.endDate,
    params.currentPage,
    router,
    searchParams,
  ]);
};
