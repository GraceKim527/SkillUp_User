// src/hooks/useInfiniteSlider.ts

"use client";

import { useEffect, useRef, useState } from "react";

interface UseInfiniteSliderOptions<T> {
  items: T[];
  /** 로딩 완료 여부 — false일 동안은 transition 활성화를 미룸 */
  enabled: boolean;
  /** 드래그가 아닌 클릭일 때 호출. 현재 노출 중인 아이템이 인자로 전달된다. */
  onClickItem?: (item: T) => void;
}

interface UseInfiniteSliderResult<T> {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  /** [last, ...items, first] 형태의 복제된 배열 */
  extendedItems: T[];
  /** 복제된 배열 기준 현재 인덱스 */
  currentIndex: number;
  /** 화면 표시용 실제 페이지 번호 (1-based) */
  actualIndex: number;
  isDragging: boolean;
  dragOffset: number;
  isAnimating: boolean;
  isTransitioning: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  handleDragStart: (e: React.PointerEvent<HTMLDivElement>) => void;
  handleDragMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handleDragEnd: () => void;
}

/**
 * 무한 슬라이드 훅.
 * items 앞뒤로 복제본을 추가해 transition 종료 시점에
 * 반대쪽 끝으로 순간 이동(jump)하는 방식으로 무한 루프를 구현한다.
 * pointer 이벤트 기반 드래그도 지원하며, 드래그 임계값(80px) 이상이면
 * 슬라이드를 이동시키고, 아니면 onClickItem 콜백이 호출된다.
 */
export function useInfiniteSlider<T>({
  items,
  enabled,
  onClickItem,
}: UseInfiniteSliderOptions<T>): UseInfiniteSliderResult<T> {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // 무한 슬라이드를 위한 복제: [마지막, 원본들, 첫번째]
  const extendedItems =
    items.length > 0 ? [items[items.length - 1], ...items, items[0]] : [];

  // transition 끝날 때 무한 루프 점프
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || items.length === 0) return;

    const handleTransitionEnd = () => {
      setIsAnimating(false);

      // 마지막 복제본에 도달했을 때 (첫번째 실제 아이템으로 점프)
      if (currentIndex === items.length + 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
      // 첫번째 복제본에 도달했을 때 (마지막 실제 아이템으로 점프)
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(items.length);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, items.length]);

  // 초기 마운트 후 transition 활성화
  useEffect(() => {
    if (enabled && items.length > 0 && !isMounted) {
      const timer = setTimeout(() => {
        setIsMounted(true);
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [enabled, items.length, isMounted]);

  // transition 상태 복원 (무한 슬라이드 점프 후)
  useEffect(() => {
    if (isMounted && !isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [isTransitioning, isMounted]);

  // 실제 페이지 번호 계산 (복제본 제외)
  const actualIndex =
    currentIndex === 0
      ? items.length
      : currentIndex === items.length + 1
        ? 1
        : currentIndex;

  const handlePrev = () => {
    if (!isTransitioning || isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isTransitioning || isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    hasDraggedRef.current = false;
    if (isAnimating || items.length <= 1) return;
    setIsDragging(true);
    setIsTransitioning(false);
    dragStartXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const moved = e.clientX - dragStartXRef.current;
    setDragOffset(moved);
    if (Math.abs(moved) > 10) {
      hasDraggedRef.current = true;
    }
  };

  const handleDragEnd = () => {
    const wasDragging = isDragging;
    const moved = dragOffset;
    const threshold = 80;

    setIsDragging(false);
    setIsTransitioning(true);
    setDragOffset(0);

    // 드래그 중이었고 threshold를 넘었으면 슬라이드 이동
    if (wasDragging && Math.abs(moved) >= threshold) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (moved > 0 ? prev - 1 : prev + 1));
      return;
    }

    // 드래그가 아닌 클릭이면 현재 아이템 콜백 호출
    if (!hasDraggedRef.current) {
      const currentItem = extendedItems[currentIndex];
      if (currentItem !== undefined) {
        onClickItem?.(currentItem);
      }
    }
  };

  return {
    sliderRef,
    extendedItems,
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
  };
}
