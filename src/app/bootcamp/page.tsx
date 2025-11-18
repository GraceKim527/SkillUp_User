// src/app/bootcamp/page.tsx

import BootcampPageLayout from "./BootcampPageLayout";
import { getEventList } from "@/api/events";

export default async function page() {
  // SSR: 초기 데이터 서버에서 로드
  const initialEventList = await getEventList({
    category: "BOOTCAMP_CLUB",
    sort: "latest",
    page: 1,
  });

  return (
    <div style={{ paddingTop: "6rem" }}>
      <BootcampPageLayout initialEventList={initialEventList} />
    </div>
  );
}
