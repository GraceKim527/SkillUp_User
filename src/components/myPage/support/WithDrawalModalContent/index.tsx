// src/components/myPage/support/WithDrawalModalContent/index.tsx

"use client";

import { useState } from "react";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import WithdrawalReasonGroup from "@/components/myPage/support/WithdrawalReasonGroup";

interface WithDrawalModalContentProps {
  onClose?: () => void;
  onWithdrawal?: (data: {
    reason: string;
    customReason: string;
    isAgreed: boolean;
  }) => void;
}

export default function WithDrawalModalContent({
  onClose,
  onWithdrawal,
}: WithDrawalModalContentProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleWithdrawalClick = () => {
    // 부모 컴포넌트에게 탈퇴 요청 전달
    onWithdrawal?.({
      reason: selectedReason,
      customReason: selectedReason === "custom" ? customReason : "",
      isAgreed,
    });
  };

  return (
    <Flex direction="column" gap={1} className={styles.container} as="div">
      <Flex direction="column" gap={0.5}>
        <Text typography="head3_m_24" color="black" as="h3">
          회원 탈퇴를 신청하시겠습니까?
        </Text>
        <Text typography="body2_r_14" color="neutral-30">
          탈퇴 신청 시 계정은 14일간 &apos;탈퇴 대기&apos; 상태로 전환됩니다.
          유예 기간 동안 로그인하면 언제든 복구할 수 있습니다. 14일 이후에는
          모든 데이터가 영구 삭제되어 복구가 불가능합니다.
        </Text>
      </Flex>
      <Flex direction="column" gap={0.5}>
        <Flex direction="column" gap={1} className={styles.reasonSection}>
          <Text typography="sub2_m_18" color="black">
            탈퇴 사유를 선택해주세요
          </Text>
          <WithdrawalReasonGroup
            value={selectedReason}
            onChange={setSelectedReason}
            inputValue={customReason}
            onInputChange={setCustomReason}
          />
        </Flex>
        <Flex align="center" gap={0.5} className={styles.agreementSection}>
          <Checkbox
            size="small"
            checked={isAgreed}
            onChange={setIsAgreed}
            id="withdrawal-agreement"
          />
          <label
            htmlFor="withdrawal-agreement"
            className={styles.agreementLabel}
          >
            <Text typography="body2_r_14" color="black">
              위 내용을 모두 확인했으며 탈퇴하겠습니다.
              <Text typography="body1_r_16" color="error-normal" as="span">
                *
              </Text>
            </Text>
          </label>
        </Flex>
      </Flex>

      <Flex justify="flex-end" gap={0.5}>
        <Button
          variant="outlined"
          size="extraLarge"
          className={styles.button}
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="extraLarge"
          className={styles.button}
          onClick={handleWithdrawalClick}
          disabled={!selectedReason || !isAgreed}
        >
          탈퇴하기
        </Button>
      </Flex>
    </Flex>
  );
}
