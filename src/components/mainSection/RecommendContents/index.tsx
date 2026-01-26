// 추천 콘텐츠
"use client";
import { useState } from "react";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
import Text from "@/components/common/Text";
import { useRecommendedArticles } from "@/hooks/queries/useArticle";
import { Article } from "@/types/article";
import {
  JobCategory,
  JOB_CATEGORY,
  getJobCategoryByLabel,
  getJobCategoryLabel,
  JOB_CATEGORY_TABS,
} from "@/constants/category";
import { useRouter } from "next/navigation";

export default function RecommendedContent() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>(
    JOB_CATEGORY.ALL
  );

  const { data, isLoading, error } = useRecommendedArticles(selectedCategory);
  const articles = data || [];

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
          tabs={JOB_CATEGORY_TABS}
          defaultIndex={JOB_CATEGORY_TABS.indexOf(
            getJobCategoryLabel(selectedCategory)
          )}
          onChange={(selected: string) => {
            const category = getJobCategoryByLabel(selected);
            setSelectedCategory(category);
          }}
          theme="light"
        />
      </Flex>

      {isLoading ? (
        <div className={styles.cardList}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Flex key={i} direction="column" gap="0.75rem">
              <Skeleton height={i === 1 ? "520px" : "220px"} borderRadius="0.75rem" />
              <Skeleton height="1.5rem" width="80%" />
              <Skeleton height="1rem" width="60%" />
            </Flex>
          ))}
        </div>
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
              onClick={() => router.push(article.originalUrl)}
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
                  <Text
                    typography="head4_sb_20"
                    color="black"
                    className={styles.cardTitle}
                  >
                    {article.title}
                  </Text>
                  <Flex align="center" gap="0.5rem">
                    <div className={styles.badge}>
                      <Text typography="label3_m_14" color="neutral-60">
                        {article.source}
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
        <button
          className={styles.moreBtn}
          onClick={() => router.push("/article")}
        >
          <Text typography="sub3_m_16" color="neutral-60">
            아티클 더보기
          </Text>
        </button>
      </Flex>
    </Flex>
  );
}
