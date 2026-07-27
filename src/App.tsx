import { useEffect } from "react";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ReadingDemo from "./components/ReadingDemo";
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
      <Hero />
      <HowItWorks />

      <section className="section demo" id="demo">
        <div className="section-head">
          <span className="section-kicker">See it work</span>
          <h2 className="section-title">
            Watch Axial read a child’s mind, live.
          </h2>
          <p className="section-standfirst">
            Maya is six. She reads three words aloud. Follow what Axial hears,
            what it works out, and how it changes its teaching in response.
          </p>
        </div>
        <ReadingDemo />
      </section>

      <ExpandSkills />
      <Vision />
      <Waitlist />
      <Footer />
    </div>
  );
}
