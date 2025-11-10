// 추천 콘텐츠
import styles from "./style.module.css";
import Button from "@/components/common/Button";
import TabMenu from "@/components/common/Tab";

type Card = {
  id: string;
  title: string;
  desc: string;
  tag?: string;
  date?: string;
};

const mock: Card[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `rec-${i}`,
  title: "메인타이틀",
  desc: "서브타이틀이 들어가면 좋겠어요 서브타이틀이 들어가면 좋아요",
  tag: "툴스",
  date: "2020.01.01",
}));

export default function RecommendedContent() {
  return (
    <section className={styles.RecommendContent} aria-labelledby="rec-title">
      <div className={styles.sectionHead}>
        <div className={styles.titles}>
          <p className={styles.subTitle}>추천 콘텐츠</p>
          <h2 id="rec-title" className={styles.title}>
            실무자를 위한 <span className={styles.titleSpan}>추천 컨텐츠</span>
          </h2>
        </div>

        {/* 탭 메뉴 */}
        <TabMenu
          tabs={["전체", "기획", "디자인", "개발", "AI"]}
          defaultIndex={2}
          onChange={(tab) => console.log("선택된 탭:", tab)}
          theme="light"
        />
      </div>

      <div className={styles.cardList}>
        {mock.map((card, idx) => (
          <article
            key={card.id}
            className={`${styles.card} ${idx === 0 ? styles.heroCard : ""}`}
          >
            <div
              className={`${styles.thumb} ${idx === 0 ? styles.heroThumb : ""}`}
            />

            <div className={styles.meta}>
              <div className={styles.titleRow}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.rightMeta}>
                  <span className={styles.badge}>{card.tag ?? "출처"}</span>
                  <span className={styles.date}>{card.date}</span>
                </div>
              </div>

              <p className={styles.cardDesc} title={card.desc}>
                {card.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.moreBox}>
        <button className={styles.moreBtn}>아티클 더보기</button>
      </div>
    </section>
  );
}
