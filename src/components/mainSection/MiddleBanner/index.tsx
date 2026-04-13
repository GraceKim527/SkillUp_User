// src/components/mainSection/MiddleBanner/index.tsx

"use client";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import Banner from "@/assets/images/middle_banner.png";
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
      gap="1.25rem"
      className={styles.inner}
    >
      <Flex direction="column" gap="0.5rem">
        <Text typography="head3_m_24" color="white">
          IT 행사를 제보하여 <br />
          스킬업과 함께 성장하세요!
        </Text>
        <Text typography="body2_r_14" color="white">
          제보해주신 행사는 검토 후 스킬업에 업로드됩니다
        </Text>
      </Flex>
      <Button
        variant="secondary"
        size="medium"
        icon={<ChevronRightIcon width={16} height={16} />}
        onClick={() => {
          window.open("https://forms.gle/XuLEETJJjKVGku9A6", "_blank");
        }}
      >
        <Text typography="label3_m_14" color="white">
          행사 제보하기
        </Text>
      </Button>
    </Flex>
  );

  // 데스크톱/태블릿 레이아웃
  const renderDesktopContent = () => (
    <Flex
      direction="column"
      justify="center"
      gap="2.5rem"
      className={styles.inner}
    >
      <Flex direction="column" gap="0.75rem">
        <Text typography="head2_m_42" color="white">
          IT 행사를 제보하여 <br />
          스킬업과 함께 성장하세요!
        </Text>
        <Text typography="label1_r_18" color="white">
          제보해주신 행사는 검토 후 스킬업에 업로드됩니다
        </Text>
      </Flex>
      <Button
        variant="secondary"
        size={isTablet ? "large" : "extraLarge"}
        icon={<ChevronRightIcon width={16} height={16} />}
        onClick={() => {
          window.open("https://forms.gle/XuLEETJJjKVGku9A6", "_blank");
        }}
      >
        <Text typography={isTablet ? "sub3_m_16" : "sub2_m_18"} color="white">
          행사 제보하기
        </Text>
      </Button>
    </Flex>
  );

  return (
    <section className={styles.middleBanner} aria-label="메인 배너">
      <Image src={Banner} alt="비주얼 배너" fill priority style={{ objectFit: "cover" }} />
      <div className={styles.overlay} />
      <div className={styles.purpleOverlay} />
      {isMobile ? renderMobileContent() : renderDesktopContent()}
    </section>
  );
}
