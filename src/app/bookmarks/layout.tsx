// src/app/my/bookmarks/layout.tsx

import Header from "@/components/common/Header";

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="sub" />
      {children}
    </>
  );
}
