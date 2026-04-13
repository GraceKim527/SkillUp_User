"use client";

import type { Article } from "@/types/article";
import { useIncreaseArticleViewCount } from "@/hooks/mutations/useIncreaseArticleViewCount";

interface HandleArticleClickOptions {
  newTab?: boolean;
}

export const useArticleClick = () => {
  const { mutateAsync } = useIncreaseArticleViewCount();

  const handleArticleClick = (
    article: Pick<Article, "id" | "originalUrl">,
    options?: HandleArticleClickOptions
  ) => {
    const openInNewTab = options?.newTab ?? false;

    if (openInNewTab) {
      window.open(article.originalUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(article.originalUrl);
    }

    mutateAsync(article.id).catch(() => {});
  };

  return { handleArticleClick };
};
