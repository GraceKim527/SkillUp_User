// src/components/common/Accordion/index.tsx

"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";

interface AccordionItemProps {
  id: string;
  question: string;
  answerTitle: string;
  answerDetail: string;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
}

export function AccordionItem({
  id,
  question,
  answerTitle,
  answerDetail,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.question}
        onClick={() => onToggle?.(id)}
        aria-expanded={isOpen}
      >
        <div className={styles.questionContent}>
          <Text typography="head3_m_24" color="neutral-30" as="span">
            Q
          </Text>
          <Text typography="sub2_m_18" color="black">
            {question}
          </Text>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.answer}>
          <Text typography="head3_m_24" color="primary-strong" as="span">
            A
          </Text>
          <div className={styles.answerContent}>
            <Text typography="sub2_m_18" color="black">
              {answerTitle}
            </Text>
            <Text typography="body2_r_14" color="neutral-30">
              {answerDetail}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: Array<{
    id: string;
    question: string;
    answerTitle: string;
    answerDetail: string;
  }>;
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answerTitle={item.answerTitle}
          answerDetail={item.answerDetail}
          isOpen={openIds.includes(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
