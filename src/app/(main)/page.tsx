import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getRecommendedEvents,
  getFeaturedEvents,
  getEndingSoonEvents,
  getBanners,
} from "@/api/home";
import { JOB_CATEGORY } from "@/constants/category";
import MainVisual from "@/components/mainSection/MainVisual";
import RecommendNow from "@/components/mainSection/RecommendNow";
import RecommendInterest from "@/components/mainSection/RecommendInterest";
import RecommendDeadline from "@/components/mainSection/RecommendDeadline";
import RecentEvents from "@/components/mainSection/RecentEvents";
import MiddleBanner from "@/components/mainSection/MiddleBanner";
import Club from "@/components/mainSection/Club";
import RecommendContents from "@/components/mainSection/RecommendContents";
import Bootcamp from "@/components/mainSection/Bootcamp";
import IconMenu from "@/components/mainSection/MainVisual/IconMenu";
// import NewsletterCTA from "@/components/mainSection/NewsletterCTA";

export default async function Home() {
  const queryClient = new QueryClient();
  const isAuthenticated = false; // 서버 prefetch는 비로그인 상태로

  // 초기 화면(Above the fold)에 필요한 데이터만 prefetch
  // 나머지는 클라이언트에서 로드하여 빌드 타임아웃 방지
  await Promise.all([
    // 배너 (최상단)
    queryClient.prefetchQuery({
      queryKey: ["home", "banners", isAuthenticated],
      queryFn: () => getBanners(isAuthenticated),
    }),

    // 인기/추천 행사 (지금 주목받고 있어요)
    queryClient.prefetchQuery({
      queryKey: [
        "home",
        "featured",
        { isAuthenticated, category: JOB_CATEGORY.ALL, size: undefined },
      ],
      queryFn: () => getFeaturedEvents(isAuthenticated, JOB_CATEGORY.ALL),
    }),

    // 해시태그 기반 추천 행사 (관심있어하실 행사)
    queryClient.prefetchQuery({
      queryKey: ["home", "recommended", isAuthenticated],
      queryFn: () => getRecommendedEvents(isAuthenticated),
    }),

    // 곧 종료되는 행사 (신청 마감 행사)
    queryClient.prefetchQuery({
      queryKey: ["home", "ending-soon", { isAuthenticated, size: 8 }],
      queryFn: () => getEndingSoonEvents(isAuthenticated, 8),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainVisual />
      <IconMenu />

      {/* main */}
      <main id="container">
        {/* 추천 행사 - 지금 주목받고 있어요 */}
        <RecommendNow />
        {/* 추천 행사 - 관심있어하실 행사 */}
        <RecommendInterest />
        {/* 추천 행사 - 신청 마감 행사 */}
        <RecommendDeadline />
        {/* 추천 컨텐츠 */}
        <RecommendContents />
        {/* 미들배너 */}
        <MiddleBanner />
        {/* 최근 본 행사 */}
        <RecentEvents />
        {/* 부트캠프 */}
        <Bootcamp />
        {/* 동아리, 해커톤, 공모전 */}
        <Club />
        {/* 뉴스레터 CTA */}
        {/* <NewsletterCTA /> */}
      </main>
    </HydrationBoundary>
  );
}
