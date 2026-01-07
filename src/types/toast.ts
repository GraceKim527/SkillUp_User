// src/types/toast.ts

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  duration?: number; // ms, undefined면 자동으로 사라지지 않음
  showCloseButton?: boolean;
  isClosing?: boolean; // 사라지는 애니메이션 중인지
}

export interface ToastOptions {
  title: string;
  message: string;
  type?: ToastType;
  duration?: number;
  showCloseButton?: boolean;
}
