// src/app/article/ArticlePageLayout.tsx

"use client";
import Flex from "@/components/common/Flex";
import EventHeader from "@/components/events/EventHeader";
import RoleSelector from "@/components/events/filters/RoleSelector";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import styles from "./styles.module.css";
import ArticleCard from "@/components/events/ArticleCard";
import Pagination from "@/components/common/Pagination";
import { useSearchArticles } from "@/hooks/useArticle";
import Text from "@/components/common/Text";
import { Article } from "@/types/article";

export default function ArticlePageLayout() {
  const { selectedRoles, setSelectedRoles, currentPage, setCurrentPage } =
    usePageFilters({
      pageId: "article",
    });

  const { data, isLoading, error } = useSearchArticles(
    undefined,
    currentPage - 1, // API는 0부터 시작
    selectedRoles
  );

  const articles = data?.articles || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <div className={styles.container}>
      <Flex direction="column" gap={1.25}>
        <Flex direction="column" gap={1.5}>
          <EventHeader title="아티클" count={totalCount} />
          <RoleSelector selected={selectedRoles} onSelect={setSelectedRoles} />
        </Flex>
        <Flex direction="column" gap={3.75}>
          {isLoading ? (
            <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
              <Text typography="body1_r_16" color="neutral-60">
                로딩중...
              </Text>
            </Flex>
          ) : error ? (
            <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
              <Text typography="body1_r_16" color="neutral-60">
                데이터를 불러오는데 실패했습니다.
              </Text>
            </Flex>
          ) : articles.length === 0 ? (
            <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
              <Text typography="body1_r_16" color="neutral-60">
                검색 결과가 없습니다.
              </Text>
            </Flex>
          ) : (
            <>
              <div className={styles.articleGrid}>
                {articles.map((article: Article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                options={[]}
                selected={{ label: "1", value: "1" }}
                onSelect={() => {}}
              />
            </>
          )}
        </Flex>
      </Flex>
    </div>
  );
}
