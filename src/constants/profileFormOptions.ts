// src/constants/profileFormOptions.ts

import { Option } from "@/components/common/RadioGroup";

// 성별 옵션
export const GENDER_OPTIONS: Option[] = [
  { label: "남성", value: "M" },
  { label: "여성", value: "F" },
];

// 연령 옵션
export const AGE_OPTIONS: Option[] = [
  { label: "10대", value: "10대" },
  { label: "20대", value: "20대" },
  { label: "30대", value: "30대" },
  { label: "40대", value: "40대" },
  { label: "50대", value: "50대" },
  { label: "60대 이상", value: "60대 이상" },
];

// 직무 옵션
export const JOB_OPTIONS: Option[] = [
  { label: "기획자", value: "기획자" },
  { label: "디자이너", value: "디자이너" },
  { label: "개발자", value: "개발자" },
  { label: "마케팅", value: "마케팅" },
];
