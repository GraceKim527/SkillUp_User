// src/components/myPage/support/WithdrawalReasonGroup/index.tsx

"use client";
import React, { useRef } from "react";
import Radio from "@/components/common/Radio";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";

interface WithdrawalReasonGroupProps {
  value: string;
  onChange: (value: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

const WITHDRAWAL_REASONS = [
  { label: "원하는 IT 행사 정보가 부족했어요", value: "lack_of_events" },
  { label: "서비스 사용이 불편했어요", value: "inconvenient" },
  { label: "최근에는 서비스를 거의 사용하지 않았어요", value: "not_using" },
  { label: "콘텐츠가 기대와 달랐어요", value: "content_mismatch" },
  { label: "다른 계정으로 다시 가입할 예정이에요", value: "rejoin" },
  { label: "직접 입력", value: "custom", hasInput: true },
];

export default function WithdrawalReasonGroup({
  value,
  onChange,
  inputValue = "",
  onInputChange,
}: WithdrawalReasonGroupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      {WITHDRAWAL_REASONS.map((reason) => (
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
