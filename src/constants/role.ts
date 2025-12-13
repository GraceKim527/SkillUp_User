// src/constants/role.ts

// 직군 타입 정의
export type RoleName = "기획자" | "디자이너" | "개발자" | "마케팅";

// 직군 상수 객체
export const ROLE_NAME = {
  PLANNING: "기획자" as const,
  DESIGN: "디자이너" as const,
  DEVELOPER: "개발자" as const,
  MARKETING: "마케팅" as const,
} as const;

// 직군 배열 (순회가 필요한 경우)
export const ROLE_NAMES: RoleName[] = [
  ROLE_NAME.PLANNING,
  ROLE_NAME.DESIGN,
  ROLE_NAME.DEVELOPER,
  ROLE_NAME.MARKETING,
];
