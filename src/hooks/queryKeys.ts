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
    recommended: (isAuthenticated: boolean) =>
      [...queryKeys.home.all, "recommended", isAuthenticated] as const,
    recent: (isAuthenticated: boolean) =>
      [...queryKeys.home.all, "recent", isAuthenticated] as const,
    featured: (isAuthenticated: boolean, category?: string, size?: number) =>
      [...queryKeys.home.all, "featured", { isAuthenticated, category, size }] as const,
    endingSoon: (isAuthenticated: boolean, size?: number) =>
      [...queryKeys.home.all, "ending-soon", { isAuthenticated, size }] as const,
    category: (filters: object) =>
      [...queryKeys.home.all, "category", filters] as const,
    banners: (isAuthenticated: boolean) =>
      [...queryKeys.home.all, "banners", isAuthenticated] as const,
  },

  // User
  user: {
    all: ["user"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
    emailAndName: () => [...queryKeys.user.all, "email-name"] as const,
    bookmarks: (sort: "deadline" | "latest", page: number) =>
      [...queryKeys.user.all, "bookmarks", sort, page] as const,
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
