import Image from "next/image";

export default function Home() {
  return (
    <div id="wrap">
      <div id="header">
        <div className="inner"></div>
      </div>

      <main id="container">
        <section className="content">
          <div className="home one">
            <p>hello skill up</p>
          </div>
          <div className="home two"></div>
          <div className="home three"></div>
        </section>
      </main>

      <div id="footer"></div>
    </div>
  );
}
