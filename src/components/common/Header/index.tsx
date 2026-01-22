"use client";

import React, { RefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";
import SkillUpWhiteLogo from "@/assets/svg/skillUp_white.svg";
import SkillUpBlackLogo from "@/assets/svg/skillUp_black.svg";
import Link from "next/link";
import styles from "./styles.module.css";
import Modal from "../Modal";
import LoginContent, { SocialType } from "@/components/login/LoginContent";
import TermsAgreementContent from "@/components/login/TermsAgreementContent";
import EventCategoryTabs from "@/components/common/Header/EventCategoryTabs";

import SearchIcon from "@/assets/svg/searchIcon.svg";
import ProfileModal from "@/components/login/ProfileModal";
import LogoDefaultImg from "@/assets/images/logoDefaultImg.png";
import { useAuth } from "@/hooks/useAuth";
import { useSocialLogin } from "@/hooks/mutations/useSocialLogin";
import { useAtom, useAtomValue } from "jotai";
import {
  userNameAtom,
  userEmailAtom,
  userProfileImageAtom,
  loginModalAtom,
} from "@/store/authAtoms";
import { useUserEmailAndName } from "@/hooks/queries/useUser";
import Text from "../Text";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { useRouter } from "next/navigation";
import SearchModalContent from "@/components/main/SearchModalContent";

interface HeaderProps {
  variant: "main" | "sub";
}

export default function Header({ variant }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useAtom(loginModalAtom);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const { isAuthenticated, logout } = useAuth();
  const { mutate: startSocialLogin } = useSocialLogin();
  const router = useRouter();
  // 로그인 상태일 때 유저 이메일/이름/프로필 이미지 자동 조회 (백그라운드 업데이트)
  useUserEmailAndName();

  const userName = useAtomValue(userNameAtom);
  const userEmail = useAtomValue(userEmailAtom);
  const userProfileImage = useAtomValue(userProfileImageAtom);

  // 클라이언트 마운트 체크 (Hydration 깜빡임 방지)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const toggleProfileModal = () => setIsProfileModalOpen((prev) => !prev);

  // 검색 모달 상태
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const toggleSearchModal = () => setIsSearchModalOpen((prev) => !prev);

  // 약관 동의 모달 상태
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [pendingSocialType, setPendingSocialType] = useState<SocialType | null>(
    null
  );

  const profileBtnRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSocialLoginClick = (socialType: SocialType) => {
    setPendingSocialType(socialType);
    setIsTermsModalOpen(true);
  };

  const handleTermsConfirm = () => {
    if (!pendingSocialType) return;

    // 소셜 로그인 시작 (useSocialLogin 훅이 자동으로 URL을 가져와서 리다이렉트)
    startSocialLogin(pendingSocialType.toLowerCase() as SocialType, {
      onError: (error) => {
        console.error("소셜 로그인 실패:", error);
        // 에러 발생 시 모달 닫기
        setIsTermsModalOpen(false);
        setPendingSocialType(null);
      },
    });
    // 성공 시에는 리다이렉트되므로 모달을 닫지 않음
  };

  const handleTermsCancel = () => {
    setIsTermsModalOpen(false);
    setPendingSocialType(null);
  };

  return (
    <header
      className={
        styles.header +
        " " +
        (variant === "main" ? styles.mainHeader : styles.subHeader)
      }
    >
      <div className={styles.inner}>
        {/* 로고 + Nav 메뉴바 */}
        <div className={styles.logoNavMenu}>
          <Link href="/">
            {variant === "main" ? (
              <Image
                src={SkillUpWhiteLogo}
                alt="스킬업 메인 로고"
                width={120}
                height={18}
                priority
              />
            ) : (
              <Image
                src={SkillUpBlackLogo}
                alt="스킬업 서브 로고"
                width={120}
                height={18}
                priority
              />
            )}
          </Link>
          {variant === "sub" && <EventCategoryTabs />}
        </div>

        {/* 검색창, 로그인, 회원가입 메뉴바 */}
        <div className={styles.topMenu}>
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className={styles.searchBox}
              id="searchInput"
              readOnly
              onClick={toggleSearchModal}
            />
            <button className={styles.searchBtn} onClick={toggleSearchModal}>
              <Image src={SearchIcon} alt="search" width={20} height={20} />
            </button>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfi28YC_XHpe94p9TkJvjmZz20lWvPAGiCNQgSvYq4YTlYerQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inquiryBtn}
          >
            <Text typography="label3_m_14" color="fill-normal">
              문의하기
            </Text>
          </a>

          {isMounted && (
            <>
              {!isAuthenticated ? (
                <button
                  className={styles.loginBtn}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Text typography="label3_m_14" color="fill-normal">
                    로그인 · 회원가입
                  </Text>
                </button>
              ) : (
                <div className={styles.profileBtnWrap} ref={profileBtnRef}>
                  <button
                    className={styles.profileBtn}
                    onClick={toggleProfileModal}
                  >
                    <Text typography="label3_m_14" color="fill-normal">
                      {userName}
                    </Text>
                    <ChevronDownIcon />
                  </button>
                  <div className={styles.profileBtnContent}>
                    <ProfileModal
                      isOpen={isProfileModalOpen}
                      toggle={toggleProfileModal}
                      user={{
                        name: userName || "",
                        email: userEmail || "",
                        profileImage:
                          userProfileImage || LogoDefaultImg.src.toString(),
                      }}
                      triggerRef={profileBtnRef as RefObject<HTMLDivElement>}
                      handleLogout={handleLogout}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 로그인 모달 */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <LoginContent
          onSocialLoginClick={handleSocialLoginClick}
          onLoginSuccess={toggleModal}
        />
      </Modal>

      {/* 약관 동의 모달 (로그인 모달과 독립적으로 렌더링) */}
      <Modal isOpen={isTermsModalOpen} toggle={handleTermsCancel}>
        <TermsAgreementContent onConfirm={handleTermsConfirm} />
      </Modal>

      {/* 검색 모달 */}
      <Modal isOpen={isSearchModalOpen} toggle={toggleSearchModal}>
        <SearchModalContent onClose={toggleSearchModal} />
      </Modal>
    </header>
  );
}
