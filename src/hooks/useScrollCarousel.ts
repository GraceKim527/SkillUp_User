// src/hooks/useScrollCarousel.ts

import { useRef, useEffect, useState } from "react";

interface UseScrollCarouselOptions {
  infinite?: boolean;
  gap?: number;
  cardSelector?: string;
  itemCount?: number;
}

export function useScrollCarousel(options: UseScrollCarouselOptions = {}) {
  const {
    infinite = false,
    gap = 12,
    cardSelector,
    itemCount = 0,
  } = options;

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const getCardWidth = (): number => {
    const el = carouselRef.current;
    if (!el) return 0;

    const firstCard = cardSelector
      ? (el.querySelector(cardSelector) as HTMLElement)
      : (el.firstElementChild as HTMLElement);

    if (!firstCard) return 0;

    return firstCard.offsetWidth + gap;
  };

  const prev = () => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollAmount = getCardWidth();
    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const next = () => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollAmount = getCardWidth();
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // 무한 루프 구현
  useEffect(() => {
    if (!infinite) return;

    const el = carouselRef.current;
    if (!el || itemCount === 0) return;

    // getCardWidth 로직을 useEffect 내부로 이동
    const calculateCardWidth = () => {
      const firstCard = cardSelector
        ? (el.querySelector(cardSelector) as HTMLElement)
        : (el.firstElementChild as HTMLElement);

      if (!firstCard) return 0;
      return firstCard.offsetWidth + gap;
    };

    const cardWidth = calculateCardWidth();
    if (cardWidth > 0) {
      const initialScroll = itemCount * cardWidth;
      el.scrollLeft = initialScroll;
    }

    const handleScroll = () => {
      if (isScrolling) return;

      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;
      const oneSetWidth = (scrollWidth - clientWidth) / 2;

      // 오른쪽 끝에 도달하면 중간으로 순간이동
      if (scrollLeft >= oneSetWidth * 1.9) {
        setIsScrolling(true);
        el.style.scrollBehavior = "auto";
        el.scrollLeft = oneSetWidth;
        setTimeout(() => {
          el.style.scrollBehavior = "smooth";
          setIsScrolling(false);
        }, 50);
      }
      // 왼쪽 끝에 도달하면 중간으로 순간이동
      else if (scrollLeft <= oneSetWidth * 0.1) {
        setIsScrolling(true);
        el.style.scrollBehavior = "auto";
        el.scrollLeft = oneSetWidth;
        setTimeout(() => {
          el.style.scrollBehavior = "smooth";
          setIsScrolling(false);
        }, 50);
      }
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [infinite, isScrolling, itemCount, gap, cardSelector]);

  return {
    carouselRef,
    prev,
    next,
  };
}
