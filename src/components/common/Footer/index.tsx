// src/components/common/Footer/index.tsx

"use client";

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
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function Footer() {
  const isMobile = useIsMobile();

  // 모바일 푸터
  if (isMobile) {
    return (
      <footer className={styles.footerMobile}>
        <div className={styles.innerMobile}>
          {/* 상단: 로고 + 정보 + 링크 */}
          <Flex direction="column" gap="1.25rem">
            <Flex direction="column" gap="0.75rem">
              <div className={styles.logoWrap}>
                <Image
                  src={SkillUpLogo}
                  alt="Skill Up 로고"
                  width={128}
                  height={18}
                />
              </div>
              <Flex direction="column" gap="0">
                <Text typography="label4_m_12" color="neutral-70">
                  skillup01.official@gmail.com
                </Text>
                <Text typography="label4_m_12" color="neutral-70">
                  ⓒ 2025 Skill UP. All rights reserved.
                </Text>
              </Flex>
            </Flex>

            {/* 링크들 */}
            <Flex align="center" className={styles.policyGroupMobile}>
              <Link href="/support">자주 묻는 질문</Link>
              <Link href="/terms">서비스이용약관</Link>
              <Link href="/terms?tab=privacy">개인정보처리방침</Link>
            </Flex>
          </Flex>

          {/* 하단: 소셜 아이콘 + 버튼 */}
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="0.75rem">
              <Link
                href="https://www.instagram.com/skill_up._/"
                target="_blank"
                className={styles.iconBtnMobileFilled}
                aria-label="인스타그램"
              >
                <span className={styles.iconSmall}>
                  <InstagramIcon color="#1b1d26" />
                </span>
              </Link>
              <Link
                href="mailto:skillup01.official@gmail.com"
                className={styles.iconBtnMobile}
                aria-label="이메일"
              >
                <span className={styles.iconSmall}>
                  <MailIcon color="#d8d8d8" />
                </span>
              </Link>
              <Link
                href="https://forms.gle/XuLEETJJjKVGku9A6"
                target="_blank"
                className={styles.iconBtnMobile}
                aria-label="행사 제보"
              >
                <ChevronRightIcon color="#d8d8d8" width={18} height={18} />
              </Link>
            </Flex>

            <Link
              href="https://forms.gle/XuLEETJJjKVGku9A6"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.detailBtnMobile}
            >
              <Text typography="label2_m_16" color="white">
                자세히 보기
              </Text>
              <ChevronRightIcon color="#fff" width={16} height={16} />
            </Link>
          </Flex>
        </div>
      </footer>
    );
  }

  // 데스크톱 푸터
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
              <Link href="/terms">서비스이용약관</Link>
              <Link href="/terms?tab=privacy">개인정보처리방침</Link>
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
          <Link
            href="https://forms.gle/XuLEETJJjKVGku9A6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              size="extraLarge"
              icon={<ChevronRightIcon width={16} height={16} />}
            >
              <Text typography="sub2_m_18" color="white">
                행사 제보하기
              </Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </footer>
  );
}
