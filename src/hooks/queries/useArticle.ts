// src/hooks/queries/useArticle.ts

import { useQuery } from "@tanstack/react-query";
import { getArticleList, searchArticles } from "@/api/article";
import { JobCategory } from "@/constants/category";
import { queryKeys } from "../queryKeys";

// 홈화면 추천 아티클 목록 조회
export const useRecommendedArticles = (tab?: JobCategory) => {
  return useQuery({
    queryKey: queryKeys.home.recommendedArticles(tab),
    queryFn: () => getArticleList(tab),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

// 아티클 검색 및 목록 조회
export const useSearchArticles = (
  keyword?: string,
  page?: number,
  tab?: JobCategory
) => {
  return useQuery({
    queryKey: queryKeys.article.list({ keyword, page, tab }),
    queryFn: () => searchArticles(keyword, page, tab),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
