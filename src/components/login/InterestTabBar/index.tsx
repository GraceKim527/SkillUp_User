// src/components/login/ProfileEditContent/InterestTabBar/index.tsx

"use client";
import React from "react";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";

interface InterestTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { label: "기획", value: "기획자" },
  { label: "디자인", value: "디자이너" },
  { label: "마케팅", value: "마케팅" },
  { label: "개발", value: "개발자" },
];

export default function InterestTabBar({
  activeTab,
  onTabChange,
}: InterestTabBarProps) {
  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`${styles.tab} ${
            activeTab === tab.value ?  styles.active : ""
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          <Text
            typography="label4_m_12"
            color={activeTab === tab.value ? "primary-heavy" : "neutral-60"}
          >
            {tab.label}
          </Text>
        </button>
      ))}
    </div>
  );
}
