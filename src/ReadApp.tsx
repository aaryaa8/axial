import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import Tag from "./components/Tag";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ReadingDemo from "./components/ReadingDemo";
import WhyAxial from "./components/WhyAxial";
import Science from "./components/Science";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function App() {
  useReveal();

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="read" />
      <Hero />
      <HowItWorks />

      <section className="section demo" id="demo">
        <div className="section-head">
          <Tag mark="orbit">See it work</Tag>
          <h2 className="ab-h2">
            <span className="ab-h1-light">Watch the tutor work</span>
            <span className="ab-h1-bold">with a six year old.</span>
          </h2>
          <p className="section-standfirst">
            Maya is six years old and reads three words aloud. Follow what Axial
            hears, what it works out, and how it changes its teaching.
          </p>
        </div>
        <ReadingDemo />
      </section>

      <div className="ab-panel">
        <WhyAxial />
      </div>
      <Science />
      <Waitlist />
      <Footer />
    </div>
  );
}
