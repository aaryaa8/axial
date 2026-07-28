import { useState } from "react";
import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import AxialMapPublic, { type Placed } from "./components/AxialMapPublic";
import { DOMAINS, SKILLS, LINKS } from "./data/mapPublic";

export default function MapApp() {
  useReveal();
  const [open, setOpen] = useState<Placed | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="map" />

      <section className="section section--wide map-page">
        <div className="section-head">
          <h2 className="section-title">The map</h2>
          <p className="section-standfirst">
            Every skill Axial models, and every dependency between them. Points
            sit near the domain they belong to, and the most connected skills sit
            closest to the centre. Hover a point to read the skill, click it to
            open the detail.
          </p>
        </div>

        <div className="map-page-grid">
          <AxialMapPublic onOpen={setOpen} />

          <aside className="map-panel">
            {open ? (
              <>
                <span className="map-panel-domain">{DOMAINS[open.domain].short}</span>
                <h3 className="map-panel-name">{open.name}</h3>
                <p className="map-panel-meta">
                  Connected to <b>{open.degree}</b> other{" "}
                  {open.degree === 1 ? "skill" : "skills"} in the map.
                </p>

                <div className="map-blur">
                  <div className="map-blur-text" aria-hidden="true">
                    <span /><span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="map-blur-over">
                    <p>What this skill means, and how a weakness here shows up in a child's work.</p>
                  </div>
                </div>

                {sent ? (
                  <p className="map-panel-thanks">
                    You are on the list. We will be in touch as this opens up.
                  </p>
                ) : (
                  <form className="map-panel-form" onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSent(true); }}>
                    <input type="email" required placeholder="you@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)} aria-label="Your email" />
                    <button className="btn btn-primary" type="submit">Join the waitlist to read it</button>
                  </form>
                )}
              </>
            ) : (
              <>
                <h3 className="map-panel-name">{SKILLS.length} skills, {LINKS.length} connections</h3>
                <p className="map-panel-meta">
                  The connections are what make this a map instead of a list. They
                  record which skill carries which, so Axial can find the one
                  weakness underneath that explains several others.
                </p>
                <p className="map-panel-meta">Click any point to open a skill.</p>
              </>
            )}
          </aside>
        </div>

        <p className="map-note">
          This view shows the structure of the model. The definitions behind each
          skill and the research behind each connection stay inside Axial.
        </p>
      </section>

      <footer className="footer">
        <div className="footer-mark">Axial</div>
        <p className="footer-line">A model of how a child learns.</p>
        <p className="footer-fine">
          The cognitive engine, the full taxonomy and the research behind Axial
          are proprietary. This page shows what the method produces.
        </p>
      </footer>
    </div>
  );
}
