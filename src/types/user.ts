// src/types/user.ts

import { EventListItemDto } from "@/types/event";
import { RoleName } from "@/constants/role";

// OAuth 로그인 상태
export type UserLoginStatus =
  | "NEW_USER" // 신규 유저 (회원가입/온보딩 필요)
  | "EXISTING_USER" // 기존 유저 (정상 사용자)
  | "OTHER_OAUTH_USER" // 동일 이메일로 다른 OAuth로 가입된 유저
  | "WITHDRAW_PENDING_USER"; // 탈퇴 대기 상태 유저

// OAuth 콜백 - 다른 소셜 로그인으로 가입된 유저 정보
export interface OtherOauthUserInfo {
  socialLoginType: string;
  email: string;
  socialId: string;
}

// OAuth 콜백 - 탈퇴 대기 유저 정보
export interface WithdrawPendingUserInfo {
  socialLoginType: string;
  socialId: string;
}

// OAuth 콜백 응답
export interface OAuthCallbackResponse {
  accessToken: string;
  userLoginStatus: UserLoginStatus;
  otherOauthUserInfo?: OtherOauthUserInfo;
  withdrawPendingUserInfo?: WithdrawPendingUserInfo;
}

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

export interface UserBookmarks {
  name: string;
  email: string;
  role: RoleName;
  events: EventListItemDto[];
  closedCount: number;
  recruitingCount: number;
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

// 최근 검색어 항목
export interface RecentSearch {
  id: number;
  keyword: string;
}

// 최근 검색어 목록 응답
export interface RecentSearchesResponse {
  items: RecentSearch[];
}

// 검색어 저장 요청
export interface SaveSearchRequest {
  keyword: string;
}
