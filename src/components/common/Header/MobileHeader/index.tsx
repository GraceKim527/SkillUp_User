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

import Modal from "@/components/common/Modal";
import LoginContent, { SocialType } from "@/components/login/LoginContent";
import TermsAgreementContent from "@/components/login/TermsAgreementContent";
import SearchModalContent from "@/components/common/Header/SearchModalContent";
import MobileDrawer from "./MobileDrawer";

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
    null,
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
            <Link href="/">
              <Image
                src={variant === "main" ? SkillUpWhiteLogo : SkillUpBlackLogo}
                alt="스킬업 로고"
                width={130}
                height={18}
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
              <Image src={SearchIcon} alt="검색" width={24} height={24} />
            </button>
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
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        isAuthenticated={isAuthenticated}
        userName={userName}
        userEmail={userEmail}
        userProfileImage={userProfileImage}
        pathname={pathname}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />

      {/* 로그인 모달 */}
      <Modal isOpen={isModalOpen} toggle={toggleModal} fullScreen>
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
