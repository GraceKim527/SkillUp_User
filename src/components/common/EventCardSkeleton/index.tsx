// src/components/common/EventCardSkeleton/index.tsx

import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";

/**
 * 이벤트 카드 스켈레톤.
 * - `compact`: footer가 좌측 정렬(gap), 내부 gap 28px. EventPageLayout/Bootcamp/RecommendDeadline에서 사용.
 * - `full`: footer가 space-between, 내부 gap 12px. RecommendNow/RecentEvents에서 사용.
 */
export type EventCardSkeletonVariant = "compact" | "full";

interface EventCardSkeletonProps {
  variant?: EventCardSkeletonVariant;
  imageHeight?: string;
  imageBorderRadius?: string;
  className?: string;
}

export default function EventCardSkeleton({
  variant = "compact",
  imageHeight = "212px",
  imageBorderRadius = "8px 8px 0 0",
  className,
}: EventCardSkeletonProps) {
  const isFull = variant === "full";

  return (
    <div className={className}>
      <Skeleton height={imageHeight} width="100%" borderRadius={imageBorderRadius} />
      <Flex
        direction="column"
        gap={isFull ? "12px" : "28px"}
        style={{ padding: "16px", flex: 1 }}
      >
        {isFull ? (
          <>
            <Flex direction="column" gap="4px">
              <Skeleton width="103px" height="24px" borderRadius="100px" />
              <Skeleton width="100%" height="36px" borderRadius="100px" />
            </Flex>
            <Flex direction="column" gap="6px">
              <Skeleton width="224px" height="18px" borderRadius="100px" />
              <Skeleton width="224px" height="18px" borderRadius="100px" />
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              style={{ marginTop: "auto" }}
            >
              <Skeleton width="121px" height="28px" borderRadius="100px" />
              <Skeleton width="102px" height="36px" borderRadius="4px" />
            </Flex>
          </>
        ) : (
          <>
            <Flex direction="column" gap="12px">
              <Flex direction="column" gap="4px">
                <Skeleton width="103px" height="24px" borderRadius="100px" />
                <Skeleton width="100%" height="36px" borderRadius="100px" />
              </Flex>
              <Flex direction="column" gap="6px">
                <Skeleton width="224px" height="18px" borderRadius="100px" />
                <Skeleton width="224px" height="18px" borderRadius="100px" />
              </Flex>
            </Flex>
            <Flex gap="8px" align="center">
              <Skeleton width="121px" height="28px" borderRadius="100px" />
              <Skeleton width="28px" height="28px" borderRadius="100px" />
            </Flex>
          </>
        )}
      </Flex>
    </div>
  );
}
