// src/components/login/ProfileEditContent/interestOptionsData.ts

import { Option } from "@/components/common/RadioGroup";

export const interestOptionsByTab: Record<string, Option[]> = {
  planning: [
    { label: "서비스 기획", value: "service-planning" },
    { label: "사업 기획", value: "business-planning" },
    { label: "전략 기획", value: "strategy-planning" },
    { label: "UX 기획", value: "ux-planning" },
    { label: "콘텐츠 기획", value: "content-planning" },
    { label: "프로젝트 관리", value: "project-management" },
    { label: "데이터 분석", value: "data-analysis" },
    { label: "비즈니스 모델링", value: "business-modeling" },
  ],
  design: [
    { label: "UI/UX 디자인", value: "ui-ux-design" },
    { label: "그래픽 디자인", value: "graphic-design" },
    { label: "브랜드 디자인", value: "brand-design" },
    { label: "프로덕트 디자인", value: "product-design" },
    { label: "모션 그래픽", value: "motion-graphic" },
    { label: "일러스트레이션", value: "illustration" },
    { label: "3D 디자인", value: "3d-design" },
    { label: "영상 편집", value: "video-editing" },
  ],
  marketing: [
    { label: "디지털 마케팅", value: "digital-marketing" },
    { label: "콘텐츠 마케팅", value: "content-marketing" },
    { label: "퍼포먼스 마케팅", value: "performance-marketing" },
    { label: "브랜드 마케팅", value: "brand-marketing" },
    { label: "SNS 마케팅", value: "sns-marketing" },
    { label: "그로스 해킹", value: "growth-hacking" },
    { label: "SEO/ASO", value: "seo-aso" },
    { label: "CRM 마케팅", value: "crm-marketing" },
  ],
  development: [
    { label: "웹 프론트엔드", value: "web-frontend" },
    { label: "웹 백엔드", value: "web-backend" },
    { label: "모바일 앱", value: "mobile-app" },
    { label: "AI/머신러닝", value: "ai-ml" },
    { label: "데이터 엔지니어링", value: "data-engineering" },
    { label: "DevOps", value: "devops" },
    { label: "블록체인", value: "blockchain" },
    { label: "게임 개발", value: "game-development" },
  ],
};
