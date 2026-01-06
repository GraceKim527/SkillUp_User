// src/components/events/ArticleCard/index.tsx

import styles from "./styles.module.css";
import Flex from "@/components/common/Flex";
import type { Article } from "@/types/article";
import Text from "@/components/common/Text";
import { useRouter } from "next/navigation";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      gap={0.75}
      className={styles.container}
      onClick={() => router.push(article.originalUrl)}
    >
      <div className={styles.articleCardImage}>
        <img src={article.thumbnailUrl} alt={article.title} />
        <Flex
          justify="space-between"
          className={styles.articleCardImageOverlay}
          gap={0.5}
        >
          {article.targetRoles.map((role) => (
            <div className={styles.articleCardImageOverlayBadge} key={role}>
              <Text typography="label3_m_14" color="white">
                {role}
              </Text>
            </div>
          ))}
        </Flex>
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
          <div className={styles.articleCardBadge}>
            <Text typography="label3_m_14" color="neutral-60">
              {article.originalPublishedDate}
            </Text>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
