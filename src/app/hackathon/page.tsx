// src/app/hackathon/page.tsx

import HackathonPageLayout from "./HackathonPageLayout";
import { getMockEventList } from "@/mocks/eventListMock";

export default async function HackathonPage() {
  const eventList = await getMockEventList();
  return (
    <div style={{ marginTop: "6rem" }}>
      <HackathonPageLayout eventList={eventList} />
    </div>
  );
}
