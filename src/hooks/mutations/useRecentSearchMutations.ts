// src/hooks/mutations/useRecentSearchMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveRecentSearch,
  deleteRecentSearch,
  deleteAllRecentSearches,
} from "@/api/user";
import { queryKeys } from "../queryKeys";

// 검색어 저장 mutation
export const useSaveRecentSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keyword: string) => saveRecentSearch({ keyword }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.recentSearches() });
    },
  });
};

// 검색어 단일 삭제 mutation
export const useDeleteRecentSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recentId: number) => deleteRecentSearch(recentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.recentSearches() });
    },
  });
};

// 검색어 전체 삭제 mutation
export const useDeleteAllRecentSearches = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllRecentSearches,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.recentSearches() });
    },
  });
};
