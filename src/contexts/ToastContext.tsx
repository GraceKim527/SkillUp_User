// src/contexts/ToastContext.tsx

"use client";

import { createContext } from "react";
import { Toast, ToastOptions } from "@/types/toast";

export interface ToastContextValue {
  toasts: Toast[];
  showToast: (options: ToastOptions) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);
