// src/hooks/useUser.ts

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserData,
  updateUserProfile,
  getTestLogin,
  getCustomerCenterInquiry,
  getUserInterests,
  getUserEmailAndName,
  getUserBookmarks,
} from "@/api/user";
import { useAuth } from "./useAuth";
import { useSetAtom } from "jotai";
import { userNameAtom, userEmailAtom } from "@/store/authAtoms";
import { UserProfile } from "@/types/user";
import { EventCategory } from "@/constants/event";

// 유저 데이터 조회 Hook
export const useUser = () => {
  const { isAuthenticated } = useAuth();
  const setUserName = useSetAtom(userNameAtom);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUserData();
      // API 응답에서 userName 저장
      if (data?.userName) {
        setUserName(data.userName);
      }
      return data;
    },
    // 로그인 상태일 때만 쿼리 실행
    enabled: isAuthenticated,
    retry: false,
  });
};

// 유저 프로필 업데이트 Hook
export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: async (data: UserProfile) => {
      return await updateUserProfile(data);
    },
  });
};

// 테스트 로그인 Hook
export const useTestLogin = () => {
  return useMutation({
    mutationFn: async () => {
      return await getTestLogin();
    },
  });
};

// 고객센터 문의 조회 Hook
export const useCustomerCenterInquiry = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["customerCenterInquiry"],
    queryFn: async () => {
      return await getCustomerCenterInquiry();
    },
    enabled: isAuthenticated,
    retry: false,
  });
};

// 유저 프로필 관심사 조회 Hook
export const useUserInterests = (roleName: "기획자" | "디자이너" | "개발자" | "마케팅") => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["userInterests", roleName],
    queryFn: async () => {
      return await getUserInterests(roleName);
    },
    enabled: isAuthenticated,
    retry: false,
  });
};

// 유저 이메일 및 이름 조회 Hook
export const useUserEmailAndName = () => {
  const { isAuthenticated } = useAuth();
  const setUserName = useSetAtom(userNameAtom);
  const setUserEmail = useSetAtom(userEmailAtom);

  return useQuery({
    queryKey: ["userEmailAndName"],
    queryFn: async () => {
      const data = await getUserEmailAndName();
      if (data?.name) {
        setUserName(data.name);
      }
      if (data?.email) {
        setUserEmail(data.email);
      }
      return data;
    },
    enabled: isAuthenticated,
    retry: false,
  });
};

// 유저 북마크 조회 Hook
export const useUserBookmarks = (
  category: EventCategory,
  sort: "deadline" | "latest",
  page: number
) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["userBookmarks", category, sort, page],
    queryFn: async () => {
      return await getUserBookmarks(category, sort, page);
    },
    enabled: isAuthenticated,
    retry: false,
  });
};
