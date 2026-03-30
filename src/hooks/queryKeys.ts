// src/hooks/queryKeys.ts
// React Query Key 중앙 관리 (타입 안전성 + 자동완성)

export const queryKeys = {
  // Events
  events: {
    all: ["events"] as const,
    lists: () => [...queryKeys.events.all, "list"] as const,
    list: (filters: object) =>
      [...queryKeys.events.lists(), filters] as const,
    details: () => [...queryKeys.events.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.events.details(), id] as const,
  },

  // Home
  home: {
    all: ["home"] as const,
    recommended: () =>
      [...queryKeys.home.all, "recommended"] as const,
    recent: () =>
      [...queryKeys.home.all, "recent"] as const,
    featured: (category?: string, size?: number) =>
      [...queryKeys.home.all, "featured", { category, size }] as const,
    endingSoon: (size?: number) =>
      [...queryKeys.home.all, "ending-soon", { size }] as const,
    category: (filters: object) =>
      [...queryKeys.home.all, "category", filters] as const,
    banners: () =>
      [...queryKeys.home.all, "banners"] as const,
  },

  // User
  user: {
    all: ["user"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
    emailAndName: () => [...queryKeys.user.all, "email-name"] as const,
    bookmarks: (sort: "deadline" | "latest", page: number) =>
      [...queryKeys.user.all, "bookmarks", sort, page] as const,
    recentSearches: ["user", "recent-searches"] as const,
  },

  // Article
  article: {
    all: ["article"] as const,
    lists: () => [...queryKeys.article.all, "list"] as const,
    list: (filters: object) =>
      [...queryKeys.article.lists(), filters] as const,
  },

  // Event (single - 기존 ["event", eventId] 패턴 유지)
  event: (id: number) => ["event", id] as const,
};
