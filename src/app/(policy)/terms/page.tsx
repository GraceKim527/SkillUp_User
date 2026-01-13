"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICE_TERMS, PRIVACY_POLICY } from "@/constants/policyPages";
import Text from "@/components/common/Text";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";
import styles from "./styles.module.css";
import clsx from "clsx";

type TabType = "service" | "privacy";

const dateOptions: DropdownOption[] = [
  { label: "2026년 1월 9일", value: "2026-01-09" },
];

export default function TermsPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("service");
  const [selectedDate, setSelectedDate] = useState<DropdownOption>(
    dateOptions[0]
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "privacy") {
      setActiveTab("privacy");
    }
  }, [searchParams]);

  const currentPolicy =
    activeTab === "service" ? SERVICE_TERMS : PRIVACY_POLICY;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* 탭 섹션 */}
        <div className={styles.tabContainer}>
          <button
            className={clsx(styles.tab, {
              [styles.tabActive]: activeTab === "service",
            })}
            onClick={() => setActiveTab("service")}
          >
            <Text
              typography="label2_m_16"
              color={activeTab === "service" ? "black" : "neutral-30"}
            >
              서비스 이용약관
            </Text>
          </button>
          <button
            className={clsx(styles.tab, {
              [styles.tabActive]: activeTab === "privacy",
            })}
            onClick={() => setActiveTab("privacy")}
          >
            <Text
              typography="label2_m_16"
              color={activeTab === "privacy" ? "black" : "neutral-30"}
            >
              개인정보처리방침
            </Text>
          </button>
        </div>

        {/* 약관 내용 */}
        <div className={styles.contentContainer}>
          {/* 제목과 날짜 */}
          <div className={styles.titleSection}>
            <Text typography="head2_sb_30" color="neutral-15">
              {activeTab === "service"
                ? "스킬업 서비스 이용약관"
                : "스킬업 개인정보처리방침"}
            </Text>
            <Dropdown
              options={dateOptions}
              selected={selectedDate}
              onSelect={setSelectedDate}
              className={styles.dateDropdown}
              spaceBetween
            />
          </div>

          {/* 약관 섹션들 */}
          <div className={styles.sections}>
            {currentPolicy.map((section, index) => (
              <div key={index} className={styles.section}>
                {section.title && (
                  <Text
                    typography="head4_sb_20"
                    color="black"
                    className={styles.sectionTitle}
                  >
                    {section.title}
                  </Text>
                )}
                <div className={styles.sectionContent}>
                  {section.content.map((paragraph, pIndex) => (
                    <Text
                      key={pIndex}
                      typography="body1_r_16"
                      color="black"
                      className={styles.paragraph}
                    >
                      {paragraph}
                    </Text>
                  ))}
                </div>
                {section.table && (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {section.table.headers.map((header, hIndex) => (
                          <th key={hIndex}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIndex) => (
                        <tr key={rIndex}>
                          {row.map((cell, cIndex) => (
                            <td key={cIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
