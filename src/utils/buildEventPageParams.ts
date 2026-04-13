// src/utils/buildEventPageParams.ts

import { getEventList } from "@/api/events";
import { DEFAULT_SORT_OPTION, EventCategory, EventSortOption, EVENT_SORT_OPTIONS } from "@/constants/event";
import { getJobCategoryByLabel, JOB_CATEGORY } from "@/constants/category";
import { Event, EventSearchParams } from "@/types/event";

type RawSearchParams = { [key: string]: string | string[] | undefined };

interface EventPageData {
  apiParams: EventSearchParams;
  initialEventList: Event[];
}

/**
 * URL searchParams를 API 파라미터로 변환하고 초기 데이터를 SSR로 로드한다.
 */
export async function buildEventPageParams(
  category: EventCategory,
  params: RawSearchParams
): Promise<EventPageData> {
  const rawPage = params.page ? parseInt(params.page as string, 10) : 1;
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  // 정렬 옵션 검증
  const sortParam = params.sort as string;
  const validSortOptions = Object.values(EVENT_SORT_OPTIONS);
  const sort: EventSortOption = validSortOptions.includes(
    sortParam as EventSortOption
  )
    ? (sortParam as EventSortOption)
    : DEFAULT_SORT_OPTION;

  // URL 파라미터를 API 파라미터로 변환
  const apiParams: EventSearchParams = {
    category,
    sort,
    page: currentPage - 1, // UI 1-based -> API 0-based
  };

  // 역할 필터 (단일 선택)
  if (params.roles && typeof params.roles === "string") {
    const role = getJobCategoryByLabel(params.roles) || (params.roles as typeof JOB_CATEGORY[keyof typeof JOB_CATEGORY]);
    if (role !== JOB_CATEGORY.ALL) {
      apiParams.targetRole = role;
    }
  }

  // 온/오프라인 필터
  if (params.mode === "online") {
    apiParams.isOnline = true;
  } else if (params.mode === "offline") {
    apiParams.isOnline = false;
  }

  // 무료 필터
  if (params.isFree === "true") {
    apiParams.isFree = true;
  }

  // 날짜 필터
  if (params.startDate && typeof params.startDate === "string") {
    apiParams.startDate = params.startDate;
  }
  if (params.endDate && typeof params.endDate === "string") {
    apiParams.endDate = params.endDate;
  }

  // SSR: 초기 데이터 서버에서 로드 (URL 파라미터 반영)
  let initialEventList: Event[] = [];
  try {
    const response = await getEventList(apiParams);
    initialEventList = response?.homeEventResponseList || [];
  } catch (error) {
    initialEventList = [];
  }

  return { apiParams, initialEventList };
}
