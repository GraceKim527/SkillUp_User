// src/components/myPage/support/WithdrawalReasonGroup/index.tsx

"use client";
import React, { useRef, useMemo } from "react";
import Radio from "@/components/common/Radio";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import { WithdrawalCategory } from "@/types/user";

interface WithdrawalReasonGroupProps {
  reasons: WithdrawalCategory[];
  value: string;
  onChange: (value: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

export default function WithdrawalReasonGroup({
  reasons,
  value,
  onChange,
  inputValue = "",
  onInputChange,
}: WithdrawalReasonGroupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // API 데이터를 UI에 맞는 형태로 변환 + "직접 입력" 옵션 추가
  const withdrawalReasons = useMemo(() => {
    const apiReasons = reasons.map((reason, index) => ({
      label: reason.description,
      value: `reason_${index}`,
      hasInput: false,
    }));

    // "직접 입력" 옵션을 마지막에 추가
    return [
      ...apiReasons,
      { label: "직접 입력", value: "custom", hasInput: true },
    ];
  }, [reasons]);

  const handleRadioChange = (newValue: string) => {
    onChange(newValue);

    // 직접 입력을 선택하면 input에 포커싱
    if (newValue === "custom" && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Flex direction="column" gap={0.5}>
      {withdrawalReasons.map((reason) => (
        <Flex
          key={reason.value}
          direction={reason.hasInput ? "column" : "row"}
          align={reason.hasInput ? "flex-start" : "center"}
          gap={0.5}
        >
          <Flex align="center" gap={0.5}>
            <Radio
              id={`withdrawal-${reason.value}`}
              name="withdrawal-reason"
              value={reason.value}
              checked={value === reason.value}
              onChange={handleRadioChange}
            />
            <label
              htmlFor={`withdrawal-${reason.value}`}
              className={styles.label}
            >
              <Text typography="body2_r_14" color="neutral-20">
                {reason.label}
              </Text>
            </label>
          </Flex>
          {reason.hasInput && value === reason.value && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange?.(e.target.value)}
              placeholder="탈퇴 사유를 입력해주세요."
              maxLength={30}
              className={styles.input}
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
}
