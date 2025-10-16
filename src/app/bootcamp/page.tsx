// src/app/bootcamp/page.tsx

import BootcampPageLayout from "./BootcampPageLayout";
import { getMockEventList } from "@/mocks/eventListMock";

export default async function page() {
  const eventList = await getMockEventList();

  return (
    <div style={{ marginTop: "6rem" }}>
      <BootcampPageLayout eventList={eventList} />
    </div>
  );
}
