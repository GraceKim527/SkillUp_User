// src/hooks/useRecentSearches.ts

"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "./useAuth";
import { useRecentSearchesQuery } from "./queries/useUser";
import {
  useSaveRecentSearch,
  useDeleteRecentSearch,
  useDeleteAllRecentSearches,
} from "./mutations/useRecentSearchMutations";

const STORAGE_KEY = "recentSearches";
const MAX_SEARCHES = 10;

export const useRecentSearches = () => {
  const { isAuthenticated } = useAuth();

  // 로컬스토리지 상태 (비로그인용)
  const [localSearches, setLocalSearches] = useState<string[]>([]);

  // API 훅들 (로그인용)
  const { data: apiData } = useRecentSearchesQuery();
  const saveSearchMutation = useSaveRecentSearch();
  const deleteSearchMutation = useDeleteRecentSearch();
  const deleteAllMutation = useDeleteAllRecentSearches();

  // 로컬스토리지에서 초기 데이터 로드 (비로그인용)
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setLocalSearches(JSON.parse(saved));
        }
      } catch {
        // silently ignore localStorage read failures
      }
    }
  }, [isAuthenticated]);

  // 로컬스토리지에 저장
  const saveToLocalStorage = (newSearches: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches));
      setLocalSearches(newSearches);
    } catch {
      // silently ignore localStorage write failures
    }
  };

  // 검색어 목록 (로그인 상태에 따라 분기)
  const searches = useMemo(() => {
    if (isAuthenticated && apiData?.items) {
      return apiData.items.map((s) => s.keyword);
    }
    return localSearches;
  }, [isAuthenticated, apiData, localSearches]);

  // 검색어 추가
  const addSearch = (search: string) => {
    const trimmed = search.trim();
    if (!trimmed) return;

    if (isAuthenticated) {
      // 로그인: API 호출
      saveSearchMutation.mutate(trimmed);
    } else {
      // 비로그인: 로컬스토리지
      const filtered = localSearches.filter((s) => s !== trimmed);
      const updated = [trimmed, ...filtered];
      const limited = updated.slice(0, MAX_SEARCHES);
      saveToLocalStorage(limited);
    }
  };

  // 특정 검색어 삭제
  const removeSearch = (search: string) => {
    if (isAuthenticated) {
      // 로그인: API 호출 (id 찾아서 삭제)
      const searchItem = apiData?.items.find((s) => s.keyword === search);
      if (searchItem) {
        deleteSearchMutation.mutate(searchItem.id);
      }
    } else {
      // 비로그인: 로컬스토리지
      const updated = localSearches.filter((s) => s !== search);
      saveToLocalStorage(updated);
    }
  };

  // 전체 삭제
  const clearAll = () => {
    if (isAuthenticated) {
      // 로그인: API 호출
      deleteAllMutation.mutate();
    } else {
      // 비로그인: 로컬스토리지
      saveToLocalStorage([]);
    }
  };

  return {
    searches,
    addSearch,
    removeSearch,
    clearAll,
  };
};
