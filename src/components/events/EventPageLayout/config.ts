// src/components/events/EventPageLayout/config.ts

export type EventPageId = "conference" | "bootcamp" | "hackathon";

export interface PageConfig {
  pageId: EventPageId;
  title: string;
  emptyUrl: string;
}

export const PAGE_CONFIGS: Record<EventPageId, PageConfig> = {
  conference: {
    pageId: "conference",
    title: "컨퍼런스 · 세미나",
    emptyUrl: "/conference/create",
  },
  bootcamp: {
    pageId: "bootcamp",
    title: "부트캠프 · 동아리",
    emptyUrl: "/bootcamp/create",
  },
  hackathon: {
    pageId: "hackathon",
    title: "해커톤 · 공모전",
    emptyUrl: "/hackathon/create",
  },
} as const;
