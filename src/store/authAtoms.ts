// src/store/authAtoms.ts

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Access Token Atom - localStorage에 자동 저장
export const tokenAtom = atomWithStorage<string | null>("accessToken", null);

// 유저 이름 Atom - localStorage에 자동 저장
export const userNameAtom = atomWithStorage<string | null>("userName", null);

// 유저 이메일 Atom - localStorage에 자동 저장
export const userEmailAtom = atomWithStorage<string | null>("userEmail", null);

// 유저 프로필 이미지 Atom - localStorage에 자동 저장
export const userProfileImageAtom = atomWithStorage<string | null>(
  "userProfileImage",
  null
);

// 로그인 상태 확인 Atom (파생 상태)
export const isAuthenticatedAtom = atom((get) => {
  const token = get(tokenAtom);
  return token !== null && token !== "";
});

// 로그인 모달 상태 Atom (401 에러 시 전역에서 모달 열기 위해 사용)
export const loginModalAtom = atom<boolean>(false);
