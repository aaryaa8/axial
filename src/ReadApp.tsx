import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
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
          <h2 className="section-title">Watch the tutor work with a six year old</h2>
          <p className="section-standfirst">
            Maya is six years old and reads three words aloud. Follow what Axial
            hears, what it works out, and how it changes its teaching.
          </p>
        </div>
        <ReadingDemo />
      </section>

      <WhyAxial />
      <Science />
      <Waitlist />
      <Footer />
    </div>
  );
}
