// src/app/support/page.tsx

"use client";

import SupportPageLayout from "./SupportPageLayout";
import { useCustomerCenterInquiry } from "@/hooks/useUser";
import Skeleton from "@/components/common/Skeleton";
import Flex from "@/components/common/Flex";

export default function SupportPage() {
  const { data: faqData, isLoading, error } = useCustomerCenterInquiry();

  // TODO : 추후 스켈레톤 대체 필요
  if (isLoading) {
    return (
      <div style={{ paddingTop: "6rem" }}>
        <Flex
          direction="column"
          gap={2}
          style={{ maxWidth: "1240px", margin: "0 auto" }}
        >
          <Skeleton width="10rem" height="2.5rem" />
          <Skeleton width="100%" height="5rem" />
          <Skeleton width="100%" height="5rem" />
          <Skeleton width="100%" height="5rem" />
        </Flex>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: "6rem" }}>
        <p>FAQ 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "6rem" }}>
      <SupportPageLayout faqData={faqData || []} />
    </div>
  );
}
