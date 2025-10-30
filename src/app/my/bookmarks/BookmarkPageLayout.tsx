// src/app/my/bookmarks/BookmarkPageLayout.tsx

import styles from "./styles.module.css";
import ProfileCard from "@/components/myPage/bookmarks/ProfileCard";
export default function BookmarkPageLayout() {
  return (
    <div className={styles.bookmarkPageLayout}>
      <ProfileCard />
    </div>
  );
}
