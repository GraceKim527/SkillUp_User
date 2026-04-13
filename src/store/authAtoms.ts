// src/store/authAtoms.ts

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { WithdrawPendingUserInfo } from "@/types/user";

// SSR 환경에서 안전한 localStorage wrapper
const createSafeStorage = <T,>() => ({
  getItem: (key: string, initialValue: T): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  },
  setItem: (key: string, value: T): void => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // silently ignore localStorage write failures
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.removeItem(key);
    } catch {
      // silently ignore localStorage removal failures
    }
  },
});

// Access Token Atom - localStorage에 자동 저장 (SSR 안전)
export const tokenAtom = atomWithStorage<string | null>(
  "accessToken",
  null,
  createSafeStorage<string | null>(),
  { getOnInit: true }
);

// 유저 이름 Atom - localStorage에 자동 저장 (SSR 안전)
export const userNameAtom = atomWithStorage<string | null>(
  "userName",
  null,
  createSafeStorage<string | null>(),
  { getOnInit: false }
);

// 유저 이메일 Atom - localStorage에 자동 저장 (SSR 안전)
export const userEmailAtom = atomWithStorage<string | null>(
  "userEmail",
  null,
  createSafeStorage<string | null>(),
  { getOnInit: false }
);

// 유저 프로필 이미지 Atom - localStorage에 자동 저장 (SSR 안전)
export const userProfileImageAtom = atomWithStorage<string | null>(
  "userProfileImage",
  null,
  createSafeStorage<string | null>(),
  { getOnInit: false }
);

// 로그인 상태 확인 Atom (파생 상태)
export const isAuthenticatedAtom = atom((get) => {
  const token = get(tokenAtom);
  return token !== null && token !== "";
});

// 로그인 모달 상태 Atom (401 에러 시 전역에서 모달 열기 위해 사용)
export const loginModalAtom = atom<boolean>(false);

// 신규 유저 온보딩 모달 상태 Atom (OAuth 콜백 후 홈에서 모달 표시용)
export const showOnboardingAtom = atom<boolean>(false);

// 탈퇴 대기 유저 모달 상태 Atom (OAuth 콜백 후 홈에서 모달 표시용)
export const showWithdrawPendingAtom = atomWithStorage<boolean>(
  "showWithdrawPending",
  false,
  createSafeStorage<boolean>(),
  { getOnInit: true }
);

// 탈퇴 대기 유저 정보 Atom (재가입 API 호출에 필요한 socialLoginType + socialId)
export const withdrawPendingUserInfoAtom = atomWithStorage<WithdrawPendingUserInfo | null>(
  "withdrawPendingUserInfo",
  null,
  createSafeStorage<WithdrawPendingUserInfo | null>(),
  { getOnInit: true }
);
