// src/app/support/SupportPageLayout.tsx

"use client";
import { useState, useMemo } from "react";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Accordion from "@/components/common/Accordion";
import Flex from "@/components/common/Flex";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/common/Button";
import Alert from "@/components/common/Alert";
import CheckIcon from "@/assets/icons/CheckIcon";
import { DropdownOption } from "@/components/common/Dropdown";
import { CustomerCenterInquiry } from "@/types/user";
import Modal from "@/components/common/Modal";
import WithDrawalModalContent from "@/components/myPage/support/WithDrawalModalContent";

// 한 페이지에 몇 개씩 보여줄지
const ITEMS_PER_PAGE = 10;

interface SupportPageLayoutProps {
  faqData?: CustomerCenterInquiry[];
}

export default function SupportPageLayout({ faqData }: SupportPageLayoutProps) {
  const faqs = faqData && faqData.length > 0 ? faqData : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageOption, setSelectedPageOption] = useState<DropdownOption>({
    label: "1",
    value: "1",
  });
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState<{
    reason: string;
    customReason: string;
    isAgreed: boolean;
  } | null>(null);

  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFAQs = faqs.slice(startIndex, endIndex);

  // 페이지 옵션 생성
  const pageOptions = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedPageOption({ label: `${page}`, value: `${page}` });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropdownSelect = (option: DropdownOption) => {
    setSelectedPageOption(option);
    const page = parseInt(option.value);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWithdrawalClick = () => {
    setIsWithdrawalModalOpen(true);
  };

  const handleWithdrawal = (data: {
    reason: string;
    customReason: string;
    isAgreed: boolean;
  }) => {
    setWithdrawalData(data);
    setIsWithdrawalModalOpen(false);
    setIsAlertOpen(true);
  };

  const handleConfirmWithdrawal = () => {
    // TODO: 탈퇴 API 호출
    console.log("탈퇴 데이터:", withdrawalData);
    setIsAlertOpen(false);
  };

  return (
    <>
      <Flex direction="column" gap={4} className={styles.content}>
        <Text typography="head2_sb_30" color="black" as="h1">
          고객센터
        </Text>

        <div className={styles.faqSection}>
          <Accordion
            items={currentFAQs.map((faq, index) => ({
              id: faq.question,
              question: faq.question,
              answerTitle: faq.answerTitle,
              answerContent: faq.answerContent,
              extraButton:
                index === 0 ? (
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={handleWithdrawalClick}
                  >
                    탈퇴하기
                  </Button>
                ) : undefined,
            }))}
            defaultOpenId={currentFAQs[0]?.question}
          />
        </div>

        <Flex justify="center" style={{ marginTop: "2rem" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            options={pageOptions}
            selected={selectedPageOption}
            onSelect={handleDropdownSelect}
            goToPage={false}
          />
        </Flex>
      </Flex>
      {isWithdrawalModalOpen && (
        <Modal
          isOpen={isWithdrawalModalOpen}
          toggle={() => setIsWithdrawalModalOpen(false)}
        >
          <WithDrawalModalContent
            onClose={() => setIsWithdrawalModalOpen(false)}
            onWithdrawal={handleWithdrawal}
          />
        </Modal>
      )}
      <Alert
        isOpen={isAlertOpen}
        toggle={() => setIsAlertOpen(false)}
        title="탈퇴가 완료되었습니다"
        message={
          <>
            탈퇴 신청이 완료되었습니다. 계정은 14일간 &apos;탈퇴 대기&apos;
            상태로 유지됩니다. 로그인하면 언제든 복구할 수 있으며, 14일
            이후에는 모든 정보가 완전히 삭제됩니다.
          </>
        }
        onConfirm={handleConfirmWithdrawal}
        icon={<CheckIcon />}
        noCancelButton
      />
    </>
  );
}
