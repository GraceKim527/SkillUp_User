// src/app/profile/edit/page.tsx

"use client";

import ProfileEditPageLayout from "./ProfileEditPageLayout";
import { useUser } from "@/hooks/queries/useUser";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";

// 프로필 편집 페이지 스켈레톤 UI 컴포넌트
function ProfileEditSkeleton() {
  return (
    <Flex direction="column" gap="2.5rem" className={styles.container}>
      <Flex justify="space-between" style={{ width: "100%" }}>
        {/* 왼쪽: 제목 + 프로필 이미지 */}
        <Flex direction="column" gap="1.25rem" className={styles.header}>
          <Skeleton width="132px" height="36px" borderRadius="100px" />
          <Skeleton width="120px" height="120px" borderRadius="1000px" />
        </Flex>

        {/* 오른쪽: 폼 필드들 */}
        <Flex direction="column" gap="2.5rem" className={styles.itemGroup}>
          {/* 첫 번째 행: 이름 + 연령 */}
          <Flex gap="1.5rem" align="center" style={{ width: "100%" }}>
            <Flex direction="column" gap="0.25rem" style={{ flex: 1 }}>
              <Skeleton width="132px" height="20px" borderRadius="100px" />
              <Skeleton width="100%" height="46px" borderRadius="4px" />
            </Flex>
            <Flex direction="column" gap="0.25rem" style={{ flex: 1 }}>
              <Skeleton width="132px" height="20px" borderRadius="100px" />
              <Skeleton width="100%" height="46px" borderRadius="4px" />
            </Flex>
          </Flex>

          {/* 두 번째 행: 성별 + 직무 */}
          <Flex gap="1.5rem" align="flex-start" style={{ width: "100%" }}>
            <Flex direction="column" gap="0.25rem" style={{ flex: 1 }}>
              <Skeleton width="132px" height="20px" borderRadius="100px" />
              <Flex gap="0.25rem">
                <Skeleton width="120px" height="40px" borderRadius="4px" />
                <Skeleton width="120px" height="40px" borderRadius="4px" />
              </Flex>
            </Flex>
            <Flex direction="column" gap="0.25rem" style={{ flex: 1 }}>
              <Skeleton width="132px" height="20px" borderRadius="100px" />
              <Skeleton width="100%" height="46px" borderRadius="4px" />
            </Flex>
          </Flex>

          {/* 관심사 섹션 */}
          <Flex direction="column" gap="1rem" style={{ width: "100%" }}>
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
              <Flex direction="column" gap="0.125rem">
                <Skeleton width="132px" height="20px" borderRadius="100px" />
                <Skeleton width="132px" height="16px" borderRadius="100px" />
              </Flex>
              <Flex gap="0.25rem">
                <Skeleton width="94px" height="38px" borderRadius="4px" />
                <Skeleton width="94px" height="38px" borderRadius="4px" />
                <Skeleton width="94px" height="38px" borderRadius="4px" />
                <Skeleton width="94px" height="38px" borderRadius="4px" />
              </Flex>
            </Flex>
            {/* 관심 키워드 태그들 */}
            <Flex gap="0.25rem" wrap="wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <Skeleton key={i} width="100px" height="38px" borderRadius="4px" />
              ))}
            </Flex>
          </Flex>

          {/* 마케팅 수신 동의 */}
          <Skeleton width="100%" height="79px" borderRadius="8px" />
        </Flex>
      </Flex>

      {/* 하단 버튼 */}
      <Flex justify="flex-end" gap="0.5rem" style={{ width: "100%" }}>
        <Skeleton width="120px" height="46px" borderRadius="4px" />
        <Skeleton width="120px" height="46px" borderRadius="4px" />
      </Flex>
    </Flex>
  );
}

export default function ProfileEditPage() {
  const { data: userData, isLoading: isLoadingUser } = useUser();

  if (isLoadingUser) {
    return (
      <div style={{ paddingTop: "6.25rem" }}>
        <ProfileEditSkeleton />
      </div>
    );
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div style={{ paddingTop: "6.25rem" }}>
      <ProfileEditPageLayout initialData={userData} />
    </div>
  );
}
