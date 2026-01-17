// src/components/oauth/OAuthCallback.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocialLoginCallback } from "@/hooks/useSocialLogin";
import { SocialLoginType } from "@/api/auth";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";

interface OAuthCallbackProps {
  provider: SocialLoginType;
}

export default function OAuthCallback({ provider }: OAuthCallbackProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: handleCallback, isPending } = useSocialLoginCallback();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const errorParam = searchParams.get("error");

    // 에러가 있는 경우
    if (errorParam) {
      setError("소셜 로그인 중 오류가 발생했습니다.");
      setTimeout(() => {
        router.push("/");
      }, 2000);
      return;
    }

    // 인가 코드가 없는 경우
    if (!code) {
      setError("인가 코드를 받지 못했습니다.");
      setTimeout(() => {
        router.push("/");
      }, 2000);
      return;
    }

    // 인가 코드를 백엔드로 전송
    handleCallback(
      {
        socialType: provider,
        code,
        state: state || undefined,
      },
      {
        onSuccess: () => {
          // 상태가 완전히 반영될 수 있도록 짧은 딜레이 후 리다이렉트
          setTimeout(() => {
            router.push("/");
          }, 100);
        },
        onError: () => {
          setError("로그인 처리 중 오류가 발생했습니다.");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        },
      }
    );
  }, [searchParams, handleCallback, router, provider]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ minHeight: "100vh", gap: "1rem" }}
    >
      {error ? (
        <>
          <Text typography="head2_sb_30" color="black">
            {error}
          </Text>
          <Text typography="body1_r_16" color="neutral-40">
            잠시 후 메인 페이지로 이동합니다...
          </Text>
        </>
      ) : (
        <>
          <Text typography="head2_sb_30" color="black">
            {isPending ? "로그인 중..." : "로그인 처리 중..."}
          </Text>
          <Text typography="body1_r_16" color="neutral-40">
            잠시만 기다려주세요
          </Text>
        </>
      )}
    </Flex>
  );
}
