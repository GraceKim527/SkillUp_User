// src/types/home.ts

// 배너 타입
export interface Banner {
  displayOrder: number;
  title: string;
  subtitle?: string;
  description?: string;
  bannerImageUrl: string;
  bannerLink: string;
  bannerType: string;
  startAt: string;
  endAt: string;
}

// 배너 목록 응답 타입
export interface BannersResponse {
  homeBannerResponseList: Banner[];
}
