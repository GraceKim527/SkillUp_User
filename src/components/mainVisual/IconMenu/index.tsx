import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

// 아이콘 import
import SeminarIcon from "@/assets/icons/icon_seminar.svg";
import BootcampIcon from "@/assets/icons/icon_Education.svg";
import HackathonIcon from "@/assets/icons/icon_hackathon.svg";
import NetworkIcon from "@/assets/icons/icon_networking.svg";
import ArticleIcon from "@/assets/icons/icon_article.svg";

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
    <nav className={styles.iconMenu}>
      <ul>
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className={idx === activeIdx ? styles.active : ""}
            onClick={() => setActiveIdx(idx)}
          >
            <Link href={item.path} className={styles.link}>
              <div className={styles.iconBox}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={40}
                  height={40}
                />
              </div>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}