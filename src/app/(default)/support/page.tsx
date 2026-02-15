// src/app/support/page.tsx

"use client";

import SupportPageLayout from "./SupportPageLayout";
import { useCustomerCenterInquiry } from "@/hooks/queries/useUser";
import Skeleton from "@/components/common/Skeleton";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";

// 고객센터 페이지 스켈레톤 UI 컴포넌트
function SupportPageSkeleton() {
  return (
    <Flex direction="column" gap="6.25rem" className={styles.content}>
      {/* FAQ 섹션 */}
      <Flex direction="column" gap="2.5rem" style={{ width: "100%" }}>
        {/* 제목 */}
        <Skeleton width="100px" height="36px" borderRadius="100px" />

        {/* FAQ 리스트 */}
        <Flex direction="column" style={{ width: "100%" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Flex
              key={i}
              gap="1.25rem"
              align="center"
              style={{
                width: "100%",
                padding: "1.25rem 1.875rem 1.25rem 1.5rem",
                borderBottom:
                  i < 6 ? "1px solid var(--Line-normal, #d8d8d8)" : "none",
              }}
            >
              <Flex
                gap="1rem"
                align="center"
                style={{ flex: 1 }}
              >
                <Skeleton width="32px" height="32px" borderRadius="100px" />
                <Skeleton width="480px" height="32px" borderRadius="100px" />
              </Flex>
              <Skeleton width="32px" height="32px" borderRadius="100px" />
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* 페이지네이션 */}
      <Flex justify="center" align="center" gap="3.75rem">
        <Skeleton width="40px" height="40px" borderRadius="100px" />
        <Skeleton width="40px" height="40px" borderRadius="4px" />
        <Skeleton width="40px" height="40px" borderRadius="100px" />
      </Flex>
    </Flex>
  );
}

export default function SupportPage() {
  const { data: faqData, isLoading, error } = useCustomerCenterInquiry();

  if (isLoading) {
    return (
      <div style={{ paddingTop: "6.25rem", paddingBottom: "10rem" }}>
        <SupportPageSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: "6.25rem", paddingBottom: "10rem" }}>
        <p>FAQ 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "6.25rem", paddingBottom: "10rem" }}>
      <SupportPageLayout faqData={faqData || []} />
    </div>
  );
}
