import { useState } from "react";
import SiteNav from "./components/SiteNav";
import useReveal from "./useReveal";
import DomainConstellation from "./components/DomainConstellation";
import SectionNodeMark, { type MarkVariant } from "./components/SectionNodeMark";
import { STEPS, BRING, GROWTH, WHO, IN_EDUCATION, BEYOND } from "./data/about";

const BASE = import.meta.env.BASE_URL;

function Tag({ mark, dark, children }: { mark: MarkVariant; dark?: boolean; children: React.ReactNode }) {
  return (
    <span className={`ab-tag ${dark ? "ab-tag--dark" : ""}`}>
      <SectionNodeMark variant={mark} size={26} dark={dark} />
      {children}
    </span>
  );
}

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
        <Tag mark="star">Learning that fits how your child thinks</Tag>
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
      <div className="ab-panel">
        <section className="section" id="reframe">
          <Tag mark="triangle">Why Axial exists</Tag>
          <h2 className="ab-h2">
            <span className="ab-h1-light">The problem was never the child.</span>
            <span className="ab-h1-bold">It was the one-size-fits-all approach.</span>
          </h2>
          <p className="ab-lede">
            Most advice assumes every mind works the same way. Read it again,
            make flashcards, just focus. When that fails a child, it is easy for
            them to decide they are bad at reading, or bad at school. Usually
            none of that is true.
          </p>
          <blockquote className="ab-quote">
            Axial starts from a simple flip. Stop asking the child to adapt to
            the system, and build a system that adapts to the child.
          </blockquote>
        </section>
      </div>

      {/* 3 — what Axial shows you */}
      <section className="section">
        <Tag mark="orbit">What you will see</Tag>
        <h2 className="ab-h2">
          <span className="ab-h1-light">What Axial shows you</span>
          <span className="ab-h1-bold">about how your child learns.</span>
        </h2>
        <p className="ab-lede">
          From a few short sessions of reading and play, you get a personal map
          of how their mind handles learning. No score and no label, just a
          picture you can act on.
        </p>

        <div className="ab-split">
          <div className="hero-figure">
            <DomainConstellation center="how a child thinks" showExamples={false} />
          </div>
          <div>
            <Tag mark="cluster">The map itself</Tag>
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
      <div className="ab-panel">
        <section className="section">
          <Tag mark="chain">How it works</Tag>
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
            <div className="ab-compare-grid">
              <div className="ab-compare-cell">
                <span className="ab-compare-k">Personalisation</span>
                <p className="ab-item-d">tailors to the subject and the goal.</p>
              </div>
              <div className="ab-compare-cell ab-compare-cell--on">
                <span className="ab-compare-k">Hyper-personalisation</span>
                <p className="ab-item-d">tailors to how the mind actually works.</p>
              </div>
            </div>
            <blockquote className="ab-quote">
              Two children stuck on the very same thing can get opposite plans.
              What fixes it for one would hold the other back.
            </blockquote>
          </div>
        </section>
      </div>

      {/* 5 — bring what you're stuck on */}
      <section className="section">
        <Tag mark="fork">Bring your own work</Tag>
        <span className="status-tag is-wip ab-status">Coming soon</span>
        <h2 className="ab-h2">
          <span className="ab-h1-light">Bring what they are</span>
          <span className="ab-h1-bold">actually stuck on.</span>
        </h2>
        <p className="ab-lede">
          Share the real thing they are working on, and Axial tailors its help to
          their profile and to that task.
        </p>
        <List items={BRING} />
      </section>

      {/* 6 — it grows with you */}
      <div className="ab-panel">
        <section className="section">
          <Tag mark="pair">Over time</Tag>
          <h2 className="ab-h2"><span className="ab-h1-bold">It grows with them.</span></h2>
          <List items={GROWTH} />
        </section>
      </div>

      {/* 7 — credibility band */}
      <section className="ab-band">
        <div className="ab-band-inner">
          <Tag mark="crossed" dark>The science underneath</Tag>
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
        <Tag mark="cluster">Who it is for</Tag>
        <h2 className="ab-h2">
          <span className="ab-h1-light">Made for children.</span>
          <span className="ab-h1-bold">Useful to everyone helping them.</span>
        </h2>
        <List items={WHO} />
      </section>

      {/* 9 — applications */}
      <section className="section ab-apps">
        <div className="ab-apps-head">
          <div>
            <Tag mark="pair">Applications</Tag>
            <h2 className="ab-h2">
              <span className="ab-h1-light">One map, many</span>
              <span className="ab-h1-bold">ways to use it.</span>
            </h2>
          </div>
          <p className="ab-item-d">
            Axial started with reading, because that is where the mismatch shows
            up first and hurts most. The same map works anywhere learning and
            focus matter.
          </p>
        </div>

        <div className="ab-minilabel">In education</div>
        <div className="ab-cards">
          {IN_EDUCATION.map((a) => (
            <div className="ab-card" key={a.t}>
              <h3 className="ab-card-t">{a.t}</h3>
              <p className="ab-card-d">{a.d}</p>
            </div>
          ))}
        </div>

        <div className="ab-warm">
          <div className="ab-minilabel ab-minilabel--on">Beyond the classroom</div>
          <p className="ab-warm-lede">
            The same map extends past the classroom, to anywhere people have to
            think clearly under pressure: the training room, the clinic, the
            field. Education is where we are starting, and the profile a child
            builds carries into the rest of their life.
          </p>
          <div className="ab-cards">
            {BEYOND.map((a) => (
              <div className="ab-card ab-card--top" key={a.t}>
                <h3 className="ab-card-t">{a.t}</h3>
                <p className="ab-card-d">{a.d}</p>
              </div>
            ))}
          </div>
          <div className="ab-scope">
            <span className="ab-scope-rule" />
            <span className="ab-scope-label">Expanding scope</span>
            <span className="ab-scope-arrow" aria-hidden="true">→</span>
          </div>
        </div>
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
          <form className="ab-form" onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSent(true); }}>
            <input type="email" required placeholder="you@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)} aria-label="Your email" />
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
