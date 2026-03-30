// src/components/events/EventHeader/index.tsx

import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function EventHeader({
  title,
  count,
  isArticle = false,
}: {
  title: string;
  count: number;
  isArticle?: boolean;
}) {
  const isMobile = useIsMobile();
  return (
    <Flex align="center" gap={1} style={{ flexWrap: "wrap" }}>
      <Text typography="head2_sb_30" color="black" as="h2">
        {title}
      </Text>
      {!isMobile && (
        <span style={{ whiteSpace: "nowrap" }}>
          <Text typography="body1_r_16" color="neutral-50">
            <Text typography="body1_r_16" color="primary-strong">
              {count}개
            </Text>
            {isArticle ? "의 아티클이 있습니다." : "의 행사가 있습니다."}
          </Text>
        </span>
      )}
    </Flex>
  );
}
