import type { Metadata } from "next";
import "@/styles/global.css";
import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: {
    default: "Skill Up User",
    template: "%s | Skill Up User",
  },
  description: "스킬업 웹 구축 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}