// src/components/login/ProfileModal/index.tsx

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import { PenIcon } from "@/assets/icons/PenIcon";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { useRouter } from "next/navigation";
import ProfileEditContent from "../ProfileEditContent";
import Modal from "@/components/common/Modal";
interface ProfileModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: {
    name: string;
    email: string;
    profileImage: string;
  };
  triggerRef: React.RefObject<HTMLDivElement>;
}

export default function ProfileModal({
  isOpen,
  toggle,
  user,
  triggerRef,
}: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  const menuItems = [
    {
      id: "bookmark",
      label: "북마크",
      icon: BookmarkIcon,
      iconProps: { width: 20, height: 20, fillColor: "none" },
      onClick: () => router.push("/bookmarks"),
    },
    {
      id: "profile",
      label: "프로필 수정",
      icon: PenIcon,
      iconProps: { fillColor: "none" },
      onClick: () => setIsProfileEditOpen(true),
    },
    {
      id: "support",
      label: "고객센터",
      icon: ChatIcon,
      iconProps: {},
      onClick: () => router.push("/support"),
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

  // 외부 클릭 시 닫기
  useEffect(() => {
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
  }, [isOpen, toggle, triggerRef]);

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
        <div className={styles.header}>
          <div className={styles.headerImage}>
            <Image
              src={user.profileImage}
              alt="Logo Default Image"
              width={36}
              height={36}
            />
          </div>
          <div className={styles.headerInfo}>
            <Text typography="sub3_m_16" color="black">
              {user.name}
            </Text>
            <Text typography="label4_m_12" color="neutral-50">
              {user.email}
            </Text>
          </div>
        </div>

        <div className={styles.content}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;
            const iconColor = isHovered
              ? "var(--Primary-strong)"
              : "var(--Neutral-30)";

            return (
              <div
                key={item.id}
                className={styles.menuItem}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={item.onClick}
              >
                <div className={styles.menuItemTitle}>
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
                </div>
                <ChevronRightIcon />
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isProfileEditOpen}
        toggle={() => setIsProfileEditOpen(false)}
      >
        <ProfileEditContent onClose={() => setIsProfileEditOpen(false)} />
      </Modal>
    </>
  );
}
