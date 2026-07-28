import { useEffect } from "react";

// Fades each section in as it scrolls into view. Sections start at opacity 0,
// so every page must call this or its content stays invisible.
export default function useReveal() {
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
      { threshold: 0.08 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
}
