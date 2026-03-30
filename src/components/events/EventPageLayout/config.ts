// src/components/events/EventPageLayout/config.ts

import ConferenceFilterView from "@/components/events/filters/views/ConferenceFilterView";
import BootcampFilterView from "@/components/events/filters/views/BootcampFilterView";
import HackathonFilterView from "@/components/events/filters/views/HackathonFilterView";

export type EventPageId = "conference" | "bootcamp" | "hackathon";

export interface PageConfig {
  pageId: EventPageId;
  title: string;
  FilterView: React.ComponentType;
  emptyUrl: string;
}

export const PAGE_CONFIGS: Record<EventPageId, PageConfig> = {
  conference: {
    pageId: "conference",
    title: "컨퍼런스 · 세미나",
    FilterView: ConferenceFilterView,
    emptyUrl: "/conference/create",
  },
  bootcamp: {
    pageId: "bootcamp",
    title: "부트캠프 · 동아리",
    FilterView: BootcampFilterView,
    emptyUrl: "/bootcamp/create",
  },
  hackathon: {
    pageId: "hackathon",
    title: "해커톤 · 공모전",
    FilterView: HackathonFilterView,
    emptyUrl: "/hackathon/create",
  },
} as const;
