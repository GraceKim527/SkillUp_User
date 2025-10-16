// src/app/conference/page.tsx

import ConferencePageLayout from "./ConferencePageLayout";
import { getMockEventList } from "@/mocks/eventListMock";

export default async function page() {
  // 목업 데이터
  const eventList = await getMockEventList();
  return (
    <div style={{ marginTop: "6rem" }}>
      <ConferencePageLayout eventList={eventList} />
    </div>
  );
}
