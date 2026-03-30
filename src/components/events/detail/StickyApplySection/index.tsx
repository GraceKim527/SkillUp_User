// src/components/events/detail/StickyApplySection/index.tsx
"use client";

import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import styles from "./styles.module.css";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import DollarIcon from "@/assets/svg/dollarIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import Badge from "@/components/common/Badge";
import Flex from "@/components/common/Flex";
import { EVENT_CATEGORY_LABEL } from "@/constants/event";
import { EventCategory } from "@/constants/event";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useToggleEventBookmark } from "@/hooks/mutations/useToggleEventBookmark";

interface StickyApplySectionProps {
  eventId: number;
  category: EventCategory;
  title: string;
  eventStart: string;
  eventEnd: string;
  place: string;
  price: number;
  isFree: boolean;
  phoneNumber: string | null;
  hashTags?: string[];
  bookmarked?: boolean;
  applyLink?: string;
}

export default function StickyApplySection({
  eventId,
  category,
  title,
  eventStart,
  eventEnd,
  place,
  price,
  isFree,
  phoneNumber,
  hashTags = [],
  bookmarked = false,
  applyLink,
}: StickyApplySectionProps) {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const { mutate: toggleBookmark, isPending } = useToggleEventBookmark();

  useEffect(() => {
    setIsBookmarked(bookmarked);
  }, [bookmarked]);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
    toggleBookmark(eventId, {
      onError: () => {
        setIsBookmarked((prev) => !prev);
      },
    });
  };

  const handleApplyClick = () => {
    if (applyLink) {
      window.open(applyLink, "_blank");
    }
  };

  return (
    <div className={styles.stickyApplySection}>
      {/* 카테고리 + 제목 */}
      <div className={styles.header}>
        <Text typography="label3_m_14" color="primary-strong">
          {EVENT_CATEGORY_LABEL[category]}
        </Text>
        <Text typography="head4_sb_20" color="black">
          {title}
        </Text>
      </div>

      {/* 정보 카드 */}
      <div className={styles.infoCard}>
        {/* 행사 기간 */}
        <div className={styles.infoCardRow}>
          <Image
            src={CalendarIcon}
            alt="Calendar Icon"
            width={24}
            height={24}
          />
          <div className={styles.infoCardRowText}>
            <Text typography="label3_m_14" color="neutral-60">
              행사 기간
            </Text>
            <Text typography="sub2_m_18" color="black">
              {eventStart} ~ {eventEnd}
            </Text>
          </div>
        </div>

        {/* 장소 */}
        <div className={styles.infoCardRow}>
          <Image
            src={LocationIcon}
            alt="Location Icon"
            width={24}
            height={24}
            style={{ width: "24px", height: "24px" }}
          />
          <div className={styles.infoCardRowText}>
            <Text typography="label3_m_14" color="neutral-60">
              장소
            </Text>
            <Text typography="sub2_m_18" color="black">
              {place || "온라인"}
            </Text>
          </div>
        </div>

        {/* 참가비 */}
        <div className={styles.infoCardRow}>
          <Image src={DollarIcon} alt="Dollar Icon" width={24} height={24} />
          <div className={styles.infoCardRowText}>
            <Text typography="label3_m_14" color="neutral-60">
              참가비
            </Text>
            <Flex align="center" gap="0.5rem">
              <Text typography="sub2_m_18" color="black">
                {formatPrice(price)}원
              </Text>
              {isFree && <Badge label="무료" variant="secondary" />}
            </Flex>
          </div>
        </div>

        {/* 구분선 */}
        <div className={styles.infoCardDivider} />

        {/* 해시태그 */}
        {hashTags.length > 0 && (
          <div className={styles.hashTags}>
            {hashTags.map((tag) => {
              const cleanTag = tag.startsWith("#") ? tag.slice(1) : tag;
              return (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(cleanTag)}`}
                  className={styles.hashTagLink}
                >
                  <Badge
                    label={tag.startsWith("#") ? tag : `#${tag}`}
                    variant="disable"
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* 버튼 */}
      <div className={styles.buttonList}>
        {applyLink && (
          <Button
            variant="primary"
            size="extraLarge"
            block
            onClick={handleApplyClick}
          >
            신청하기
          </Button>
        )}
        <Button
          variant="outlined"
          size="extraLarge"
          block
          onClick={handleBookmarkClick}
          disabled={isPending}
        >
          {isBookmarked ? "북마크 해제" : "북마크에 추가"}
        </Button>
      </div>

      {/* 문의 */}
      {phoneNumber && (
        <div className={styles.footer}>
          <div className={styles.footerLabel}>
            <div className={styles.circle} />
            <Text typography="label3_m_14" color="neutral-60">
              문의
            </Text>
          </div>
          <Text
            typography="body2_r_14"
            color="neutral-20"
            className={styles.phoneNumber}
          >
            {phoneNumber}
          </Text>
        </div>
      )}
    </div>
  );
}
