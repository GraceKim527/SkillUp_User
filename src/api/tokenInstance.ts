// src/api/instance.ts

import axios from "axios";
import { getDefaultStore } from "jotai";
import {
  tokenAtom,
  loginModalAtom,
  showWithdrawPendingAtom,
} from "@/store/authAtoms";

const tokenInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 인증 로직 추가 코드
tokenInstance.interceptors.request.use(
  (config) => {
    const store = getDefaultStore();
    const token = store.get(tokenAtom);

    console.log("[tokenInstance] request:", config.url);
    console.log("[tokenInstance] atom token:", token ? "있음" : "없음");

    // atom에 토큰이 없으면 localStorage에서 직접 읽기 (atom 반영 타이밍 이슈 대비)
    let finalToken = token;
    if (!finalToken && typeof window !== "undefined") {
      try {
        finalToken = JSON.parse(localStorage.getItem("accessToken") || "null");
        console.log("[tokenInstance] localStorage fallback token:", finalToken ? "있음" : "없음");
      } catch {}
    }

    if (finalToken) {
      config.headers.Authorization = `Bearer ${finalToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 401 에러 발생 시 토큰을 제거하고 로그아웃 처리하는 코드
tokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const store = getDefaultStore();
      store.set(tokenAtom, null);

      // 탈퇴 대기 모달이 열려있을 때는 로그인 모달을 띄우지 않음
      const isWithdrawPending = store.get(showWithdrawPendingAtom);
      if (!isWithdrawPending) {
        store.set(loginModalAtom, true);
      }
    }

    return Promise.reject(error);
  }
);

export default tokenInstance;
