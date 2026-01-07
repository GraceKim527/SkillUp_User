// src/providers/ToastProvider.tsx

"use client";

import { ReactNode, useState, useCallback, useEffect, useRef } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { Toast, ToastOptions } from "@/types/toast";
import ToastComponent from "@/components/common/Toast";

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // 토스트 추가
  const showToast = useCallback((options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      id,
      title: options.title,
      message: options.message,
      type: options.type || "info",
      duration: options.duration ?? 3000, // 기본 3초
      showCloseButton: options.showCloseButton ?? true,
      isClosing: false,
    };

    setToasts((prev) => [...prev, newToast]);

    // duration이 설정되어 있으면 자동으로 제거
    if (newToast.duration && newToast.duration > 0) {
      const timer = setTimeout(() => {
        hideToast(id);
      }, newToast.duration);
      timersRef.current.set(id, timer);
    }
  }, []);

  // 토스트 제거
  const hideToast = useCallback((id: string) => {
    // 먼저 isClosing을 true로 설정하여 애니메이션 시작
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isClosing: true } : toast
      )
    );

    // 애니메이션이 끝난 후(300ms) 실제로 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));

      // 타이머가 있으면 제거
      const timer = timersRef.current.get(id);
      if (timer) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    }, 300); // 애니메이션 시간과 일치
  }, []);

  // 모든 토스트 제거
  const clearAllToasts = useCallback(() => {
    setToasts([]);

    // 모든 타이머 제거
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  // 컴포넌트 언마운트 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const value = {
    toasts,
    showToast,
    hideToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* 토스트 렌더링 영역 */}
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} />
      ))}
    </ToastContext.Provider>
  );
}
