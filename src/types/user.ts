// src/types/user.ts

import { EventCategory } from "@/constants/event";
import { RoleName } from "@/constants/role";

export interface UserProfile {
  name: string;
  profileImageUrl: string;
  age: string;
  gender: string;
  role: string;
  interests: string[];
  marketingAgreement: boolean;
}

export interface CustomerCenterInquiry {
  question: string;
  answerTitle: string;
  answerContent: string;
}

export interface UserBookmarksEvent {
  id: number;
  thumbnailUrl: string;
  online: boolean;
  locationText: string;
  title: string;
  scheduleText: string;
  priceText: string;
  d_dayLabel: string;
  recommended: boolean;
  ad: boolean;
  bookmarked: boolean;
  category: EventCategory;
  recommendedRate: number;
}

export interface UserBookmarks {
  name: string;
  email: string;
  recruitingEvents: UserBookmarksEvent[];
  closedEvents: UserBookmarksEvent[];
  role: RoleName;
  bookmarkCount: number;
  pageInfo: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
