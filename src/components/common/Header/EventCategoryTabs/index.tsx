// src/components/nav/EventCategoryTabs/index.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

// TODO : 추후 탭 메뉴 추가 시 수정 필요
const tabs = [
  { label: "컨퍼런스 · 세미나", href: "/conference" },
  { label: "부트캠프 · 동아리", href: "/bootcamp" },
  { label: "해커톤 · 공모전", href: "/hackathon" },
  { label: "아티클", href: "/article" },
];

export default function EventCategoryTabs({
  variant,
}: {
  variant: "main" | "sub";
}) {
  const pathname = usePathname();

  return (
    <nav
      className={`${styles.tabNav} ${variant === "sub" ? styles.sub : ""} ${variant === "main" ? styles.main : ""}`}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`${styles.tabItem} ${
            pathname.startsWith(tab.href) ? styles.active : ""
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
