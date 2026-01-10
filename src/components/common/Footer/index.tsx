// src/components/common/Footer/index.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";

import SkillUpLogo from "@/assets/svg/skillUp_white.svg";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import MailIcon from "@/assets/icons/MailIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Button from "../Button";
import Text from "../Text";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Flex justify="space-between" align="flex-start" className={styles.inner}>
        {/* 왼쪽 영역 */}
        <Flex direction="column" gap="0.625rem">
          <Flex align="center" gap="1.25rem">
            <div className={styles.logoWrap}>
              <Image
                src={SkillUpLogo}
                alt="Skill Up 로고"
                width={140}
                height={19.76}
              />
            </div>
            <Flex align="center" gap="0.625rem" className={styles.policyGroup}>
              <Link href="/support">자주 묻는 질문</Link>
              <Link href="#">서비스이용약관</Link>
              <Link href="#">개인정보처리방침</Link>
            </Flex>
          </Flex>

          <Flex direction="column" gap="0.25rem" className={styles.bottomRow}>
            <Text typography="label4_m_12" color="neutral-70">
              skillup01.official@gmail.com
            </Text>
            <Text typography="label4_m_12" color="neutral-70">
              ⓒ 2026 Skill UP. All rights reserved.
            </Text>
          </Flex>
        </Flex>

        {/* 오른쪽 영역 */}
        <Flex align="center" gap="1rem">
          <Flex align="center" gap="0.625rem">
            <Link
              href="https://www.instagram.com/skill_up._/"
              target="_blank"
              className={styles.iconBtn}
              aria-label="인스타그램"
            >
              <Flex
                justify="center"
                align="center"
                style={{ width: "100%", height: "100%" }}
              >
                <InstagramIcon color="currentColor" />
              </Flex>
            </Link>
            <Link
              href="mailto:skillup01.official@gmail.com"
              className={styles.iconBtn}
              aria-label="이메일"
            >
              <Flex
                justify="center"
                align="center"
                style={{ width: "100%", height: "100%" }}
              >
                <MailIcon color="currentColor" />
              </Flex>
            </Link>
          </Flex>
          <Button
            variant="secondary"
            size="extraLarge"
            icon={<ChevronRightIcon />}
          >
            <Text typography="sub2_m_18" color="white">
              행사 제보하기
            </Text>
          </Button>
        </Flex>
      </Flex>
    </footer>
  );
}
