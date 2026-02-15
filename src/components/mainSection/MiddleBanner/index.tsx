// src/components/mainSection/MiddleBanner/index.tsx

"use client";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import Banner from "@/assets/images/middle_banner.jpg";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

export default function MiddleBanner() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // 모바일 레이아웃
  const renderMobileContent = () => (
    <Flex
      direction="column"
      justify="center"
      gap="0.25rem"
      className={styles.inner}
    >
      <Text typography="label4_m_12" color="neutral-90">
        FIGMA UTILIZES AI DESIGN TO INCREASE 100% EFFICIENCY
      </Text>
      <Text typography="head4_sb_20" color="white" className={styles.mobileTitle}>
        피그마, AI 디자인 활용해서
        <br />
        100%효율 높이기
      </Text>
    </Flex>
  );

  // 데스크톱/태블릿 레이아웃
  const renderDesktopContent = () => (
    <Flex
      direction="column"
      justify="center"
      gap="12px"
      className={styles.inner}
    >
      <Text typography="label1_r_18" color="neutral-90" className={styles.kicker}>
        FIGMA UTILIZES AI DESIGN TO INCREASE 100% EFFICIENCY
      </Text>

      <Flex direction="column" gap="0.5rem">
        <Text typography="head1_m_42" color="white" className={styles.title}>
          피그마, AI 디자인 활용해서
        </Text>
        <Text typography="head5_sb_42" color="white" className={styles.title}>
          100%효율 높이기
        </Text>
      </Flex>
      <Button
        variant="primary"
        size={isTablet ? "large" : "extraLarge"}
        icon={<ChevronRightIcon width={16} height={16} />}
      >
        <Text typography={isTablet ? "sub3_m_16" : "sub2_m_18"} color="white">
          자세히 알아보기
        </Text>
      </Button>
    </Flex>
  );

  return (
    <section className={styles.middleBanner} aria-label="메인 배너">
      <Image src={Banner} alt="비주얼 배너" fill priority />
      <div className={styles.overlay} />
      {isMobile ? renderMobileContent() : renderDesktopContent()}
    </section>
  );
}
