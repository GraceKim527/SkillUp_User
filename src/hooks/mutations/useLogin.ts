// src/hooks/mutations/useLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestLogin, getUserEmailAndName } from "@/api/user";
import { useAuth } from "../useAuth";
import { queryKeys } from "../queryKeys";

// 테스트 로그인 Mutation Hook 코드
export const useLogin = () => {
  const { login, setUserName, setUserEmail, setUserProfileImage } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getTestLogin,
    onSuccess: async (token: string) => {
      login(token);

      // 유저 이메일 및 이름 바로 조회하여 전역 상태에 저장
      try {
        const userData = await getUserEmailAndName();
        if (userData?.name) {
          setUserName(userData.name);
        }
        if (userData?.email) {
          setUserEmail(userData.email);
        }

        if (userData?.profileImageUrl) {
          setUserProfileImage(userData.profileImageUrl);
        }
        // 쿼리 캐시에도 저장
        queryClient.setQueryData(queryKeys.user.emailAndName(), userData);
      } catch (error) {
        console.error("Failed to fetch user email and name:", error);
      }

      // 유저 데이터 쿼리 무효화 -> useUser 훅이 자동으로 데이터 재조회
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
    },
  });
};
