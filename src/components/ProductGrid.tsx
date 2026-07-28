import type { Product } from "../data/products";

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className={`tiles tiles--${items.length === 2 ? "2" : "3"}`}>
      {items.map((p) => (
        <div className={`tile ${p.live ? "" : "tile--soon"}`} key={p.name}>
          <span className={`status-tag ${p.live ? "is-done" : "is-wip"}`}>{p.status}</span>
          <h3 className="tile-title">{p.name}</h3>
          <p className="tile-body">{p.body}</p>
          {p.href && (
            <a className="product-cta" href={p.href}>
              {p.cta} <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
