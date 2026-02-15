// src/constants/breakpoints.ts

export const BREAKPOINTS = {
  mobile: 375, // 모바일 기준 (Figma 디자인 기준)
  tablet: 768, // 태블릿
  desktop: 1024, // 데스크톱
  wide: 1240, // 와이드 (현재 max-width)
} as const;

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.tablet - 1}px)`, // ~767px
  tablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`, // 768~1023px
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`, // 1024px~
  tabletAndUp: `(min-width: ${BREAKPOINTS.tablet}px)`, // 768px~
} as const;

// CSS에서 사용할 브레이크포인트 값
export const CSS_BREAKPOINTS = {
  mobileMax: "767px",
  tabletMin: "768px",
  tabletMax: "1023px",
  desktopMin: "1024px",
} as const;
