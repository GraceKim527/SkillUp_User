// src/components/common/Header/MobileHeader/MobileDrawer.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import Text from "@/components/common/Text";
import SkillUpBlackLogo from "@/assets/svg/skillUp_black.svg";
import LogoDefaultImg from "@/assets/images/logoDefaultImg.png";
import styles from "./styles.module.css";

// 카테고리 메뉴 아이템
const CATEGORY_MENU = [
  { label: "컨퍼런스 · 세미나", href: "/conference" },
  { label: "부트캠프", href: "/bootcamp" },
  { label: "동아리 · 해커톤 · 공모전", href: "/hackathon" },
  { label: "아티클", href: "/article" },
];

// 마이페이지 메뉴
const MY_PAGE_MENU = [
  { label: "북마크", href: "/profile/bookmarks" },
  { label: "프로필 수정", href: "/profile/edit" },
  { label: "고객센터", href: "/support" },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  userName: string | null;
  userEmail: string | null;
  userProfileImage: string | null;
  pathname: string;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  isAuthenticated,
  userName,
  userEmail,
  userProfileImage,
  pathname,
  onLoginClick,
  onLogout,
}: MobileDrawerProps) {
  return (
    <>
      {/* 드로어 오버레이 */}
      <div
        className={`${styles.drawerOverlay} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
      />

      {/* 드로어 */}
      <nav
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        aria-label="모바일 메뉴"
      >
        {/* 드로어 헤더 */}
        <div className={styles.drawerHeader}>
          <Link href="/" onClick={onClose}>
            <Image
              src={SkillUpBlackLogo}
              alt="스킬업 로고"
              width={100}
              height={15}
            />
          </Link>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="메뉴 닫기"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 프로필 영역 */}
        <div className={styles.profileSection}>
          {isAuthenticated ? (
            <div className={styles.profileInfo}>
              <Image
                src={userProfileImage || LogoDefaultImg.src}
                alt="프로필 이미지"
                width={48}
                height={48}
                className={styles.profileImage}
              />
              <div className={styles.profileText}>
                <Text typography="label3_m_14" color="black">
                  {userName || "사용자"}
                </Text>
                <Text typography="label4_m_12" color="neutral-60">
                  {userEmail || ""}
                </Text>
              </div>
            </div>
          ) : (
            <div className={styles.loginPrompt}>
              <Text typography="body2_r_14" color="neutral-40">
                로그인하고 맞춤 행사를 추천받으세요
              </Text>
              <button className={styles.loginBtn} onClick={onLoginClick}>
                로그인 · 회원가입
              </button>
            </div>
          )}
        </div>

        {/* 카테고리 메뉴 */}
        <div className={styles.menuSection}>
          <div className={styles.menuTitle}>카테고리</div>
          <div className={styles.menuList}>
            {CATEGORY_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menuItem} ${
                  pathname === item.href ? styles.active : ""
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {isAuthenticated && (
            <>
              <div className={styles.menuDivider} />
              <div className={styles.menuTitle}>마이페이지</div>
              <div className={styles.menuList}>
                {MY_PAGE_MENU.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.menuItem} ${
                      pathname === item.href ? styles.active : ""
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 드로어 푸터 */}
        {isAuthenticated && (
          <div className={styles.drawerFooter}>
            <button className={styles.logoutBtn} onClick={onLogout}>
              로그아웃
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
