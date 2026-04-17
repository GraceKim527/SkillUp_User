// src/api/home.ts

import instance from "./instance";
import { getAuthAwareInstance } from "./getAuthAwareInstance";
import { EventCategory } from "@/constants/event";
import { JobCategory } from "@/constants/category";
import { BannersResponse } from "@/types/home";
import {
  Event,
  EventListResponse,
  RecommendedEventsResponse,
} from "@/types/event";

// 해시태그 기반 추천
export const getHashtagRecommendedEvents = async (): Promise<RecommendedEventsResponse> => {
  const response = await getAuthAwareInstance().get("/events/home/recommended");
  return response.data.data;
};

// 최근 본 행사 (비로그인/로그인 모두 가능)
export const getRecentEvents = async (): Promise<Event[]> => {
  const response = await getAuthAwareInstance().get("/events/home/recent");
  return response.data.data;
};

// 추천/인기 행사 리스트
export const getFeaturedEvents = async (
  tab?: JobCategory,
  size?: number
): Promise<EventListResponse> => {
  const response = await getAuthAwareInstance().get("/events/home/featured", {
    params: {
      ...(tab && { tab }),
      ...(size !== undefined && { size }),
    },
  });
  return response.data.data;
};

// 곧 종료되는 행사 리스트
export const getEndingSoonEvents = async (
  size?: number
): Promise<EventListResponse> => {
  const response = await getAuthAwareInstance().get("/events/home/closing-soon", {
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
): Promise<EventListResponse> => {
  const response = await getAuthAwareInstance().get("/events/home/category", {
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
  const response = await getAuthAwareInstance().get("/events/home/banners");
  return response.data.data;
};

// 배너 조회수 증가
export const incrementBannerView = async (bannerId: number): Promise<void> => {
  await instance.post(`/events/home/apply/banner/${bannerId}`);
};
