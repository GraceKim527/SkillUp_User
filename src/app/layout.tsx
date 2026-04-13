import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/global.css";
import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: {
    default: "스킬업 - IT 행사 정보 플랫폼",
    template: "%s | 스킬업",
  },
  description:
    "컨퍼런스, 해커톤, 부트캠프, 연합 동아리까지 IT 행사 정보를 한눈에 확인하세요.",
  keywords: [
    "IT 행사",
    "IT 행사 플랫폼",
    "IT 행사 일정",
    "IT 컨퍼런스",
    "IT 세미나",
    "해커톤",
    "공모전",
    "개발자 행사",
    "AI 컨퍼런스",
  ],
  authors: [{ name: "스킬업" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "스킬업 - IT 행사 정보 플랫폼",
    description:
      "컨퍼런스, 해커톤, 부트캠프, 연합 동아리까지 IT 행사 정보를 한눈에 확인하세요.",
    siteName: "스킬업",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "스킬업 - IT 행사 정보 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "스킬업 - IT 행사 정보 플랫폼",
    description:
      "컨퍼런스, 해커톤, 부트캠프, 연합 동아리까지 IT 행사 정보를 한눈에 확인하세요.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TJD9RXKH');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJD9RXKH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
          strategy="beforeInteractive"
        />
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
