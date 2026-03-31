// src/hooks/mutations/useSocialLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSocialLoginUrl,
  sendAuthorizationCode,
  SocialLoginType,
} from "@/api/auth";
import { useAuth } from "../useAuth";
import { queryKeys } from "../queryKeys";
import { OAuthCallbackResponse } from "@/types/user";
import tokenInstance from "@/api/tokenInstance";

// 소셜 로그인 URL 가져오기 및 리다이렉트
export const useSocialLogin = () => {
  return useMutation({
    mutationFn: async (socialType: SocialLoginType) => {
      const url = await getSocialLoginUrl(socialType);
      return { url, socialType };
    },
    onSuccess: ({ url }) => {
      // 소셜 로그인 페이지로 리다이렉트
      window.location.href = url;
    },
    onError: (error) => {
      console.error("Failed to get social login URL:", error);
    },
  });
};

// 소셜 로그인 콜백 처리 (인가 코드 전송 후 로그인)
export const useSocialLoginCallback = () => {
  const { login, setUserName, setUserEmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      socialType,
      code,
      state,
    }: {
      socialType: SocialLoginType;
      code: string;
      state?: string;
    }): Promise<OAuthCallbackResponse> => {
      // 토큰 및 로그인 상태 받기
      const {
        accessToken,
        userLoginStatus,
        otherOauthUserInfo,
        withdrawPendingUserInfo,
      } = await sendAuthorizationCode(socialType, code, state);

      // 디버깅용 로그
      console.log("[OAuthCallback] userLoginStatus:", userLoginStatus);
      console.log("[OAuthCallback] accessToken:", accessToken);
      console.log("[OAuthCallback] full response:", { accessToken, userLoginStatus, otherOauthUserInfo, withdrawPendingUserInfo });

      // EXISTING_USER, NEW_USER만 토큰 저장 (WITHDRAW_PENDING_USER, OTHER_OAUTH_USER는 토큰 없음)
      if (accessToken) {
        login(accessToken);
      }

      // NEW_USER는 백엔드가 401을 반환하므로 유저 정보 조회 및 캐시 무효화를 건너뜀
      if (userLoginStatus !== "NEW_USER" && accessToken) {
        // 유저 정보 가져오기 (토큰을 직접 헤더에 넣어 atom 반영 타이밍 이슈 방지)
        try {
          const response = await tokenInstance.get("/user/my-page/home", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const userData = response.data.data;
          if (userData?.name) {
            setUserName(userData.name);
          }
          if (userData?.email) {
            setUserEmail(userData.email);
          }
          // 쿼리 캐시에도 저장
          queryClient.setQueryData(queryKeys.user.emailAndName(), userData);
        } catch (error) {
          console.error("Failed to fetch user email and name:", error);
        }

        // 유저 데이터 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
      }

      // 모든 작업 완료 후 반환
      return {
        accessToken,
        userLoginStatus,
        otherOauthUserInfo,
        withdrawPendingUserInfo,
      };
    },
  });
};
