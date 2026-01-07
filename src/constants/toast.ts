// src/constants/toast.ts

import { ToastType } from "@/types/toast";
import CautionIcon from "@/assets/icons/CautionIcon";
import CheckIcon from "@/assets/icons/CheckIcon";

export interface ToastConfig {
  icon: React.ComponentType<{ color: string }> | null; // 아이콘 컴포넌트
  iconColor: string; // 아이콘 색상
  textColor: string; // 텍스트 색상
  backgroundColor?: string; // 배경 색상 (선택)
}

export const TOAST_CONFIG: Record<ToastType, ToastConfig> = {
  success: {
    icon: CheckIcon,
    iconColor: "#5A23FF",
    textColor: "#5A23FF",
  },
  error: {
    icon: CautionIcon,
    iconColor: "#FF6359",
    textColor: "#FF6359",
  },
  info: {
    icon: CautionIcon,
    iconColor: "#000000",
    textColor: "#000000",
  },
};
