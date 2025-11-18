// src/app/mentoring/page.tsx

import MentoringPageLayout from "./MentoringPageLayout";
import { getEventList } from "@/api/events";

export default async function MentoringPage() {
  // SSR: 초기 데이터 서버에서 로드
  const initialEventList = await getEventList({
    category: "NETWORKING_MENTORING",
    sort: "latest",
    page: 1,
  });

  return (
    <div style={{ paddingTop: "6rem" }}>
      <MentoringPageLayout initialEventList={initialEventList} />
    </div>
  );
}
