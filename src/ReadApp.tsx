import { useEffect } from "react";
import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ReadingDemo from "./components/ReadingDemo";
import WhyAxial from "./components/WhyAxial";
import Science from "./components/Science";
import ExpandSkills from "./components/ExpandSkills";
import Vision from "./components/Vision";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".section"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

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
      <ExpandSkills />
      <Vision />
      <Waitlist />
      <Footer />
    </div>
  );
}
