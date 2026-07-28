import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL;

interface Props {
  current: "company" | "read" | "map" | "about" | "products";
}

export default function SiteNav({ current }: Props) {
  // a hairline appears only once the bar has something scrolling under it
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sitenav-bar ${stuck ? "is-stuck" : ""}`}>
      <nav className="sitenav">
      <a className="sitenav-mark" href={BASE}>
        Axial
      </a>
      <div className="sitenav-links">
        <a className={current === "company" ? "is-current" : ""} href={BASE}>
          The model
        </a>
        <a className={current === "map" ? "is-current" : ""} href={`${BASE}map/`}>
          The map
        </a>
        <a className={current === "products" || current === "read" ? "is-current" : ""} href={`${BASE}products/`}>
          Products
        </a>
        <a className={current === "about" ? "is-current" : ""} href={`${BASE}about/`}>
          About
        </a>
      </div>
      </nav>
    </div>
  );
}
