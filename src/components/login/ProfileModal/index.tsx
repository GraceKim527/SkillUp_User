// src/components/login/ProfileModal/index.tsx

import { useEffect, useRef, useState } from "react";
import Alert from "@/components/common/Alert";
import styles from "./styles.module.css";
import Image from "next/image";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import { PenIcon } from "@/assets/icons/PenIcon";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { useRouter } from "next/navigation";
import CautionIcon from "@/assets/icons/CautionIcon";
interface ProfileModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: {
    name: string;
    email: string;
    profileImage: string;
  };
  triggerRef: React.RefObject<HTMLDivElement>;
  handleLogout: () => void;
}

export default function ProfileModal({
  isOpen,
  toggle,
  user,
  triggerRef,
  handleLogout,
}: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const toggleAlert = () => setIsAlertOpen((prev) => !prev);

  // ProfileModal이 닫힐 때 Alert 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setIsAlertOpen(false);
    }
  }, [isOpen]);

  const menuItems = [
    {
      id: "bookmark",
      label: "북마크",
      icon: BookmarkIcon,
      iconProps: { width: 20, height: 20, fillColor: "none" },
      onClick: () => {
        toggle();
        router.push("/profile/bookmarks");
      },
    },
    {
      id: "profile",
      label: "프로필 수정",
      icon: PenIcon,
      iconProps: { fillColor: "none" },
      onClick: () => {
        toggle();
        router.push("/profile/edit");
      },
    },
    {
      id: "support",
      label: "고객센터",
      icon: ChatIcon,
      iconProps: {},
      onClick: () => {
        toggle();
        router.push("/support");
      },
    },
  ];
  // Escape 키로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle]);

  // 외부 클릭 시 닫기 (Alert가 열려있을 때는 비활성화)
  useEffect(() => {
    if (!isOpen || isAlertOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isAlertOpen, toggle, triggerRef]);

  // 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modal} ref={modalRef}>
        <Flex align="center" gap={0.5} className={styles.header}>
          <div className={styles.headerImage}>
            <Image
              src={user.profileImage}
              alt="Logo Default Image"
              width={36}
              height={36}
            />
          </div>
          <Flex direction="column">
            <Text typography="sub3_m_16" color="black">
              {user.name}
            </Text>
            <Text typography="label4_m_12" color="neutral-50">
              {user.email}
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column" gap={0.25}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;
            const iconColor = isHovered
              ? "var(--Primary-strong)"
              : "var(--Neutral-30)";

            return (
              <Flex
                key={item.id}
                justify="space-between"
                align="center"
                className={styles.menuItem}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={item.onClick}
              >
                <Flex align="center" gap={0.25}>
                  <Icon
                    {...item.iconProps}
                    {...(item.id === "support"
                      ? { color: iconColor }
                      : { strokeColor: iconColor })}
                  />
                  <Text
                    typography="label3_m_14"
                    color={isHovered ? "primary-strong" : "black"}
                  >
                    {item.label}
                  </Text>
                </Flex>
                <ChevronRightIcon />
              </Flex>
            );
          })}
        </Flex>
        <button className={styles.logoutBtn} onClick={toggleAlert}>
          <Text typography="label3_m_14" color="neutral-60">
            로그아웃
          </Text>
        </button>
      </div>
      <Alert
        icon={<CautionIcon color="var(--Primary-strong)" />}
        isOpen={isAlertOpen}
        toggle={toggleAlert}
        title="로그아웃 하시겠습니까?"
        message={<>로그아웃하면 일부 기능을 이용할 수 없습니다.</>}
        onConfirm={handleLogout}
      />
    </>
  );
}
