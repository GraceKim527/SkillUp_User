// src/types/event.ts
import {
  EventCategory,
  EventSortOption,
  EventStatus,
  EventFormat,
} from "@/constants/event";

// 모든 이벤트의 공통 기본 필드
export interface BaseEvent {
  id: number;
  title: string;
  thumbnailUrl: string;
  category: EventCategory;
}

// 이벤트 목록 API 응답 (서버 → 클라이언트)
export interface EventListItemDto extends BaseEvent {
  online: boolean; // API 필드명 그대로
  locationText: string;
  scheduleText: string; // 서버에서 포맷팅해서 줌
  priceText: string; // 서버에서 포맷팅해서 줌
  d_dayLabel: string; // 서버에서 계산해서 줌
  recommended: boolean;
  ad: boolean;
  bookmarked: boolean;
  recommendedRate: number;
}

// 이벤트 상세 API 응답 (서버 → 클라이언트)
export interface EventDetailDto extends BaseEvent {
  eventStart: string; // ISO 8601 형식
  eventEnd: string;
  recruitStart: string;
  recruitEnd: string;
  isFree: boolean;
  price: number;
  isOnline: boolean;
  locationText: string;
  locationLink: string;
  applyLink: string;
  status: EventStatus;
  contact: string;
  description: string;
  hashTags: string[];
  targetRoles: string[];
  bookmarked: boolean;
}

// 클라이언트에서 사용하는 이벤트 타입
// EventListItemDto의 별칭
export type Event = EventListItemDto;

// 클라이언트에서 사용하는 이벤트 상세 타입
// EventDetailDto의 별칭
export type EventDetail = EventDetailDto;

// 행사 목록 조회 요청 파라미터
// 카테고리별 행사 목록을 필터링하고 정렬하는데 사용
export interface EventSearchParams {
  category: EventCategory;
  isOnline?: boolean;
  isFree?: boolean;
  startDate?: string; // YYYY-MM-DD 형식
  endDate?: string; // YYYY-MM-DD 형식
  sort: EventSortOption;
  targetRoles?: string[];
  page: number;
  validDateRange?: boolean;
  validSort?: boolean;
}

// 행사 목록 조회 API 응답
export interface EventListResponse {
  total: number;
  homeEventResponseList: Event[];
}

// 행사 검색 요청 파라미터
// 키워드 기반 행사 검색에 사용
export interface EventSearchRequest {
  searchString: string;
  sort?: EventSortOption;
  eventStart?: string; // YYYY-MM-DD 형식
  eventEnd?: string; // YYYY-MM-DD 형식
  eventFormat?: EventFormat;
  isFree?: boolean;
  page: number;
}
