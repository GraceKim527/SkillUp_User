// 지금 주목받고 있어요
import { useMemo, useState } from "react";
import EventCard from "@/components/common/Card";
import { dummyEvents } from "../recommend-deadline/dummyData";
import globalStyles from "../style.module.css";
import localStyles from "./style.module.css";
import TabMenu from "@/components/common/Tab";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";

export default function RecommendNow() {

  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(dummyEvents.length / PAGE_SIZE));

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return dummyEvents.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  const prev = () => setCurrentPage(p => Math.max(1, p - 1));
  const next = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <section className={`${globalStyles.recommend} ${localStyles.nowSection}`}>
      <div className={globalStyles.sectionHead}>
        <div className={globalStyles.titles}>
          <p className={globalStyles.subTitle}>추천행사</p>
          <h2 className={globalStyles.title}>
            지금 <span className={globalStyles.titleSpan}>주목받고 있어요</span>
          </h2>
        </div>

        <TabMenu
          tabs={["전체", "기획", "디자인", "개발", "AI"]}
          defaultIndex={0}
          onChange={() => setCurrentPage(1)}
          theme="light"
        />
      </div>

      <div className={globalStyles.cardList}>
        {pageData.map((item) => (
          <EventCard key={item.id} size="large" {...item} />
        ))}
      </div>

      {/* 하단 네비 + 더보기 링크 */}
      <div className={localStyles.bottomRow}>
        <div className={localStyles.arrowGroup}>
          <button
            type="button"
            className={`${localStyles.arrowBtn} ${localStyles.lightBtn}`}
            onClick={prev}
            // disabled={currentPage === 1}
            aria-label="이전"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${localStyles.arrowBtn} ${localStyles.darkBtn}`}
            onClick={next}
            // disabled={currentPage === totalPages}
            aria-label="다음"
          >
            <ChevronRightIcon />
          </button>
        </div>

        <div className={localStyles.moreBox}>
          <button className={localStyles.moreBtn}>최근 본 행사 더보기</button>
        </div>
      </div>
    </section>
  );
}