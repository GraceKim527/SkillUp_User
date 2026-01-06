// 추천 콘텐츠
"use client";
import { useState } from "react";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
import Text from "@/components/common/Text";
import { useRecommendedArticles } from "@/hooks/useArticle";
import { ARTICLE_TAB, ARTICLE_TABS } from "@/constants/article";
import { Article } from "@/types/article";

export default function RecommendedContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    ARTICLE_TAB.ALL
  );

  const { data, isLoading, error } = useRecommendedArticles(
    selectedCategory as unknown as typeof ARTICLE_TAB
  );
  const articles = data?.articles || [];

  const handleTabChange = (selected: string) => {
    setSelectedCategory(selected);
  };
  return (
    <Flex
      as="section"
      className={styles.RecommendContent}
      aria-labelledby="rec-title"
      gap="2.5rem"
      direction="column"
    >
      <Flex justify="space-between" align="flex-end" gap="2.5rem">
        <Flex direction="column">
          <Text typography="sub2_m_18" color="primary-strong">
            추천 콘텐츠
          </Text>
          <Flex gap="0.5rem">
            <Text typography="head1_m_42" color="black">
              실무자를 위한
            </Text>
            <Text typography="head5_sb_42" color="black">
              추천 컨텐츠
            </Text>
          </Flex>
        </Flex>

        <TabMenu
          tabs={ARTICLE_TABS}
          defaultIndex={ARTICLE_TABS.indexOf(selectedCategory)}
          onChange={handleTabChange}
          theme="light"
        />
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
          <Text typography="body1_r_16" color="neutral-70">
            로딩중...
          </Text>
        </Flex>
      ) : error ? (
        <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
          <Text typography="body1_r_16" color="neutral-70">
            데이터를 불러오는데 실패했습니다.
          </Text>
        </Flex>
      ) : articles.length === 0 ? (
        <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
          <Text typography="body1_r_16" color="neutral-70">
            추천 컨텐츠가 없습니다.
          </Text>
        </Flex>
      ) : (
        <div className={styles.cardList}>
          {articles.map((article: Article, idx: number) => (
            <Flex
              key={article.id}
              direction="column"
              className={`${styles.card} ${idx === 0 ? styles.heroCard : ""}`}
              as="article"
              gap="0.75rem"
            >
              <div
                className={`${styles.thumb} ${
                  idx === 0 ? styles.heroThumb : ""
                }`}
                style={{
                  backgroundImage: `url(${article.thumbnailUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <Flex direction="column">
                <Flex align="center" justify="space-between">
                  <Text typography="head4_sb_20" color="black">
                    {article.title}
                  </Text>
                  <Flex align="center" gap="0.5rem">
                    <div className={styles.badge}>
                      <Text typography="label3_m_14" color="neutral-60">
                        {article.targetRoles.map((role) => (
                          <Text
                            typography="label3_m_14"
                            color="neutral-60"
                            key={role}
                          >
                            #{role}
                          </Text>
                        ))}
                      </Text>
                    </div>
                    <div className={styles.badge}>
                      <Text typography="label3_m_14" color="neutral-60">
                        {article.originalPublishedDate}
                      </Text>
                    </div>
                  </Flex>
                </Flex>

                <Text
                  typography="body1_r_16"
                  color="neutral-60"
                  className={styles.cardDesc}
                >
                  {article.summary}
                </Text>
              </Flex>
            </Flex>
          ))}
        </div>
      )}

      <Flex justify="center">
        {/* 추후 컴포넌트로 교체 */}
        <button className={styles.moreBtn}>
          <Text typography="sub3_m_16" color="neutral-60">
            아티클 더보기
          </Text>
        </button>
      </Flex>
    </Flex>
  );
}
