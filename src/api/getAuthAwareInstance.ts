// src/api/getAuthAwareInstance.ts

import { getDefaultStore } from "jotai";
import { tokenAtom } from "@/store/authAtoms";
import instance from "./instance";
import tokenInstance from "./tokenInstance";

/**
 * 로그인 상태에 따라 적절한 axios 인스턴스를 반환한다.
 * - 토큰 O → tokenInstance (Authorization 헤더 포함)
 * - 토큰 X → instance (공개 API용)
 *
 * 비로그인에서도 호출 가능하지만 로그인 시 개인화 데이터가 포함되는
 * API(홈/이벤트 조회 등)에서 사용한다.
 */
export const getAuthAwareInstance = () => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  return token ? tokenInstance : instance;
};
