import Link from "next/link";
import { FaRegBookmark, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./style.module.css";
import Button from "@/components/common/Button";

export interface EventCardProps {
  title: string;
  category: string;
  date: string;
  location: string;
  price: string;
  dday: string;
  isFree?: boolean;
  size?: "large" | "middle" | "small";
}

const EventCard = ({
  title,
  category,
  date,
  location,
  price,
  dday,
  isFree = false,
  size = "large",
}: EventCardProps) => {
  const isMiddle = size === "middle";
  const isSmall = size === "small";

  return (
    <div
      className={`${styles.card} ${
        isMiddle ? styles.card_middle : isSmall ? styles.card_small : styles.card_large
      }`}
    >
      {/* 이미지 박스 */}
      <div className={styles.imgBox}>
        <span className={styles.dday}>{dday}</span>
        <Button
          variant="secondary"
          opacity={0.6}
          icon={<FaRegBookmark />}
          className={styles.bookmarkBtn}
        />
      </div>

      {/* 내용 영역 */}
      <div className={styles.cardBody}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.infoRow}>
          <FaRegCalendarAlt className={styles.icon} />
          <p>{date}</p>
        </div>

        <div className={styles.infoRow}>
          <FaMapMarkerAlt className={styles.icon} />
          <p>{location}</p>
        </div>

        <div className={styles.priceGroup}>
          {/* small일 때 */}
          {!isSmall && (
            <div className={styles.priceWrap}>
              {isFree ? (
                <>
                  <p className={styles.price}>0원</p>
                  <span className={styles.freeTag}>무료</span>
                </>
              ) : (
                <p className={styles.price}>{price}</p>
              )}
            </div>
          )}

          {/* middle일 때 */}
          {!isMiddle && (
            <Link href="#" className={styles.detailBtn}>
              자세히 보기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;