"use client";
import React, { useState } from "react";
import Link from "next/link";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import styles from "./style.module.css";

// 아이콘 import
import SeminarIcon from "@/assets/icons/SeminarIcon";
import BootcampIcon from "@/assets/icons/BootcampIcon";
import HackathonIcon from "@/assets/icons/HackathonIcon";
import NetworkIcon from "@/assets/icons/NetworkIcon";
import ArticleIcon from "@/assets/icons/ArticleIcon";

const menuItems = [
  { icon: SeminarIcon, label: "컨퍼런스·세미나", path: "/conference" },
  { icon: BootcampIcon, label: "부트캠프", path: "/bootcamp" },
  { icon: HackathonIcon, label: "동아리·해커톤·공모전", path: "/hackathon" },
  { icon: NetworkIcon, label: "네트워킹·멘토링", path: "/mentoring" },
  { icon: ArticleIcon, label: "아티클", path: "/article" },
];

export default function IconMenu() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <Flex justify="center" gap="0.75" as="ul" className={styles.iconMenu}>
      {menuItems.map((item, idx) => (
        <li
          key={idx}
          className={`${styles.menuItem} ${
            idx === activeIdx ? styles.active : ""
          }`}
          onClick={() => setActiveIdx(idx)}
        >
          <Link href={item.path} className={styles.link}>
            <Flex direction="column" justify="center" align="center" gap="0.25">
              <item.icon className={styles.icon} />
              <Text
                typography="label1_r_18"
                color={idx === activeIdx ? "primary-strong" : "neutral-30"}
              >
                {item.label}
              </Text>
            </Flex>
          </Link>
        </li>
      ))}
    </Flex>
  );
}
