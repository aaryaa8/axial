import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import DomainConstellation from "./components/DomainConstellation";
import { useState } from "react";
import { STEPS, BRING, GROWTH, WHO, IN_EDUCATION, BEYOND } from "./data/about";

const BASE = import.meta.env.BASE_URL;

function List({ items }: { items: { t: string; d: string; soon?: boolean }[] }) {
  return (
    <div className="ab-list">
      {items.map((i) => (
        <div className="ab-item" key={i.t}>
          <h3 className="ab-item-t">
            {i.t}
            {i.soon && <span className="ab-soon">Coming soon</span>}
          </h3>
          <p className="ab-item-d">{i.d}</p>
        </div>
      ))}
    </div>
  );
}

export default function AboutApp() {
  useReveal();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <SiteNav current="about" />

      {/* 1 — hero */}
      <header className="section ab-hero">
        <span className="ab-eyebrow">Learning that fits how your child thinks</span>
        <h1 className="ab-h1">
          <span className="ab-h1-light">Stop teaching the way you were told.</span>
          <span className="ab-h1-bold">Start teaching the way your child thinks.</span>
        </h1>
        <p className="ab-lede">
          Axial maps how a child's mind actually works, then builds the teaching
          around it. Learning that fits how they think, so it stops feeling like
          a fight.
        </p>
        <a className="ab-jump" href="#reframe">See how it works ↓</a>
      </header>

      {/* 2 — reframe */}
      <section className="section ab-center" id="reframe">
        <span className="ab-eyebrow">Why Axial exists</span>
        <h2 className="ab-h2">
          <span className="ab-h1-light">The problem was never the child.</span>
          <span className="ab-h1-bold">It was the one-size-fits-all approach.</span>
        </h2>
        <p className="ab-lede ab-lede--center">
          Axial starts from a simple flip. Stop asking the child to adapt to the
          system, and build a system that adapts to the child.
        </p>
      </section>

      {/* 3 — what Axial shows you */}
      <section className="section">
        <span className="ab-eyebrow">What you will see</span>
        <h2 className="ab-h2">
          <span className="ab-h1-light">What Axial shows you</span>
          <span className="ab-h1-bold">about how your child learns.</span>
        </h2>
        <p className="ab-lede">
          From a few short sessions of reading and play, you get a personal map of
          how their mind handles learning. No score and no label, just a picture you can act on.
        </p>

        <div className="ab-split">
          <div className="hero-figure">
            <DomainConstellation center="how a child thinks" showExamples={false} />
          </div>
          <div>
            <span className="ab-eyebrow">The map itself</span>
            <h3 className="ab-h3">
              <span className="ab-h1-light">Six domains,</span>
              <span className="ab-h1-bold">one connected picture.</span>
            </h3>
            <p className="ab-item-d">
              Every skill Axial measures sits inside one of six domains of
              thinking, feeling and relating. The links between them are what
              show which weakness is causing which.
            </p>
            <a className="ab-arrow" href={`${BASE}map/`}>Explore the full map →</a>
          </div>
        </div>
      </section>

      {/* 4 — how it works */}
      <section className="section">
        <span className="ab-eyebrow">How it works</span>
        <h2 className="ab-h2"><span className="ab-h1-bold">Three steps to the map.</span></h2>
        <div className="ab-steps">
          {STEPS.map((s) => (
            <div className="ab-step" key={s.n}>
              <span className="ab-step-n">{s.n}</span>
              <h3 className="ab-item-t">{s.t}</h3>
              <p className="ab-item-d">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="ab-compare">
          <h3 className="ab-h3"><span className="ab-h1-bold">What hyper-personalisation means</span></h3>
          <div className="ab-compare-grid">
            <div>
              <span className="ab-eyebrow">Personalisation</span>
              <p className="ab-item-d">tailors to the subject and the goal.</p>
            </div>
            <div>
              <span className="ab-eyebrow ab-eyebrow--ink">Hyper-personalisation</span>
              <p className="ab-item-d">tailors to how the mind actually works.</p>
            </div>
          </div>
          <p className="ab-lede">
            That is why two children stuck on the very same thing can get
            opposite plans. What fixes it for one would hold the other back.
          </p>
        </div>
      </section>

      {/* 5 — bring what you're stuck on */}
      <section className="section">
        <span className="ab-eyebrow">Bring your own work</span>
        <span className="status-tag is-wip ab-status">Coming soon</span>
        <h2 className="ab-h2">
          <span className="ab-h1-light">Bring what they are</span>
          <span className="ab-h1-bold">actually stuck on.</span>
        </h2>
        <p className="ab-lede">
          Share the real thing they are working on, and Axial tailors its help to
          their profile and to that specific task. A few examples of what parents
          bring:
        </p>
        <List items={BRING} />
      </section>

      {/* 6 — it grows with you */}
      <section className="section">
        <span className="ab-eyebrow">Over time</span>
        <h2 className="ab-h2"><span className="ab-h1-bold">It grows with them.</span></h2>
        <List items={GROWTH} />
      </section>

      {/* 7 — credibility band */}
      <section className="ab-band">
        <div className="ab-band-inner">
          <span className="ab-eyebrow ab-eyebrow--light">The science underneath</span>
          <p className="ab-band-text">
            Built on sixty years of cognitive science. Axial maps the cognitive
            skills that shape how a child learns, and how they fit together,
            drawn from the research psychologists use to understand how people
            think and learn.
          </p>
          <a className="ab-arrow ab-arrow--light" href={`${BASE}read/#science`}>See the science →</a>
        </div>
      </section>

      {/* 8 — who it's for */}
      <section className="section">
        <span className="ab-eyebrow">Who it is for</span>
        <h2 className="ab-h2">
          <span className="ab-h1-light">Made for children.</span>
          <span className="ab-h1-bold">Useful to everyone helping them.</span>
        </h2>
        <List items={WHO} />
      </section>

      {/* 9 — applications */}
      <section className="section">
        <span className="ab-eyebrow">Expanding scope</span>
        <h2 className="ab-h2">
          <span className="ab-h1-light">One map, many</span>
          <span className="ab-h1-bold">ways to use it.</span>
        </h2>
        <p className="ab-lede">
          Axial started with reading, because that is where the mismatch shows up
          first and hurts most. The same map works anywhere learning and focus
          matter.
        </p>

        <h3 className="ab-sub">In education</h3>
        <List items={IN_EDUCATION} />
        <h3 className="ab-sub ab-sub--gap">Beyond the classroom</h3>
        <List items={BEYOND} />
      </section>

      {/* 10 — closing */}
      <section className="section ab-center">
        <h2 className="ab-h2">
          <span className="ab-h1-light">See how your child's mind</span>
          <span className="ab-h1-bold">actually works.</span>
        </h2>
        <p className="ab-lede ab-lede--center">
          Axial Read is live as a demo. Join the waitlist to be first in as the
          rest opens up.
        </p>

        {sent ? (
          <p className="ab-thanks">You are on the list. Thank you for believing in this early.</p>
        ) : (
          <form
            className="ab-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSent(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Your email"
            />
            <button className="btn btn-primary" type="submit">Join the waitlist</button>
          </form>
        )}

        <div className="hero-cta ab-cta">
          <a className="btn btn-ghost" href={`${BASE}read/`}>See the reading tutor</a>
          <a className="btn btn-ghost" href={`${BASE}products/`}>All products</a>
        </div>
        <p className="ab-fine">
          Built by{" "}
          <a className="bio-link" href="https://www.linkedin.com/in/aaryaa-kamdar/" target="_blank" rel="noreferrer">
            Aaryaa Kamdar
          </a>
          , who trained in architecture and data science at the Architectural
          Association in London, then studied cognitive neuroscience and
          completed a master's in innovation management and entrepreneurship at
          Brown University. Axial is looking for a founding partner with go to
          market and sales partnerships experience.{" "}
          <a href="mailto:aaryaa.kamdar@gmail.com">Get in touch</a>.
        </p>
      </section>

      <footer className="footer">
        <div className="footer-mark">Axial</div>
        <p className="footer-line">A model of how a child learns.</p>
        <p className="footer-fine">
          The cognitive engine, the full taxonomy and the research behind Axial
          are proprietary. This site shows what the method produces.
        </p>
      </footer>
    </div>
  );
}
