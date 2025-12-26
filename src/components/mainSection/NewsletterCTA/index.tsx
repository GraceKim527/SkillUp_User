// src/components/mainSection/NewsletterCTA/index.tsx

"use client";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
export default function NewsletterCTA() {
  return (
    <Flex
      as="section"
      className={styles.ctaSection}
      aria-labelledby="cta-title"
      align="center"
      justify="space-between"
    >
      <Flex direction="column" gap="0.25rem">
        <Text typography="head1_m_42" color="black">
          매주 놓치기 아까운 IT 행사
        </Text>
        <Text typography="head5_sb_42" color="black">
          메일로 받아보세요
        </Text>
      </Flex>
      <Button variant="secondary" size="extraLarge" icon={<ChevronRightIcon />}>
        <Text typography="sub1_m_20" color="white">
          행사 알림 받기
        </Text>
      </Button>
    </Flex>
  );
}
