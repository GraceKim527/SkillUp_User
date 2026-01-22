// src/api/user/user.ts

import tokenInstance from "@/api/tokenInstance";
import instance from "@/api/instance";
import {
  UserBookmarks,
  UpdateUserProfileRequest,
  UserEmailAndName,
  WithdrawalCategory,
  WithdrawRequest,
} from "@/types/user";
import { RoleName } from "@/constants/role";

// 테스트 로그인 API
export const getTestLogin = async () => {
  const response = await instance.get("/user/test-login");
  // response.data.data가 실제 토큰 값
  return response.data.data;
};

// 유저 정보 조회 API
export const getUser = async () => {
  const response = await tokenInstance.get("/user");
  return response.data.data;
};

// 유저 프로필 업데이트
export const updateUserProfile = async (data: UpdateUserProfileRequest) => {
  const formData = new FormData();

  // request 객체를 JSON Blob으로 만들어서 추가
  const requestData = {
    name: data.name,
    age: data.age,
    gender: data.gender,
    role: data.role,
    interests: data.interests,
    marketingAgreement: data.marketingAgreement,
  };

  // request part를 JSON Blob으로 추가
  formData.append(
    "request",
    new Blob([JSON.stringify(requestData)], { type: "application/json" })
  );

  // 프로필 이미지가 있으면 추가
  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  // axios가 자동으로 Content-Type을 multipart/form-data로 설정하고 boundary를 추가합니다
  const response = await tokenInstance.put(
    "/user/my-page/profile/update",
    formData,
    {
      headers: {
        "Content-Type": undefined, // axios가 자동으로 설정하도록 강제
      },
    }
  );
  return response.data;
};

// 고객센터 FAQ 조회 (공개 API)
export const getCustomerCenterInquiry = async () => {
  const response = await instance.get("/user/my-page/qna");
  return response.data.data;
};

// 유저 프로필 관심사
export const getUserInterests = async (roleName: RoleName) => {
  const response = await tokenInstance.get("/user/my-page/profile/interest", {
    params: {
      roleName,
    },
  });
  return response.data.data;
};

// 유저 이메일 및 이름
export const getUserEmailAndName = async (): Promise<UserEmailAndName> => {
  const response = await tokenInstance.get("/user/my-page/home");
  return response.data.data;
};

// 유저 북마크 조회
export const getUserBookmarks = async (
  sort: "deadline" | "latest",
  page: number
): Promise<UserBookmarks> => {
  const response = await tokenInstance.get("/user/my-page/bookmark", {
    params: {
      sort,
      page,
    },
  });
  return response.data.data;
};

// 탈퇴 사유 카테고리 조회
export const getWithdrawalCategories = async (): Promise<
  WithdrawalCategory[]
> => {
  const response = await tokenInstance.get("/user/my-page/with-draw/category");
  return response.data.data;
};

// 회원 탈퇴
export const withdrawUser = async (data: WithdrawRequest) => {
  const response = await tokenInstance.delete("/user/my-page/with-draw", {
    data,
  });
  return response.data;
};
