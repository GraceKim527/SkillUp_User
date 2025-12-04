// src/hooks/useLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestLogin, getUserEmailAndName } from "@/api/user";
import { useAuth } from "./useAuth";

// 테스트 로그인 Mutation Hook 코드
export const useLogin = () => {
  const { login, setUserName, setUserEmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getTestLogin,
    onSuccess: async (token: string) => {
      login(token);

      // 유저 이메일 및 이름 바로 조회하여 전역 상태에 저장
      try {
        const userData = await getUserEmailAndName();
        if (userData?.userName) {
          setUserName(userData.userName);
        }
        if (userData?.userEmail) {
          setUserEmail(userData.userEmail);
        }
        // 쿼리 캐시에도 저장
        queryClient.setQueryData(["userEmailAndName"], userData);
      } catch (error) {
        console.error("Failed to fetch user email and name:", error);
      }

      // 유저 데이터 쿼리 무효화 -> useUser 훅이 자동으로 데이터 재조회
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
