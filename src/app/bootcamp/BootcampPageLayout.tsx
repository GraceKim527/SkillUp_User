// src/app/bootcamp/BootcampPageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import EventPageLayout from "@/components/events/EventPageLayout";
import BootcampFilterView from "@/components/events/filters/views/BootcampFilterView";
import { Event } from "@/types/event";
import { useEventList } from "@/hooks/useEventList";
import { createEventSearchParamsAtom } from "@/components/events/filters/atoms/pageFilterAtoms";

export default function BootcampPageLayout({
  initialEventList,
}: {
  initialEventList: Event[];
}) {
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom("bootcamp"),
    []
  );
  const searchParams = useAtomValue(searchParamsAtom);
  const { data: eventList } = useEventList(searchParams, initialEventList);

  return (
    <EventPageLayout
      pageId="bootcamp"
      title="부트캠프"
      eventList={eventList || []}
      FilterView={BootcampFilterView}
      emptyUrl="/bootcamp/create"
    />
  );
}
