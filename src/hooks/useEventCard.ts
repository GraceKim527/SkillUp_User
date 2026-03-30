// src/hooks/useEventCard.ts

import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { useToggleEventBookmark } from "@/hooks/mutations/useToggleEventBookmark";
import { getCategoryPath } from "@/utils/format";
import LoginImage from "@/assets/images/loginImg.png";

export const useEventCard = (event: Event) => {
  const [isBookmarked, setIsBookmarked] = useState(event.bookmarked);
  const { mutate: toggleBookmark, isPending } = useToggleEventBookmark();

  // 서버에서 새로운 데이터가 오면 북마크 상태 동기화
  useEffect(() => {
    setIsBookmarked(event.bookmarked);
  }, [event.bookmarked]);

  const { path: categoryPath } = getCategoryPath(event.category);
  const eventUrl = `${categoryPath}/${event.id}`;
  const imageSrc = event.thumbnailUrl || LoginImage.src.toString();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    // 낙관적 업데이트 (즉시 UI 변경)
    setIsBookmarked(prev => !prev);

    // API 호출
    toggleBookmark(event.id, {
      onError: () => {
        // 에러 발생 시 원래 상태로 되돌림
        setIsBookmarked(prev => !prev);
      },
    });
  };

  return { isBookmarked, isPending, eventUrl, imageSrc, handleBookmarkClick };
};
