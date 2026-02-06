// src/components/events/detail/StickyApplySection/index.tsx
"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import styles from "./styles.module.css";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import DollarIcon from "@/assets/svg/dollarIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import Badge from "@/components/common/Badge";
import { EVENT_CATEGORY_LABEL } from "@/constants/event";
import { EventCategory } from "@/constants/event";
import { formatPrice } from "@/utils/format";
import LoginImage from "@/assets/images/loginImg.png";
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
  phoneNumber: string;
  image: string;
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
  phoneNumber,
  image,
  hashTags = [],
  bookmarked = false,
  applyLink,
}: StickyApplySectionProps) {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const { mutate: toggleBookmark, isPending } = useToggleEventBookmark();

  const handleBookmarkClick = () => {
    // 낙관적 업데이트 (즉시 UI 변경)
    setIsBookmarked(!isBookmarked);

    // API 호출
    toggleBookmark(eventId, {
      onError: () => {
        // 에러 발생 시 원래 상태로 되돌림
        setIsBookmarked(isBookmarked);
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
      <div className={styles.stickyApplySectionContent}>
        <div className={styles.stickyApplySectionContentHeader}>
          <div className={styles.stickyApplySectionContentHeaderTitle}>
            <Text typography="label3_m_14" color="primary-strong">
              {EVENT_CATEGORY_LABEL[category]}
            </Text>
            <Text typography="head3_m_24" color="black">
              {title}
            </Text>
          </div>
          <div className={styles.stickyApplySectionContentHeaderImage}>
            <img
              src={image || LoginImage.src.toString()}
              alt="Event Thumbnail Image"
              width={284}
              height={160}
            />
          </div>
        </div>
        <div className={styles.stickyApplySectionContentBody}>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={CalendarIcon} alt="Calendar Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <Text typography="label3_m_14" color="neutral-60">
                행사 기간
              </Text>
              <Text typography="body1_r_16" color="neutral-20">
                {eventStart} ~ {eventEnd}
              </Text>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={LocationIcon} alt="Location Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <Text typography="label3_m_14" color="neutral-60">
                장소
              </Text>
              <Text typography="body1_r_16" color="neutral-20">
                {place || "온라인"}
              </Text>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={DollarIcon} alt="Dollar Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <Text typography="label3_m_14" color="neutral-60">
                참가비
              </Text>
              <Text typography="body1_r_16" color="neutral-20">
                {price === 0 ? "무료" : `${formatPrice(price)}원`}
              </Text>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItemDivider} />
          <div className={styles.stickyApplySectionContentBodyHashTags}>
            {hashTags.map((tag, index) => {
              // # 기호 제거
              const cleanTag = tag.startsWith("#") ? tag.slice(1) : tag;
              return (
                <Link
                  key={index}
                  href={`/search?q=${encodeURIComponent(cleanTag)}`}
                  className={styles.hashTagLink}
                >
                  <Badge label={tag.startsWith("#") ? tag : `#${tag}`} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.stickyApplyButtonList}>
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
      {phoneNumber && (
        <div className={styles.stickyApplySectionFooter}>
          <div className={styles.stickyApplySectionFooterItem}>
            <div className={styles.circle} />
            <Text typography="label3_m_14" color="neutral-60">
              문의
            </Text>
          </div>
          <Text typography="body2_r_14" color="neutral-20">
            {phoneNumber}
          </Text>
        </div>
      )}
    </div>
  );
}
