// src/components/events/filters/FilterBadges/index.tsx

"use client";

import Image from "next/image";
import CloseIcon from "@/assets/svg/closeIcon.svg";
import styles from "./styles.module.css";
import Flex from "@/components/common/Flex";

interface FilterBadgesProps {
  onOfflineFilter: string;
  freeFilter: boolean;
  onClearOnOfflineFilter: () => void;
  onClearFreeFilter: () => void;
}

export default function FilterBadges({
  onOfflineFilter,
  freeFilter,
  onClearOnOfflineFilter,
  onClearFreeFilter,
}: FilterBadgesProps) {
  const badges: { key: string; label: string; onClear: () => void }[] = [];

  if (onOfflineFilter === "online" || onOfflineFilter === "offline") {
    badges.push({
      key: "onOffline",
      label: onOfflineFilter === "online" ? "온라인" : "오프라인",
      onClear: onClearOnOfflineFilter,
    });
  }

  if (freeFilter) {
    badges.push({
      key: "freeOnly",
      label: "무료만 보기",
      onClear: onClearFreeFilter,
    });
  }

  if (badges.length === 0) {
    return null;
  }

  return (
    <Flex align="center" gap={0.25}>
      {badges.map((badge) => (
        <Flex
          as="button"
          align="center"
          gap={0.25}
          className={styles.badge}
          onClick={() => {
            badge.onClear();
          }}
          key={badge.key}
          aria-label={`${badge.label} 필터 제거`}
        >
          <span>{badge.label}</span>
          <Image src={CloseIcon} alt="Close Icon" />
        </Flex>
      ))}
    </Flex>
  );
}
