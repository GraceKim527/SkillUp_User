// src/app/hackathon/page.tsx

import HackathonPageLayout from "./HackathonPageLayout";
import { getEventList } from "@/api/events";

export default async function HackathonPage() {
  // SSR: 초기 데이터 서버에서 로드
  const initialEventList = await getEventList({
    category: "COMPETITION_HACKATHON",
    sort: "latest",
    page: 1,
  });

  return (
    <div style={{ paddingTop: "6rem" }}>
      <HackathonPageLayout initialEventList={initialEventList} />
    </div>
  );
}
