// src/api/article.ts

import instance from "./instance";
import { ARTICLE_TAB } from "@/constants/article";

// 아티클 목록 조회 API (홈화면)
export const getArticleList = async (tab?: typeof ARTICLE_TAB) => {
  const response = await instance.get("/articles", {
    params: {
      ...(tab && { tab }),
    },
  });
  return response.data.data;
};

// 아티클 목록 조회 및 검색 API
export const searchArticles = async (
  keyword?: string,
  page?: number,
  tab?: string[]
) => {
  const response = await instance.get("/articles/search", {
    params: {
      ...(keyword && { keyword }),
      ...(page !== undefined && { page }),
      // "전체"가 아닌 경우만 tab 파라미터 전달
      ...(tab && tab.length > 0 && !tab.includes("전체") && { tab }),
    },
    paramsSerializer: {
      indexes: null, // tab[]=값 대신 tab=값 형식으로 변경
    },
  });
  return response.data.data;
};
