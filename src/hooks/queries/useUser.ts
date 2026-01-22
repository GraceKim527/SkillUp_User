// src/hooks/queries/useUser.ts

import { useQuery } from "@tanstack/react-query";
import {
  getUser,
  getCustomerCenterInquiry,
  getUserInterests,
  getUserEmailAndName,
  getUserBookmarks,
  getWithdrawalCategories,
} from "@/api/user";
import { useAuth } from "../useAuth";
import { useSetAtom } from "jotai";
import {
  userNameAtom,
  userEmailAtom,
  userProfileImageAtom,
} from "@/store/authAtoms";
import { UserBookmarks, WithdrawalCategory } from "@/types/user";
import { RoleName } from "@/constants/role";
import { queryKeys } from "../queryKeys";

// 유저 데이터 조회 Hook
export const useUser = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: async () => {
      const data = await getUser();
      return data;
    },
    // 로그인 상태일 때만 쿼리 실행
    enabled: isAuthenticated,
    retry: false,
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
  const setUserProfileImage = useSetAtom(userProfileImageAtom);

  return useQuery({
    queryKey: queryKeys.user.emailAndName(),
    queryFn: async () => {
      const data = await getUserEmailAndName();
      if (data?.name) {
        setUserName(data.name);
      }
      if (data?.email) {
        setUserEmail(data.email);
      }
      if (data?.profileImageUrl) {
        setUserProfileImage(data.profileImageUrl);
      }
      return data;
    },
    enabled: isAuthenticated,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

// 유저 북마크 조회 Hook
export const useUserBookmarks = (sort: "deadline" | "latest", page: number) => {
  const { isAuthenticated } = useAuth();

  return useQuery<UserBookmarks>({
    queryKey: queryKeys.user.bookmarks(sort, page),
    queryFn: async () => {
      return await getUserBookmarks(sort, page);
    },
    enabled: isAuthenticated,
    retry: false,
  });
};

// 탈퇴 사유 카테고리 조회 Hook
export const useWithdrawalCategories = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<WithdrawalCategory[]>({
    queryKey: ["withdrawalCategories"],
    queryFn: async () => {
      return await getWithdrawalCategories();
    },
    enabled: isAuthenticated,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};
