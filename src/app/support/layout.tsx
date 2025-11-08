// src/app/support/layout.tsx

import Header from "@/components/common/Header";

export default function SupportLayout({
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
