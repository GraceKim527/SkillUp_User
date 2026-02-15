// src/app/article/ArticlePageLayout.tsx

"use client";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import EventHeader from "@/components/events/EventHeader";
import RoleSelector from "@/components/events/filters/RoleSelector";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import styles from "./styles.module.css";
import ArticleCard from "@/components/events/ArticleCard";
import Pagination from "@/components/common/Pagination";
import { useSearchArticles } from "@/hooks/queries/useArticle";
import Text from "@/components/common/Text";
import { Article } from "@/types/article";
import { JOB_CATEGORY } from "@/constants/category";

function ArticlePageSkeleton() {
  return (
    <Flex direction="column" gap="20px" style={{ width: "100%" }}>
      {/* 헤더 스켈레톤 */}
      <Flex direction="column" gap="24px">
        <Flex gap="16px" align="center">
          <Skeleton width="194px" height="36px" borderRadius="100px" />
          <Skeleton width="121px" height="20px" borderRadius="100px" />
        </Flex>
        <Flex gap="8px">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} width="80px" height="40px" borderRadius="100px" />
          ))}
        </Flex>
      </Flex>

      {/* 카드 그리드 스켈레톤 */}
      <Flex direction="column" gap="60px">
        {[0, 1, 2].map((row) => (
          <Flex key={row} gap="12px">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.skeletonCard}>
                <Skeleton height="212px" width="100%" borderRadius="8px 8px 0 0" />
                <Flex direction="column" gap="12px" style={{ padding: "16px" }}>
                  <Flex direction="column" gap="4px">
                    <Skeleton width="103px" height="24px" borderRadius="100px" />
                    <Skeleton width="100%" height="36px" borderRadius="100px" />
                  </Flex>
                  <Flex direction="column" gap="6px">
                    <Skeleton width="224px" height="18px" borderRadius="100px" />
                    <Skeleton width="180px" height="18px" borderRadius="100px" />
                  </Flex>
                </Flex>
              </div>
            ))}
          </Flex>
        ))}
      </Flex>

      {/* 페이지네이션 스켈레톤 */}
      <Flex justify="center" align="center" gap="60px" style={{ marginTop: "40px" }}>
        <Skeleton width="40px" height="40px" borderRadius="100px" />
        <Flex gap="8px" align="center">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width="40px" height="40px" borderRadius="4px" />
          ))}
        </Flex>
        <Skeleton width="40px" height="40px" borderRadius="100px" />
      </Flex>
    </Flex>
  );
}

export default function ArticlePageLayout() {
  const { selectedRoles, setSelectedRoles, currentPage, setCurrentPage } =
    usePageFilters({
      pageId: "article",
    });

  // selectedRoles 배열에서 첫 번째 역할만 사용 (ALL이 아닌 경우)
  const selectedTab =
    selectedRoles.length > 0 && selectedRoles[0] !== JOB_CATEGORY.ALL
      ? selectedRoles[0]
      : undefined;

  const { data, isLoading, error } = useSearchArticles(
    undefined,
    currentPage - 1, // API는 0부터 시작
    selectedTab
  );

  const articles = data?.articles || [];
  const totalCount = data?.totalArticles || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <div className={styles.container}>
      <Flex direction="column" gap={1.25}>
        <Flex direction="column" gap={1.5}>
          <EventHeader title="아티클" count={totalCount} isArticle={true} />
          <RoleSelector
            selected={selectedRoles}
            onSelect={setSelectedRoles}
          />
        </Flex>
        <Flex direction="column" gap={3.75}>
          {isLoading ? (
            <ArticlePageSkeleton />
          ) : error ? (
            <Flex
              justify="center"
              align="center"
              style={{ minHeight: "300px" }}
            >
              <Text typography="body1_r_16" color="neutral-60">
                데이터를 불러오는데 실패했습니다.
              </Text>
            </Flex>
          ) : articles.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              style={{ minHeight: "300px" }}
            >
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
              />
            </>
          )}
        </Flex>
      </Flex>
    </div>
  );
}
