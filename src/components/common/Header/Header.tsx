/* 
  작성자 : 김재혁
  최초 작성일 : 2025-08-21
  최종 수정일 : 2025-09-29
*/

"use client";

import React from "react";
import Image from "next/image";
import SkillUpBlack from "@/assets/svg/skillUp_black.svg";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 로고 + Nav 메뉴바 */}
        <div className={styles.logoBox}>
          <h1 className={styles.logo}>
            <Link href="/">
              <Image
              src={SkillUpBlack}
              alt="스킬업 메인 로고"
              width={120}
              height={18.14}
              />
            </Link>
          </h1>

          <nav className={styles.nav}>
            <ul className={styles.gnb}>
              <li>
                <Link href="#">기획</Link>
              </li>
              <li>
                <Link href="#">디자인</Link>
              </li>
              <li>
                <Link href="#" className={styles.btn}>개발</Link>
              </li>
              <li>
                <Link href="#" className={styles.btn}>AI</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* 검색창, 로그인, 회원가입 메뉴바 */}
        <div className={styles.topMenu}>
          <input type="text" className={styles.searchBox} placeholder="검색어를 입력해주세요." />
          <Link href="/login" className={`${styles.btn} ${styles.loginBtn}`}>로그인</Link>
          <Link href="/signup" className={`${styles.btn} ${styles.signupBtn}`}>
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}