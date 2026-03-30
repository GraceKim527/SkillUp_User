// src/api/home.ts

import instance from "./instance";
import tokenInstance from "./tokenInstance";
import { EventCategory } from "@/constants/event";
import { JobCategory } from "@/constants/category";
import { BannersResponse } from "@/types/home";
import { RecommendedEventsResponse } from "@/types/event";
import { getDefaultStore } from "jotai";
import { tokenAtom } from "@/store/authAtoms";

// 해시태그 기반 추천
export const getRecommendedEvents = async (): Promise<RecommendedEventsResponse> => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  const axiosInstance = token ? tokenInstance : instance;
  const response = await axiosInstance.get("/events/home/recommended");
  return response.data.data;
};

// 최근 본 행사 (비로그인/로그인 모두 가능)
export const getRecentEvents = async () => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  const axiosInstance = token ? tokenInstance : instance;
  const response = await axiosInstance.get("/events/home/recent");
  return response.data.data;
};

// 추천/인기 행사 리스트
export const getFeaturedEvents = async (
  category?: JobCategory,
  size?: number
) => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  const axiosInstance = token ? tokenInstance : instance;
  const response = await axiosInstance.get("/events/home/featured", {
    params: {
      ...(category && { category }),
      ...(size !== undefined && { size }),
    },
  });
  return response.data.data;
};

// 곧 종료되는 행사 리스트
export const getEndingSoonEvents = async (size?: number) => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  const axiosInstance = token ? tokenInstance : instance;
  const response = await axiosInstance.get("/events/home/closing-soon", {
    params: {
      ...(size !== undefined && { size }),
    },
  });
  return response.data.data;
};

// 카테고리별 홈 리스트
export const getCategoryEvents = async (
  category?: Exclude<EventCategory, "ARTICLE">,
  tab?: JobCategory,
  size?: number,
  page?: number
) => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  const axiosInstance = token ? tokenInstance : instance;
  const response = await axiosInstance.get("/events/home/category", {
    params: {
      ...(category && { category }),
      ...(tab !== undefined && { tab }),
      ...(size !== undefined && { size }),
      ...(page !== undefined && { page }),
    },
  });
  return response.data.data;
};

// 배너 조회
export const getBanners = async (): Promise<BannersResponse> => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  const axiosInstance = token ? tokenInstance : instance;
  const response = await axiosInstance.get("/events/home/banners");
  return response.data.data;
};

// 배너 조회수 증가
export const incrementBannerView = async (bannerId: number): Promise<void> => {
  await instance.post(`/events/home/apply/banner/${bannerId}`);
};
