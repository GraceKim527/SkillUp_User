// src/components/mainSection/MiddleBanner/index.tsx

"use client";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import Banner from "@/assets/images/middle_banner.jpg";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";

export default function MiddleBanner() {
  return (
    <section className={styles.middleBanner} aria-label="메인 배너">
      <Image src={Banner} alt="비주얼 배너" fill priority />

      <div className={styles.overlay} />
      <Flex
        direction="column"
        justify="center"
        gap="12px"
        className={styles.inner}
      >
        <Text typography="label1_r_18" color="neutral-90">
          FIGMA UTILIZES AI DESIGN TO INCREASE 100% EFFICIENCY
        </Text>

        <Flex direction="column" gap="0.5rem">
          <Text typography="head1_m_42" color="white">
            피그마, AI 디자인 활용해서
          </Text>
          <Text typography="head5_sb_42" color="white">
            100%효율 높이기
          </Text>
        </Flex>
        <Button variant="primary" size="extraLarge" icon={<ChevronRightIcon />}>
          <Text typography="sub2_m_18" color="white">
            자세히 알아보기
          </Text>
        </Button>
      </Flex>
    </section>
  );
}
