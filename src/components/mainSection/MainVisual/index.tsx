"use client";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import { useBanners } from "@/hooks/queries/useHome";
import { incrementBannerView } from "@/api/home";
import Banner from "@/assets/images/main_banner.png";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";
import { useIsMobile, useMediaQuery } from "@/hooks/useMediaQuery";
import { useInfiniteSlider } from "@/hooks/useInfiniteSlider";
import type { Banner as BannerType } from "@/types/home";

type TextProps = React.ComponentProps<typeof Text>;
type Typography = TextProps["typography"];
type TextColor = TextProps["color"];

const normalizeMultilineText = (text?: string | null) =>
  text ? text.replace(/\\n/g, "\n") : "";

// 뷰포트별 배너 텍스트 typography 설정
type BannerTextVariant = "mobile" | "tablet" | "desktop";
const BANNER_TEXT_TYPOGRAPHY: Record<
  BannerTextVariant,
  {
    subTitle: Typography;
    mainTitle: Typography;
    description: Typography;
    descriptionColor: TextColor;
  }
> = {
  mobile: {
    subTitle: "label4_m_12",
    mainTitle: "head3_m_24",
    description: "label3_m_14",
    descriptionColor: "neutral-70",
  },
  tablet: {
    subTitle: "label2_m_16",
    mainTitle: "head3_m_24",
    description: "sub3_m_16",
    descriptionColor: "neutral-80",
  },
  desktop: {
    subTitle: "sub2_m_18",
    mainTitle: "head1_m_42",
    description: "sub2_m_18",
    descriptionColor: "neutral-80",
  },
};

interface BannerTextContentProps {
  banner: BannerType;
  variant: BannerTextVariant;
}

function BannerTextContent({ banner, variant }: BannerTextContentProps) {
  const typo = BANNER_TEXT_TYPOGRAPHY[variant];
  const subTitleNode = (
    <Text
      typography={typo.subTitle}
      color="primary-light"
      as="p"
      className={styles.multilineText}
    >
      {normalizeMultilineText(banner.subTitle)}
    </Text>
  );
  const mainTitleNode = (
    <Text
      typography={typo.mainTitle}
      color="white"
      as="h2"
      className={styles.multilineText}
    >
      {normalizeMultilineText(banner.mainTitle)}
    </Text>
  );
  const descriptionNode = (
    <Text
      typography={typo.description}
      color={typo.descriptionColor}
      as="p"
      className={styles.multilineText}
    >
      {normalizeMultilineText(banner.description)}
    </Text>
  );

  // 모바일은 제목/설명이 내부 Flex(gap 1rem)로 묶여 있어 구조가 다름
  if (variant === "mobile") {
    return (
      <Flex direction="column" gap="0.25rem">
        {subTitleNode}
        <Flex direction="column" gap="1rem">
          {mainTitleNode}
          {descriptionNode}
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      {subTitleNode}
      {mainTitleNode}
      {descriptionNode}
    </>
  );
}

export default function MainVisual() {
  const { data, isLoading, error } = useBanners();
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  // displayOrder로 정렬
  const sortedBanners =
    data && data.eventMainBannerReponseList
      ? [...data.eventMainBannerReponseList].sort(
          (a, b) => a.displayOrder - b.displayOrder,
        )
      : [];

  const {
    sliderRef,
    extendedItems: extendedBanners,
    currentIndex,
    actualIndex,
    isDragging,
    dragOffset,
    isAnimating,
    isTransitioning,
    handlePrev,
    handleNext,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useInfiniteSlider<BannerType>({
    items: sortedBanners,
    enabled: !isLoading,
    onClickItem: (banner) => {
      if (banner?.bannerLink) {
        incrementBannerView(banner.id).catch(() => {});
        window.open(banner.bannerLink, "_blank");
      }
    },
  });

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <section id="mainVisual" className={styles.mainVisual}>
        <div
          className={styles.skeletonBg}
          style={{ backgroundColor: "var(--fill-normal, #ddd)" }}
        >
          <div className={styles.slideInner}>
            <div className={styles.slideContent}>
              <Skeleton width="120px" height="20px" borderRadius="4px" />
              <Flex direction="column" gap="4px">
                <Skeleton width="468px" height="50px" borderRadius="4px" />
                <Skeleton width="240px" height="50px" borderRadius="4px" />
              </Flex>
              <Flex direction="column" gap="6px">
                <Skeleton width="305px" height="26px" borderRadius="4px" />
                <Skeleton width="148px" height="26px" borderRadius="4px" />
              </Flex>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // API 데이터가 없거나 에러일 경우 표시하지 않음
  if (
    error ||
    !data ||
    !data.eventMainBannerReponseList ||
    data.eventMainBannerReponseList.length === 0
  ) {
    return null;
  }

  const bannerTextVariant: BannerTextVariant = isMobile
    ? "mobile"
    : isTablet
      ? "tablet"
      : "desktop";

  return (
    <section id="mainVisual" className={styles.mainVisual}>
      <div className={styles.visualSlide}>
        <div
          ref={sliderRef}
          className={`${styles.sliderTrack} ${isDragging ? styles.dragging : ""}`}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          style={{
            transform:
              dragOffset === 0
                ? `translateX(-${currentIndex * 100}%)`
                : `calc(-${currentIndex * 100}% + ${dragOffset}px)`,
            transition:
              isTransitioning && !isDragging
                ? "transform 0.5s ease-in-out"
                : "none",
          }}
        >
          {extendedBanners.map((banner, index) => (
            <div
              key={`banner-${index}`}
              className={styles.slideItem}
              style={{ cursor: banner.bannerLink ? "pointer" : "default" }}
            >
              <div className={styles.slideItemImage}>
                <Image
                  src={banner.bannerImageUrl ?? Banner.src.toString()}
                  alt={banner.mainTitle}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  draggable={false}
                />
              </div>
              <div className={styles.slideInner}>
                <div className={styles.slideContent}>
                  <BannerTextContent
                    banner={banner}
                    variant={bannerTextVariant}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Flex align="center" gap="12px" className={styles.paging}>
          <button
            onClick={handlePrev}
            className={styles.pagingButton}
            disabled={isAnimating}
          >
            <ChevronLeftIcon color="#fff" width={18} height={18} />
          </button>
          <Flex align="center" gap={0.1}>
            <Text typography="body2_r_14" color="white">
              {actualIndex}
            </Text>
            <Text typography="body2_r_14" color="white">
              /
            </Text>
            <Text typography="body2_r_14" color="white">
              {sortedBanners.length}
            </Text>
          </Flex>

          <button
            onClick={handleNext}
            className={styles.pagingButton}
            disabled={isAnimating}
          >
            <ChevronRightIcon color="#fff" width={18} height={18} />
          </button>
        </Flex>
      </div>
    </section>
  );
}
