// src/app/conference/layout.tsx

import Header from "@/components/common/Header";

export default function ConferenceLayout({
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
