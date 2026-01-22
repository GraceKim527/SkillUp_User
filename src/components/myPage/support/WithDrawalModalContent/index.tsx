// src/components/myPage/support/WithDrawalModalContent/index.tsx

"use client";

import { useState } from "react";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import WithdrawalReasonGroup from "@/components/myPage/support/WithdrawalReasonGroup";
import { useWithdrawalCategories } from "@/hooks/queries/useUser";
import { useWithdraw } from "@/hooks/mutations/useWithdraw";
import { useToast } from "@/hooks/useToast";

interface WithDrawalModalContentProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function WithDrawalModalContent({
  onClose,
  onSuccess,
}: WithDrawalModalContentProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const { showToast } = useToast();

  // 탈퇴 사유 카테고리 조회
  const { data: categories, isLoading: isLoadingCategories } =
    useWithdrawalCategories();

  // 회원 탈퇴 mutation
  const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw();

  // 선택한 사유의 실제 텍스트 가져오기
  const getReasonDetail = () => {
    if (selectedReason === "custom") {
      return customReason;
    }

    const index = parseInt(selectedReason.replace("reason_", ""));
    return categories?.[index]?.description || "";
  };

  const handleWithdrawalClick = () => {
    const detail = getReasonDetail();

    if (!detail) {
      return;
    }

    withdraw(
      { detail },
      {
        onSuccess: () => {
          // 모달 닫기
          onClose?.();

          // 부모에게 성공 알림 (Alert 띄우기 위해)
          onSuccess?.();
        },
        onError: (error) => {
          console.error("탈퇴 실패:", error);
          showToast({
            title: "탈퇴 실패",
            message: "탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
            type: "error",
            duration: 3000,
          });
        },
      }
    );
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
          {isLoadingCategories ? (
            <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
              <Text typography="body2_r_14" color="neutral-40">
                탈퇴 사유를 불러오는 중...
              </Text>
            </Flex>
          ) : (
            <WithdrawalReasonGroup
              reasons={categories || []}
              value={selectedReason}
              onChange={setSelectedReason}
              inputValue={customReason}
              onInputChange={setCustomReason}
            />
          )}
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
          disabled={
            !selectedReason ||
            !isAgreed ||
            isWithdrawing ||
            (selectedReason === "custom" && !customReason.trim())
          }
        >
          {isWithdrawing ? "처리 중..." : "탈퇴하기"}
        </Button>
      </Flex>
    </Flex>
  );
}
