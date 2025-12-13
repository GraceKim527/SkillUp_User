// src/app/profile/edit/page.tsx

"use client";

import ProfileEditPageLayout from "./ProfileEditPageLayout";
import { useUser } from "@/hooks/useUser";

export default function ProfileEditPage() {
  const { data: userData, isLoading: isLoadingUser } = useUser();

  // 추후 스켈레톤 로딩 나오면 추가
  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div style={{ paddingTop: "6rem" }}>
      <ProfileEditPageLayout initialData={userData}/>
    </div>
  );
}
