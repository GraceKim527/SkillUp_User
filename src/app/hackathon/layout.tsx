// src/app/hackathon/layout.tsx

import Header from "@/components/common/Header";

export default function HackathonLayout({
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
