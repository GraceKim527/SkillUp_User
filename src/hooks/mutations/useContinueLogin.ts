// src/hooks/mutations/useContinueLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { continueLogin } from "@/api/auth";
import { useAuth } from "../useAuth";
import { queryKeys } from "../queryKeys";
import { WithdrawPendingUserInfo } from "@/types/user";
import tokenInstance from "@/api/tokenInstance";

export const useContinueLogin = () => {
  const { login, setUserName, setUserEmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (info: WithdrawPendingUserInfo) => {
      const { accessToken } = await continueLogin(info);

      // 토큰 저장
      login(accessToken);

      // 유저 정보 가져오기 (토큰을 직접 헤더에 넣어 atom 반영 타이밍 이슈 방지)
      try {
        const response = await tokenInstance.get("/user/my-page/home", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userData = response.data.data;
        if (userData?.name) setUserName(userData.name);
        if (userData?.email) setUserEmail(userData.email);
        queryClient.setQueryData(queryKeys.user.emailAndName(), userData);
      } catch (error) {
        console.error("Failed to fetch user info after continue-login:", error);
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });

      return { accessToken };
    },
  });
};
