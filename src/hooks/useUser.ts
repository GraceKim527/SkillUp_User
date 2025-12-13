// src/hooks/useUser.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUser,
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
import { UserProfile, UserBookmarks } from "@/types/user";
import { RoleName } from "@/constants/role";

// 유저 데이터 조회 Hook
export const useUser = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUser();
      return data;
    },
    // 로그인 상태일 때만 쿼리 실행
    enabled: isAuthenticated,
    retry: false,
  });
};

// 유저 프로필 업데이트 Hook
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserProfile) => {
      return await updateUserProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userEmailAndName"] });
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

// 고객센터 FAQ 조회 Hook (공개 API)
export const useCustomerCenterInquiry = () => {
  return useQuery({
    queryKey: ["customerCenterInquiry"],
    queryFn: async () => {
      return await getCustomerCenterInquiry();
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
};

// 유저 프로필 관심사 조회 Hook
export const useUserInterests = (roleName: RoleName) => {
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
export const useUserBookmarks = (sort: "deadline" | "latest", page: number) => {
  const { isAuthenticated } = useAuth();

  return useQuery<UserBookmarks>({
    queryKey: ["userBookmarks", sort, page],
    queryFn: async () => {
      return await getUserBookmarks(sort, page);
    },
    enabled: isAuthenticated,
    retry: false,
  });
};
