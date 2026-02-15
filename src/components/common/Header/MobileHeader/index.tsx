// MobileHeader/index.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import styles from "./styles.module.css";

import SkillUpWhiteLogo from "@/assets/svg/skillUp_white.svg";
import SkillUpBlackLogo from "@/assets/svg/skillUp_black.svg";
import SearchIcon from "@/assets/svg/searchIcon.svg";
import LogoDefaultImg from "@/assets/images/logoDefaultImg.png";

import Modal from "@/components/common/Modal";
import LoginContent, { SocialType } from "@/components/login/LoginContent";
import TermsAgreementContent from "@/components/login/TermsAgreementContent";
import SearchModalContent from "@/components/main/SearchModalContent";
import Text from "@/components/common/Text";

import { useAuth } from "@/hooks/useAuth";
import { useSocialLogin } from "@/hooks/mutations/useSocialLogin";
import { useUserEmailAndName } from "@/hooks/queries/useUser";
import { useToast } from "@/hooks/useToast";
import {
  userNameAtom,
  userEmailAtom,
  userProfileImageAtom,
  loginModalAtom,
} from "@/store/authAtoms";

// 카테고리 메뉴 아이템
const CATEGORY_MENU = [
  { label: "컨퍼런스 · 세미나", href: "/conference" },
  { label: "부트캠프", href: "/bootcamp" },
  { label: "동아리 · 해커톤 · 공모전", href: "/hackathon" },
  { label: "네트워킹 · 멘토링", href: "/mentoring" },
  { label: "아티클", href: "/article" },
];

// 마이페이지 메뉴
const MY_PAGE_MENU = [
  { label: "북마크", href: "/profile/bookmarks" },
  { label: "프로필 수정", href: "/profile/edit" },
  { label: "고객센터", href: "/support" },
];

interface MobileHeaderProps {
  variant: "main" | "sub";
}

export default function MobileHeader({ variant }: MobileHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  // 드로어 상태
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  // 로그인 모달 상태
  const [isModalOpen, setIsModalOpen] = useAtom(loginModalAtom);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // 검색 모달 상태
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const toggleSearchModal = () => setIsSearchModalOpen((prev) => !prev);

  // 약관 동의 모달 상태
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [pendingSocialType, setPendingSocialType] = useState<SocialType | null>(
    null
  );

  // 인증 관련
  const { isAuthenticated, logout } = useAuth();
  const { mutate: startSocialLogin } = useSocialLogin();
  useUserEmailAndName();

  const userName = useAtomValue(userNameAtom);
  const userEmail = useAtomValue(userEmailAtom);
  const userProfileImage = useAtomValue(userProfileImageAtom);

  const handleLogout = () => {
    logout();
    closeDrawer();
    showToast({
      title: "로그아웃 완료",
      message: "로그아웃되었습니다.",
      type: "success",
      duration: 2000,
    });
    router.push("/");
  };

  const handleSocialLoginClick = (socialType: SocialType) => {
    setPendingSocialType(socialType);
    setIsTermsModalOpen(true);
  };

  const handleTermsConfirm = () => {
    if (!pendingSocialType) return;
    startSocialLogin(pendingSocialType.toLowerCase() as SocialType, {
      onError: (error) => {
        console.error("소셜 로그인 실패:", error);
        setIsTermsModalOpen(false);
        setPendingSocialType(null);
      },
    });
  };

  const handleTermsCancel = () => {
    setIsTermsModalOpen(false);
    setPendingSocialType(null);
  };

  const handleMenuClick = () => {
    closeDrawer();
  };

  const handleLoginClick = () => {
    closeDrawer();
    setIsModalOpen(true);
  };

  return (
    <>
      <header
        className={`${styles.mobileHeader} ${
          variant === "main" ? styles.mobileHeaderMain : ""
        }`}
      >
        {/* 상단 바 */}
        <div className={styles.topBar}>
          <div className={styles.leftSection}>
            <button
              className={styles.hamburgerBtn}
              onClick={toggleDrawer}
              aria-label="메뉴 열기"
            >
              <div className={styles.hamburgerIcon}>
                <span />
                <span />
                <span />
              </div>
            </button>
            <Link href="/">
              <Image
                src={variant === "main" ? SkillUpWhiteLogo : SkillUpBlackLogo}
                alt="스킬업 로고"
                width={100}
                height={15}
                priority
              />
            </Link>
          </div>
          <div className={styles.rightSection}>
            <button
              className={styles.iconBtn}
              onClick={toggleSearchModal}
              aria-label="검색"
            >
              <Image
                src={SearchIcon}
                alt="검색"
                width={24}
                height={24}
                style={{
                  filter: variant === "main" ? "invert(1)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 드로어 오버레이 */}
      <div
        className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.open : ""}`}
        onClick={closeDrawer}
      />

      {/* 드로어 */}
      <nav
        className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}
        aria-label="모바일 메뉴"
      >
        {/* 드로어 헤더 */}
        <div className={styles.drawerHeader}>
          <Link href="/" onClick={handleMenuClick}>
            <Image
              src={SkillUpBlackLogo}
              alt="스킬업 로고"
              width={100}
              height={15}
            />
          </Link>
          <button
            className={styles.closeBtn}
            onClick={closeDrawer}
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
              <button className={styles.loginBtn} onClick={handleLoginClick}>
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
                onClick={handleMenuClick}
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
                    onClick={handleMenuClick}
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
            <button className={styles.logoutBtn} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </nav>

      {/* 로그인 모달 */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <LoginContent
          onSocialLoginClick={handleSocialLoginClick}
          onLoginSuccess={toggleModal}
          onClose={toggleModal}
        />
      </Modal>

      {/* 약관 동의 모달 */}
      <Modal isOpen={isTermsModalOpen} toggle={handleTermsCancel}>
        <TermsAgreementContent onConfirm={handleTermsConfirm} />
      </Modal>

      {/* 검색 모달 */}
      <Modal isOpen={isSearchModalOpen} toggle={toggleSearchModal}>
        <SearchModalContent onClose={toggleSearchModal} />
      </Modal>
    </>
  );
}
