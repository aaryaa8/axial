import { NODES } from "../data/child";
import { DEPENDENCIES, CITATIONS, EDGE_TYPES, citationById } from "../data/evidence";

function label(id: string) {
  return NODES.find((n) => n.id === id)?.label ?? id;
}

export default function Science() {
  return (
    <section className="section science" id="science">
      <div className="section-head">
        <h2 className="section-title">The research behind every connection in the map</h2>
        <p className="section-standfirst">
          The order Axial teaches in comes from decades of reading research: the
          Simple View of Reading, Scarborough’s Reading Rope, and the five
          components named by the National Reading Panel. Each dependency in the
          map above carries its evidence. What follows is that slice, with
          sources.
        </p>
      </div>

      <div className="evidence-table">
        {DEPENDENCIES.map((d) => (
          <div className="evidence-row" key={`${d.from}-${d.to}`}>
            <div className="evidence-link">
              <span className="evidence-from">{label(d.from)}</span>
              <span className="evidence-arrow" aria-hidden="true">→</span>
              <span className="evidence-to">{label(d.to)}</span>
              <span className={`evidence-type evidence-type--${d.type}`}>
                {EDGE_TYPES[d.type].label}
              </span>
            </div>
            <p className="evidence-claim">{d.claim}</p>
            <div className="evidence-sources">
              {d.cites.map((id) => (
                <span className="evidence-source" key={id}>
                  {citationById(id)?.short}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <details className="refs">
        <summary>Full references</summary>
        <ol className="refs-list">
          {CITATIONS.map((c) => (
            <li key={c.id}>{c.ref}</li>
          ))}
        </ol>
      </details>
    </section>
  );
}
