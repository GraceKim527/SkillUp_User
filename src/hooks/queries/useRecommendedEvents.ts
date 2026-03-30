// src/hooks/queries/useRecommendedEvents.ts

import { useQuery } from "@tanstack/react-query";
import { getRecommendedEvents } from "@/api/events";
import { EventCategory } from "@/constants/event";
import { queryKeys } from "../queryKeys";

export const useRecommendedEvents = (
  category: EventCategory,
  enabled = true
) => {
  return useQuery({
    queryKey: [...queryKeys.events.all, "recommended", category],
    queryFn: () => getRecommendedEvents(category),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: enabled && !!category, // enabled가 true이고 category가 있을 때만 쿼리 실행
  });
};
