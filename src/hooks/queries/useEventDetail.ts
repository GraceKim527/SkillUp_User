// src/hooks/queries/useEventDetail.ts

import { useQuery } from "@tanstack/react-query";
import { getEventDetail } from "@/api/events";
import { queryKeys } from "../queryKeys";

export const useEventDetail = (eventId: number) => {
  return useQuery({
    queryKey: queryKeys.event(eventId),
    queryFn: () => getEventDetail(eventId),
    enabled: !!eventId, // eventId가 있을 때만 쿼리 실행
  });
};
