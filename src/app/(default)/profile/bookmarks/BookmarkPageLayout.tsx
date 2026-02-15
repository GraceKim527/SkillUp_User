// src/app/profile/bookmarks/BookmarkPageLayout.tsx

"use client";

import EventCard from "@/components/common/EventCard";
import styles from "./styles.module.css";
import ProfileCard from "@/components/myPage/bookmarks/ProfileCard";
import Pagination from "@/components/common/Pagination";
import Dropdown from "@/components/common/Dropdown";
import TabBar from "@/components/common/TabBar";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import BookmarkEmpty from "@/components/myPage/bookmarks/BookmarkEmpty";
import { useBookmarkPage } from "@/hooks/useBookmarkPage";

// BookmarkEmpty 컴포넌트를 반환하는 헬퍼 함수
const renderEmptyState = () => (
  <BookmarkEmpty
    title="저장한 행사가 없습니다"
    description={
      <div style={{ textAlign: "center" }}>
        관심 있는 행사를 북마크하여 <br />
        나만의 행사 목록을 만들어보세요
      </div>
    }
    url="/conference"
    buttonText="행사 둘러보기"
  />
);

export default function BookmarkPageLayout() {
  const {
    bookmarkData,
    isLoading,
    error,
    activeTabIndex,
    selectedSort,
    currentPage,
    selectedPageOption,
    eventList,
    totalPages,
    pageOptions,
    sortOptions,
    handleTabChange,
    handleSortChange,
    handlePageChange,
    handleDropdownSelect,
  } = useBookmarkPage();

  if (isLoading) {
    return (
      <Flex gap={1} className={styles.container}>
        {/* 왼쪽 프로필 사이드바 스켈레톤 */}
        <div className={styles.skeletonProfileCard}>
          <Flex direction="column" gap="1.25rem" style={{ width: "100%" }}>
            <Flex direction="column" gap="1rem" style={{ width: "100%" }}>
              {/* 프로필 헤더 */}
              <Flex
                gap="0.5rem"
                align="center"
                style={{
                  width: "100%",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid var(--Line-neutral, #e1e1e1)",
                }}
              >
                <Skeleton width="36px" height="36px" borderRadius="100px" />
                <Flex direction="column" gap="0.375rem">
                  <Skeleton width="100px" height="22px" borderRadius="100px" />
                  <Skeleton width="121px" height="12px" borderRadius="100px" />
                </Flex>
              </Flex>
              {/* 메뉴 항목들 */}
              <Flex direction="column" style={{ width: "100%" }}>
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ padding: "0.4375rem 0", width: "100%" }}
                >
                  <Skeleton width="60px" height="20px" borderRadius="100px" />
                  <Skeleton width="60px" height="20px" borderRadius="100px" />
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ padding: "0.4375rem 0", width: "100%" }}
                >
                  <Skeleton width="60px" height="20px" borderRadius="100px" />
                  <Skeleton width="60px" height="20px" borderRadius="100px" />
                </Flex>
              </Flex>
            </Flex>
            {/* 버튼 */}
            <Skeleton width="100%" height="40px" borderRadius="8px" />
          </Flex>
        </div>

        {/* 오른쪽 콘텐츠 영역 스켈레톤 */}
        <Flex direction="column" gap="1.25rem" className={styles.cardListContainer}>
          {/* 헤더: 탭 + 드롭다운 */}
          <Flex justify="space-between" align="center" style={{ width: "100%" }}>
            <Flex gap="0.5rem">
              <Skeleton width="120px" height="46px" borderRadius="8px" />
              <Skeleton width="120px" height="46px" borderRadius="8px" />
            </Flex>
            <Skeleton width="120px" height="38px" borderRadius="8px" />
          </Flex>

          {/* 카드 그리드 */}
          <Flex direction="column" gap="3.75rem">
            {[0, 1, 2].map((row) => (
              <Flex key={row} gap="0.75rem">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.skeletonCard}>
                    <Skeleton width="100%" height="212px" borderRadius="0" />
                    <Flex
                      direction="column"
                      gap="1.75rem"
                      style={{ padding: "1rem" }}
                    >
                      <Flex direction="column" gap="0.75rem" style={{ width: "100%" }}>
                        <Flex direction="column" gap="0.25rem" style={{ width: "100%" }}>
                          <Skeleton
                            width="103px"
                            height="24px"
                            borderRadius="100px"
                          />
                          <Skeleton
                            width="100%"
                            height="36px"
                            borderRadius="100px"
                          />
                        </Flex>
                        <Flex direction="column" gap="0.375rem" style={{ width: "100%" }}>
                          <Skeleton
                            width="224px"
                            height="18px"
                            borderRadius="100px"
                          />
                          <Skeleton
                            width="224px"
                            height="18px"
                            borderRadius="100px"
                          />
                        </Flex>
                      </Flex>
                      <Flex gap="0.5rem" align="center">
                        <Skeleton
                          width="121px"
                          height="28px"
                          borderRadius="100px"
                        />
                        <Skeleton
                          width="28px"
                          height="28px"
                          borderRadius="100px"
                        />
                      </Flex>
                    </Flex>
                  </div>
                ))}
              </Flex>
            ))}
          </Flex>

          {/* 페이지네이션 스켈레톤 */}
          <Flex justify="center" align="center" gap="3.75rem">
            <Skeleton width="40px" height="40px" borderRadius="100px" />
            <Flex gap="0.5rem" align="center">
              <Skeleton width="40px" height="40px" borderRadius="4px" />
              <Skeleton width="40px" height="40px" borderRadius="4px" />
              <Skeleton width="40px" height="40px" borderRadius="4px" />
            </Flex>
            <Skeleton width="40px" height="40px" borderRadius="100px" />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex gap={1} className={styles.container}>
        <ProfileCard
          name={bookmarkData?.name || ""}
          email={bookmarkData?.email || ""}
          job={bookmarkData?.role || ""}
          bookmarkCount={bookmarkData?.bookmarkCount || 0}
        />
        <Flex
          direction="column"
          gap={6.25}
          className={styles.cardListContainer}
        >
          {renderEmptyState()}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex gap={1} className={styles.container}>
      <ProfileCard
        name={bookmarkData?.name || ""}
        email={bookmarkData?.email || ""}
        job={bookmarkData?.role || ""}
        bookmarkCount={bookmarkData?.bookmarkCount || 0}
      />

      <Flex direction="column" gap={6.25} className={styles.cardListContainer}>
        <Flex direction="column" gap={1.25}>
          <Flex align="center" justify="space-between">
            <TabBar
              tabs={[
                {
                  label: "진행 중",
                  count: bookmarkData?.recruitingEvents.length || 0,
                },
                {
                  label: "종료",
                  count: bookmarkData?.closedEvents.length || 0,
                },
              ]}
              activeIndex={activeTabIndex}
              onChange={handleTabChange}
            />
            <Dropdown
              options={sortOptions}
              selected={selectedSort}
              onSelect={handleSortChange}
            />
          </Flex>
          {eventList.length > 0 ? (
            <div className={styles.cardList}>
              {eventList.map((event) => (
                <EventCard key={event.id} size="medium" event={event} />
              ))}
            </div>
          ) : (
            renderEmptyState()
          )}
        </Flex>
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            options={pageOptions}
            selected={selectedPageOption}
            onSelect={handleDropdownSelect}
            goToPage={false}
          />
        )}
      </Flex>
    </Flex>
  );
}
