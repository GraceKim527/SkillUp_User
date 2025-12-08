// src/api/user/user.ts

import tokenInstance from "@/api/tokenInstance";
import instance from "@/api/instance";
import { UserProfile } from "@/types/user";
import { EventCategory } from "@/constants/event";

// 테스트 로그인 API
export const getTestLogin = async () => {
  const response = await tokenInstance.get("/user/test-login");
  // response.data.data가 실제 토큰 값
  return response.data.data;
};

// 유저 데이터 조회 API
export const getUserData = async () => {
  const response = await tokenInstance.get("/user/all");
  return response.data;
};

// 유저 프로필 업데이트
export const updateUserProfile = async (data: UserProfile) => {
  const response = await tokenInstance.put(
    "/user/my-page/profile/update",
    data
  );
  return response.data;
};

// 고객센터 FAQ 조회 (공개 API)
export const getCustomerCenterInquiry = async () => {
  const response = await instance.get("/user/my-page/qna");
  return response.data.data;
};

// 유저 프로필 관심사
export const getUserInterests = async (
  roleName: "기획자" | "디자이너" | "개발자" | "마케팅"
) => {
  const response = await tokenInstance.get("/user/my-page/profile/interest", {
    params: {
      roleName,
    },
  });
  return response.data.data;
};

// 유저 이메일 및 이름
export const getUserEmailAndName = async () => {
  const response = await tokenInstance.get("/user/my-page/home");
  return response.data.data;
};

// 유저 북마크 조회
export const getUserBookmarks = async (
  category: EventCategory,
  sort: "deadline" | "latest",
  page: number
) => {
  const response = await tokenInstance.get("/user/my-page/bookmark", {
    params: {
      category,
      sort,
      page,
    },
  });
  return response.data.data;
};
