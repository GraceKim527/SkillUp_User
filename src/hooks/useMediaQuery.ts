// src/hooks/useMediaQuery.ts

"use client";

import { useState, useEffect } from "react";

const BREAKPOINTS = {
  MOBILE: 768,
  SMALL_TABLET: 480,
  DESKTOP: 1280,
} as const;

/**
 * 미디어 쿼리 상태를 반환하는 훅
 * SSR에서 hydration mismatch를 방지하기 위해 초기값은 false
 *
 * @param query - CSS 미디어 쿼리 문자열 (예: "(max-width: 767px)")
 * @returns 미디어 쿼리 매칭 여부
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 767px)");
 * const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  // SSR 또는 마운트 전에는 false 반환
  if (!mounted) {
    return false;
  }

  return matches;
}

/**
 * 모바일 뷰포트 여부를 반환하는 훅
 * @returns 모바일 뷰포트 여부 (767px 이하)
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`);
}

/**
 * 소형 태블릿 뷰포트 여부를 반환하는 훅
 * @returns 소형 태블릿 뷰포트 여부 (480px ~ 767px)
 */
export function useIsSmallTablet(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.SMALL_TABLET}px) and (max-width: ${BREAKPOINTS.MOBILE - 1}px)`);
}

/**
 * 태블릿 뷰포트 여부를 반환하는 훅
 * @returns 태블릿 뷰포트 여부 (768px ~ 1279px)
 */
export function useIsTablet(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.DESKTOP - 1}px)`);
}

/**
 * 데스크톱 뷰포트 여부를 반환하는 훅
 * @returns 데스크톱 뷰포트 여부 (1280px 이상)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.DESKTOP}px)`);
}

/**
 * 모바일 또는 태블릿 뷰포트 여부를 반환하는 훅 (데스크톱이 아님)
 * `isMobile || isTablet` 패턴을 대체한다.
 * @returns 모바일 혹은 태블릿 뷰포트 여부 (1279px 이하)
 */
export function useIsCompactLayout(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.DESKTOP - 1}px)`);
}
