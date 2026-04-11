// src/types/home.ts

// 배너 타입
export interface Banner {
  displayOrder: number;
  id: number;
  mainTitle: string;
  subTitle: string;
  description: string;
  bannerImageUrl: string | null;
  bannerLink: string;
}

// 배너 목록 응답 타입
export interface BannersResponse {
  eventMainBannerReponseList: Banner[];
}
