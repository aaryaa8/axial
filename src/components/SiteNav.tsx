const BASE = import.meta.env.BASE_URL;

interface Props {
  current: "company" | "read" | "map" | "about";
}

export default function SiteNav({ current }: Props) {
  return (
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
        <a className={current === "read" ? "is-current" : ""} href={`${BASE}read/`}>
          Read
        </a>
        <a className={current === "about" ? "is-current" : ""} href={`${BASE}about/`}>
          About
        </a>
      </div>
    </nav>
  );
}
