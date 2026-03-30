// src/app/bootcamp/[id]/page.tsx

import type { Metadata } from "next";
import { getEventDetail } from "@/api/events";
import EventDetailLayout from "@/components/events/detail/EventDetailLayout";
import { EVENT_CATEGORY } from "@/constants/event";
import styles from "./styles.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const eventId = Number(id);

  try {
    const event = await getEventDetail(eventId);

    return {
      title: event.title,
      openGraph: {
        title: event.title,
        description: "지금 바로 상세 내용을 확인해보세요!",
        images: event.thumbnailUrl ? [{ url: event.thumbnailUrl }] : [],
      },
    };
  } catch {
    return {
      title: "스킬업 - IT 행사 정보 플랫폼",
    };
  }
}

export default async function BootcampDetailPage({ params }: PageProps) {
  const { id } = await params;
  const eventId = Number(id);

  return (
    <EventDetailLayout
      eventId={eventId}
      category={EVENT_CATEGORY.BOOTCAMP_CLUB}
      className={styles.bootcampDetailLayout}
    />
  );
}
