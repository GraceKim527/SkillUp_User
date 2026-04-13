// src/components/events/ArticleCard/index.tsx

import Image from "next/image";
import styles from "./styles.module.css";
import Flex from "@/components/common/Flex";
import type { Article } from "@/types/article";
import Text from "@/components/common/Text";
import { useArticleClick } from "@/hooks/useArticleClick";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { handleArticleClick } = useArticleClick();

  return (
    <Flex
      direction="column"
      gap={0.75}
      className={styles.container}
      onClick={() => {
        void handleArticleClick(article, { newTab: true });
      }}
    >
      <div className={styles.articleCardImage}>
        <Image src={article.thumbnailUrl} alt={article.title} fill sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, 350px" unoptimized />
      </div>
      <Flex direction="column" gap={0.5}>
        <Flex direction="column" gap={0.25}>
          <Text
            typography="head4_sb_20"
            color="black"
            className={styles.articleCardTitle}
          >
            {article.title}
          </Text>
          <Text
            typography="body1_r_16"
            color="neutral-30"
            className={styles.articleCardDescription}
          >
            {article.summary}
          </Text>
        </Flex>

        <Flex gap={0.25}>
          {/* TODO : 추후 뱃지 추가 시 수정 필요 */}
          <div className={styles.articleCardBadge}>
            <Text typography="label3_m_14" color="neutral-60">
              {article.source}
            </Text>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
