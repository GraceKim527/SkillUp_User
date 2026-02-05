// src/hooks/queries/useHome.ts

import { useQuery } from "@tanstack/react-query";
import {
  getRecommendedEvents,
  getRecentEvents,
  getFeaturedEvents,
  getEndingSoonEvents,
  getCategoryEvents,
  getBanners,
} from "@/api/home";
import { EventCategory, EVENT_CATEGORY } from "@/constants/event";
import { JobCategory } from "@/constants/category";
import { useAuth } from "../useAuth";
import { queryKeys } from "../queryKeys";
import { RecommendedEventsResponse } from "@/types/event";

// 해시태그 기반 추천 행사
export const useRecommendedEvents = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<RecommendedEventsResponse>({
    queryKey: queryKeys.home.recommended(isAuthenticated),
    queryFn: () => getRecommendedEvents(isAuthenticated),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: isAuthenticated,
  });
};

// 최근 본 행사
export const useRecentEvents = (enabled = true) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.home.recent(isAuthenticated),
    queryFn: () => getRecentEvents(isAuthenticated),
    staleTime: 1 * 60 * 1000, // 1분간 캐시 유지
    enabled,
  });
};

// 추천/인기 행사 리스트
export const useFeaturedEvents = (
  category?: JobCategory,
  size?: number,
  enabled = true
) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.home.featured(isAuthenticated, category, size),
    queryFn: () => getFeaturedEvents(isAuthenticated, category, size),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled,
  });
};

// 곧 종료되는 행사 리스트
export const useEndingSoonEvents = (size?: number) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.home.endingSoon(isAuthenticated, size),
    queryFn: () => getEndingSoonEvents(isAuthenticated, size),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: true,
  });
};

// 카테고리별 홈 리스트
export const useCategoryEvents = (
  category?: EventCategory,
  tab?: JobCategory,
  size?: number,
  page?: number,
  enabled = true
) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.home.category({ isAuthenticated, category, tab, size, page }),
    queryFn: () =>
      getCategoryEvents(
        isAuthenticated,
        category as Exclude<EventCategory, typeof EVENT_CATEGORY.ARTICLE>,
        tab,
        size,
        page
      ),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: enabled && !!category, // category가 있을 때만 실행
  });
};

// 배너 조회
export const useBanners = (enabled = true) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.home.banners(isAuthenticated),
    queryFn: () => getBanners(isAuthenticated),
    staleTime: 10 * 60 * 1000, // 10분간 캐시 유지
    enabled,
  });
};
