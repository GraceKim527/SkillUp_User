// src/hooks/mutations/useToggleEventBookmark.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEventBookmark } from "@/api/events";
import { queryKeys } from "../queryKeys";
import { useToast } from "../useToast";

// 행사 북마크 토글
export const useToggleEventBookmark = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (eventId: number) => toggleEventBookmark(eventId),
    onSuccess: (_, eventId) => {
      showToast({
        title: "북마크 변경 완료",
        message: "북마크가 업데이트되었습니다.",
        type: "success",
        duration: 2000,
      });

      // 해당 행사의 상세 정보 refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.event(eventId) });
      // 행사 목록도 refetch (북마크 상태가 목록에도 표시될 수 있으므로)
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      // 홈 화면의 추천/인기/마감 행사들도 refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.home.all });
      // 북마크 페이지도 refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
