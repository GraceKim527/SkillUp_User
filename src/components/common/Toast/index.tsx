// src/components/common/Toast/index.tsx

"use client";

import { Toast } from "@/types/toast";
import { TOAST_CONFIG } from "@/constants/toast";
import styles from "./styles.module.css";
import Flex from "../Flex";
import Text from "../Text";

interface ToastComponentProps {
  toast: Toast;
}

export default function ToastComponent({ toast }: ToastComponentProps) {
  const config = TOAST_CONFIG[toast.type];
  const Icon = config.icon;

  return (
    <div
      className={`${styles.toast} ${toast.isClosing ? styles.slideOut : ""}`}
    >
      {/* 아이콘 영역 */}
      {Icon && (
        <div className={styles.iconWrapper}>
          <Icon color={config.iconColor} />
        </div>
      )}
      <Flex direction="column" gap={0.25}>
        <p className={styles.message} style={{ color: config.textColor }}>
          {toast.title}
        </p>
        <Text typography="body1_r_16" color="black">
          {toast.message}
        </Text>
      </Flex>
    </div>
  );
}
