// src/components/events/detail/EventDetailLayout/EventDetailSkeleton.tsx

import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";

interface EventDetailSkeletonProps {
  isCompactLayout: boolean;
}

export default function EventDetailSkeleton({
  isCompactLayout,
}: EventDetailSkeletonProps) {
  return (
    <Flex
      gap={isCompactLayout ? "2.5rem" : "1.5rem"}
      direction={isCompactLayout ? "column" : "row"}
      className={styles.container}
    >
      {/* 왼쪽 콘텐츠 스켈레톤 */}
      <Flex
        direction="column"
        gap={isCompactLayout ? "2rem" : "2.5rem"}
        style={{ flex: 1, minWidth: 0 }}
      >
        {/* 히어로 이미지 */}
        <Skeleton width="100%" height="31.6875rem" borderRadius="0.75rem" />

        {/* 제목 + 탭바 */}
        <Flex direction="column" gap="2.5rem">
          <Skeleton width="60%" height="48px" borderRadius="100px" />
          <div className={styles.skeletonDivider} />
        </Flex>

        {/* 섹션들 */}
        <Flex direction="column" gap="3.75rem">
          {/* 행사 설명 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="120px" height="28px" borderRadius="100px" />
            <Flex direction="column" gap="0.5rem" style={{ width: "100%" }}>
              <Skeleton width="100%" height="18px" borderRadius="100px" />
              <Skeleton width="100%" height="18px" borderRadius="100px" />
              <Skeleton width="75%" height="18px" borderRadius="100px" />
              <Skeleton width="60%" height="18px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 모집 기간 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="100px" height="28px" borderRadius="100px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="160px" height="24px" borderRadius="100px" />
              <Skeleton width="80px" height="24px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 참가비 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="80px" height="28px" borderRadius="100px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="80px" height="24px" borderRadius="100px" />
              <Skeleton width="56px" height="24px" borderRadius="100px" />
            </Flex>
          </div>

          {/* 장소 */}
          <div className={styles.skeletonSection}>
            <Skeleton width="60px" height="28px" borderRadius="100px" />
            <Flex direction="column" gap="0.5rem">
              <Skeleton width="200px" height="20px" borderRadius="100px" />
              <Skeleton width="240px" height="20px" borderRadius="100px" />
            </Flex>
            <Skeleton width="100%" height="22.125rem" borderRadius="0.75rem" />
          </div>
        </Flex>
      </Flex>

      {/* 오른쪽 사이드바 스켈레톤 */}
      <div className={styles.skeletonSidebar}>
        <Flex direction="column" gap="0.5rem">
          <Skeleton width="121px" height="20px" borderRadius="100px" />
          <Skeleton width="194px" height="28px" borderRadius="100px" />
        </Flex>

        <Flex direction="column" gap="1rem" style={{ width: "100%" }}>
          {[1, 2, 3].map((i) => (
            <Flex
              key={i}
              gap="0.375rem"
              align="flex-start"
              style={{ width: "100%" }}
            >
              <Skeleton width="24px" height="24px" borderRadius="100px" />
              <Flex direction="column" gap="0.25rem" style={{ flex: 1 }}>
                <Skeleton width="80px" height="18px" borderRadius="100px" />
                <Skeleton width="130px" height="22px" borderRadius="100px" />
              </Flex>
            </Flex>
          ))}
          <div className={styles.skeletonDivider} />
          <Flex gap="0.25rem" wrap="wrap">
            <Skeleton width="60px" height="24px" borderRadius="100px" />
            <Skeleton width="60px" height="24px" borderRadius="100px" />
          </Flex>
        </Flex>

        <Flex direction="column" gap="0.25rem" style={{ width: "100%" }}>
          <Skeleton width="100%" height="52px" borderRadius="8px" />
          <Skeleton width="100%" height="52px" borderRadius="8px" />
        </Flex>

        <Skeleton width="100%" height="46px" borderRadius="4px" />
      </div>
    </Flex>
  );
}
