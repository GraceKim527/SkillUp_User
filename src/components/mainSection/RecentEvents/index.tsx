// 최근 본 행사
import styles from "./style.module.css";
import EventCard from "@/components/common/EventCard";
import { eventListMock } from "@/mocks/eventListMock";

export default function RecentEvent() {
  return (
    <section className={styles.recentEvent} aria-labelledby="recent-title">
      <div className={styles.sectionHead}>
        <div className={styles.titles}>
          <p className={styles.subTitle}>최근 본 행사</p>
          <h2 id="rec-title" className={styles.title}>
            <span className={styles.titleSpan}>관심있게 본</span> 행사를 다시
            만나보세요
          </h2>
        </div>
      </div>

      <div className={styles.cardList}>
        {eventListMock.map((item) => (
          <EventCard key={item.id} size="large" event={item} />
        ))}
      </div>

      <div className={styles.moreBox}>
        <button className={styles.moreBtn}>최근 본 행사 더보기</button>
      </div>
    </section>
  );
}
