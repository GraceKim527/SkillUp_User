// src/components/common/EventCard/index.tsx
"use client";

import clsx from "clsx";
import styles from "./styles.module.css";
import Image from "next/image";
import Badge from "@/components/common/Badge";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import { useRouter } from "next/navigation";
import Text from "@/components/common/Text";
import IconButton from "@/components/common/IconButton";
import Button from "@/components/common/Button";
import Flex from "@/components/common/Flex";
import Tooltip from "@/components/common/Tooltip";
import { Event } from "@/types/event";
import { EVENT_CATEGORY_LABEL } from "@/constants/event";
import { useEventCard } from "@/hooks/useEventCard";

interface EventCardProps {
  size: "small" | "medium" | "large" | "block" | "compact";
  event: Event;
  block?: boolean;
  className?: string;
}

export default function EventCard({
  size,
  event,
  block,
  className,
}: EventCardProps) {
  const { title, scheduleText, locationText, priceText, category, d_dayLabel } = event;
  const { isBookmarked, eventUrl, imageSrc, handleBookmarkClick } = useEventCard(event);
  const router = useRouter();

  const categoryBadgeLabel = EVENT_CATEGORY_LABEL[category] || "";

  if (size === "compact") {
    return (
      <Flex
        direction="column"
        gap="0"
        onClick={() => router.push(eventUrl)}
        className={clsx(styles.eventCard, styles.compact, className)}
      >
        <div className={styles.eventCardInner}>
          <div className={styles.eventCardImage}>
            <Image src={imageSrc} alt={title} fill sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, 300px" />
            <Flex justify="space-between" align="flex-start" className={styles.eventCardImageOverlay}>
              {d_dayLabel ? (
                <span className={styles.compactDeadlineBadge}>{d_dayLabel}</span>
              ) : (
                <div />
              )}
              <IconButton
                variant="opacity"
                size="medium"
                icon={
                  <BookmarkIcon
                    width={20}
                    height={20}
                    fillColor={isBookmarked ? "var(--Common-white)" : "none"}
                    strokeColor={isBookmarked ? "none" : "var(--Common-white)"}
                  />
                }
                onClick={handleBookmarkClick}
                ariaLabel="북마크"
              />
            </Flex>
          </div>

          <Flex direction="column" gap="0.75rem" className={styles.eventCardContentContainer}>
            <Flex direction="column" gap="0.5rem">
              <Flex direction="column" gap="0.25rem">
                <Badge label={categoryBadgeLabel} />
                <Text
                  typography="sub3_m_16"
                  color="black"
                  as="h3"
                  className={styles.compactTitle}
                >
                  {title}
                </Text>
              </Flex>
              <Flex direction="column" gap="0.125rem">
                <Flex align="center" gap="0.25rem">
                  <Image src={CalendarIcon} alt="Calendar" width={16} height={16} />
                  <Text typography="label4_m_12" color="neutral-40" className={styles.compactMetaText}>
                    {scheduleText}
                  </Text>
                </Flex>
                <Flex align="center" gap="0.25rem">
                  <Image src={LocationIcon} alt="Location" width={16} height={16} />
                  <Text typography="label4_m_12" color="neutral-40" className={styles.compactMetaText}>
                    {locationText || "온라인"}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Text typography="sub3_m_16" color="black">
              {priceText}
            </Text>
          </Flex>
        </div>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      gap="1rem"
      onClick={() => router.push(eventUrl)}
      className={clsx(
        styles.eventCard,
        styles[size],
        {
          [styles.block]: block,
        },
        className,
      )}
    >
      <div className={styles.eventCardInner}>
        <div className={styles.eventCardImage}>
          <Image src={imageSrc} alt={title} fill sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, 300px" />

          <Flex
            justify="space-between"
            align="flex-start"
            className={styles.eventCardImageOverlay}
          >
            {d_dayLabel ? (
              <div className={styles.deadlineBadgeContainer}>
                <Text typography="label3_m_14" color="white" className={styles.deadlineBadgeText}>
                  {d_dayLabel}
                </Text>
              </div>
            ) : (
              <div />
            )}
            <Tooltip content="북마크">
              <IconButton
                variant="opacity"
                size="large"
                icon={
                  <BookmarkIcon
                    fillColor={isBookmarked ? "var(--Common-white)" : "none"}
                    strokeColor={isBookmarked ? "none" : "var(--Common-white)"}
                  />
                }
                onClick={handleBookmarkClick}
                ariaLabel="북마크"
              />
            </Tooltip>
          </Flex>
        </div>
        <Flex
          direction="column"
          justify="space-between"
          gap="1rem"
          className={styles.eventCardContentContainer}
        >
          <Flex direction="column" gap="0.75rem">
            <Flex direction="column" gap="0.25rem">
              <Badge label={categoryBadgeLabel} />
              {size === "large" || size === "small" ? (
                <Text
                  typography="head3_m_24"
                  color="black"
                  as="h3"
                  className={styles.eventCardContentBodyItemTitle}
                >
                  {title}
                </Text>
              ) : (
                <Text
                  typography="sub1_m_20"
                  color="black"
                  as="h3"
                  className={styles.eventCardContentBodyItemTitleMedium}
                >
                  {title}
                </Text>
              )}
            </Flex>
            <Flex direction="column" gap="0.12rem">
              <Flex align="center" gap="0.5rem">
                <Image src={CalendarIcon} alt="Calendar Icon" />
                <Text
                  typography="body2_r_14"
                  color="neutral-40"
                  className={styles.eventCardContentBodyDatePlaceItemText}
                >
                  {scheduleText}
                </Text>
              </Flex>
              <Flex align="center" gap="0.5rem">
                <Image src={LocationIcon} alt="Location Icon" />
                <Text
                  typography="body2_r_14"
                  color="neutral-40"
                  className={styles.eventCardContentBodyDatePlaceItemText}
                >
                  {locationText || "온라인"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {(size === "large" || size === "medium") && (
            <Flex justify="space-between">
              <Flex align="center" gap="0.5rem">
                <Text typography="sub2_m_18" color="black">
                  {priceText}
                </Text>
                {priceText === "0원" && <Badge label="무료" />}
              </Flex>
              {size === "large" && (
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(eventUrl);
                  }}
                >
                  자세히 보기
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </div>
    </Flex>
  );
}
