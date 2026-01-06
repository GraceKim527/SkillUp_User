// src/mocks/articleListMock.ts

import { Article } from "@/types/article";
import LoginImage from "@/assets/images/loginImg.png";

export const articleListMock: Article[] = [
  {
    id: 1,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["디자인"],
    title: "2025 디자인 시스템 구축 가이드",
    summary:
      "확장 가능하고 일관성 있는 디자인 시스템을 구축하는 방법을 알아봅니다. 컴포넌트 라이브러리부터 토큰 관리까지 실무에 바로 적용할 수 있는 팁을 공유합니다.",
    source: "DesignOps",
    originalPublishedDate: "2025.01.15",
    originalUrl: "https://www.google.com",
  },
  {
    id: 2,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["개발"],
    title: "React 19의 새로운 기능들",
    summary:
      "React 19에서 새롭게 추가된 기능들을 살펴보고, 실제 프로젝트에 어떻게 적용할 수 있는지 예제 코드와 함께 알아봅니다.",
    source: "Frontend",
    originalPublishedDate: "2025.01.12",
    originalUrl: "https://www.google.com",
  },
  {
    id: 3,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["기획"],
    title: "사용자 리서치 실전 가이드",
    summary:
      "효과적인 사용자 리서치를 위한 방법론과 인터뷰 기법을 다룹니다. 실제 사례를 통해 배우는 인사이트 도출 방법까지 소개합니다.",
    source: "UX Research",
    originalPublishedDate: "2025.01.10",
    originalUrl: "https://www.google.com",
  },
  {
    id: 4,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["마케팅"],
    title: "그로스 해킹 전략 A to Z",
    summary:
      "데이터 기반으로 빠르게 성장하는 그로스 해킹 전략을 소개합니다. 실제 스타트업 사례와 함께 실행 가능한 전술들을 다룹니다.",
    source: "Growth",
    originalPublishedDate: "2025.01.08",
    originalUrl: "https://www.google.com",
  },
  {
    id: 5,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["개발"],
    title: "TypeScript 고급 타입 패턴",
    summary:
      "TypeScript의 고급 타입 시스템을 활용한 실무 패턴들을 소개합니다. 제네릭, 유틸리티 타입, 조건부 타입 등을 실전 예제로 배워봅니다.",
    source: "TypeScript",
    originalPublishedDate: "2025.01.05",
    originalUrl: "https://www.google.com",
  },
  {
    id: 6,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["디자인"],
    title: "모바일 UI/UX 디자인 트렌드",
    summary:
      "2025년 모바일 앱 디자인의 최신 트렌드를 살펴봅니다. 마이크로 인터랙션부터 다크모드 디자인까지 다양한 사례를 분석합니다.",
    source: "Mobile",
    originalPublishedDate: "2025.01.03",
    originalUrl: "https://www.google.com",
  },
  {
    id: 7,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["개발"],
    title: "Next.js 15 App Router 완벽 가이드",
    summary:
      "Next.js 15의 App Router를 활용한 최신 웹 개발 패턴을 다룹니다. 서버 컴포넌트, 스트리밍, 캐싱 전략까지 완벽하게 정리했습니다.",
    source: "Next.js",
    originalPublishedDate: "2025.01.01",
    originalUrl: "https://www.google.com",
  },
  {
    id: 8,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["기획"],
    title: "애자일 스프린트 운영 노하우",
    summary:
      "효율적인 애자일 스프린트 운영 방법과 회고 문화 만들기를 소개합니다. 실제 팀에서 겪은 시행착오와 해결 방법을 공유합니다.",
    source: "Agile",
    originalPublishedDate: "2024.12.28",
    originalUrl: "https://www.google.com",
  },
  {
    id: 9,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["디자인"],
    title: "피그마 자동화로 생산성 높이기",
    summary:
      "피그마 플러그인과 자동화 도구를 활용해 디자인 작업 효율을 극대화하는 방법을 알아봅니다. 실무에서 바로 쓸 수 있는 플러그인도 추천합니다.",
    source: "Figma",
    originalPublishedDate: "2024.12.25",
    originalUrl: "https://www.google.com",
  },
  {
    id: 10,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["마케팅"],
    title: "SEO 최적화 실전 체크리스트",
    summary:
      "검색 엔진 최적화를 위한 필수 체크리스트와 실행 방법을 정리했습니다. 기술적 SEO부터 콘텐츠 최적화까지 단계별로 알아봅니다.",
    source: "SEO",
    originalPublishedDate: "2024.12.22",
    originalUrl: "https://www.google.com",
  },
  {
    id: 11,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["개발"],
    title: "CI/CD 파이프라인 구축하기",
    summary:
      "GitHub Actions를 활용한 자동화된 배포 파이프라인 구축 방법을 다룹니다. 테스트 자동화부터 무중단 배포까지 전체 프로세스를 소개합니다.",
    source: "DevOps",
    originalPublishedDate: "2024.12.20",
    originalUrl: "https://www.google.com",
  },
  {
    id: 12,
    thumbnailUrl: LoginImage.src.toString(),
    targetRoles: ["기획"],
    title: "데이터 기반 의사결정 프레임워크",
    summary:
      "정량적 지표와 정성적 피드백을 결합한 의사결정 프레임워크를 소개합니다. A/B 테스트 설계부터 결과 해석까지 실무 가이드를 제공합니다.",
    source: "Analytics",
    originalPublishedDate: "2024.12.18",
    originalUrl: "https://www.google.com",
  },
];
