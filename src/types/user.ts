// src/types/user.ts

import { EventCategory } from "@/constants/event";
import { RoleName } from "@/constants/role";

export interface UserProfile {
  name: string;
  profileImageUrl: string;
  age: string;
  gender: string;
  role: string;
  interests: string[];
  marketingAgreement: boolean;
}

// 프로필 업데이트 요청 타입
export interface UpdateUserProfileRequest {
  name: string;
  age: string;
  gender: string;
  role: string;
  interests: string[];
  marketingAgreement: boolean;
  profileImage?: File | null; // 선택적 파일
}

export interface CustomerCenterInquiry {
  question: string;
  answerTitle: string;
  answerContent: string;
}

export interface UserBookmarksEvent {
  id: number;
  thumbnailUrl: string;
  online: boolean;
  locationText: string;
  title: string;
  scheduleText: string;
  priceText: string;
  d_dayLabel: string;
  recommended: boolean;
  ad: boolean;
  bookmarked: boolean;
  category: EventCategory;
  recommendedRate: number;
}

export interface UserBookmarks {
  name: string;
  email: string;
  recruitingEvents: UserBookmarksEvent[];
  closedEvents: UserBookmarksEvent[];
  role: RoleName;
  bookmarkCount: number;
  pageInfo: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

// 유저 이메일 및 이름 응답 타입
export interface UserEmailAndName {
  name: string;
  email: string;
  profileImageUrl: string;
}

// 탈퇴 사유 카테고리
export interface WithdrawalCategory {
  description: string;
}

// 회원 탈퇴 요청
export interface WithdrawRequest {
  detail: string;
}
