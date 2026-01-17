// src/api/auth.ts

import instance from "./instance";

export type SocialLoginType = "google" | "kakao" | "naver";

// 소셜 로그인 URL 가져오기
export const getSocialLoginUrl = async (
  socialLoginType: SocialLoginType
): Promise<string> => {
  const response = await instance.get(`/oauth/${socialLoginType}`);

  // 백엔드에서 "SOCIAL_LOGIN_TYPE : URL" 형식으로 반환
  const data = response.data.data || response.data;

  // "SOCIAL_LOGIN_TYPE : URL" 형식에서 URL만 추출
  if (typeof data === "string" && data.includes(":")) {
    const extractedUrl = data.split(":").slice(1).join(":").trim();
    return extractedUrl;
  }

  return data;
};

// 소셜 로그인 콜백 처리 (인가 코드를 백엔드로 전송)
export const sendAuthorizationCode = async (
  socialLoginType: SocialLoginType,
  code: string,
  state?: string
): Promise<string> => {
  const params: Record<string, string> = {
    code,
    socialLoginType,
  };
  if (state) {
    params.state = state;
  }

  const response = await instance.get(`/oauth/${socialLoginType}/callback`, {
    params,
  });

  // 백엔드에서 액세스 토큰 반환
  return response.data.data.accessToken;
};
