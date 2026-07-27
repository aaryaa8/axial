const BASE = import.meta.env.BASE_URL;

interface Props {
  current: "company" | "read";
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
        <a className={current === "read" ? "is-current" : ""} href={`${BASE}read/`}>
          Read
        </a>
      </div>
    </nav>
  );
}
