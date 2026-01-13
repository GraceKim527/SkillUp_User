import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="wrap">
      <Header variant="sub" />
      {children}
      <Footer />
    </div>
  );
}
