"use client";
// src/components/common/Alert/index.tsx

import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface AlertProps {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
  noCancelButton?: boolean;
  icon?: React.ReactNode;
}

export default function Alert({
  isOpen,
  toggle,
  title,
  message,
  onConfirm,
  icon,
  noCancelButton = false,
}: AlertProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.alertBackdrop} onClick={toggle}>
      <div
        className={styles.alert}
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.alertContent}>
          <div className={styles.alertIcon}>
            {icon}
            {/* {icon === "caution" && <CautionIcon color="var(--Primary-strong)" />} */}
          </div>
          <div className={styles.alertMessage}>
            <Text typography="head4_sb_20" color="black">
              {title}
            </Text>
            <Text
              typography="body1_r_16"
              color="neutral-20"
              className={styles.alertMessageText}
            >
              {message}
            </Text>
          </div>
        </div>
        <div className={styles.alertFooter}>
          {!noCancelButton && (
            <Button variant="outlined" size="large" onClick={toggle}>
              취소
            </Button>
          )}
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              onConfirm();
              toggle();
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
