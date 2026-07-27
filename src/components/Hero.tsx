export default function Hero() {
  return (
    <header className="hero section">
      <div className="hero-inner">
        <div className="eyebrow">
          <span className="eyebrow-mark">Axial</span>
          <span className="eyebrow-sep" />
          a reading tutor for young children
        </div>

        <h1 className="hero-title">
          It learns how your child <em>thinks</em>.
          <br />
          Then it teaches her to read.
        </h1>

        <p className="hero-lede">
          The best education has always been one-on-one tutoring. What makes a
          great tutor great is subtle: over months, they come to know a
          child’s mind, and they teach from it. We built that model first.
        </p>

        <p className="hero-definer">
          Axial is a model of how a child learns. The first tutor we built on it
          teaches reading.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href="#demo">
            Watch it read a child’s mind
          </a>
          <a className="btn btn-ghost" href="#waitlist">
            Join the waitlist
          </a>
        </div>

        <p className="hero-foot">
          Built at Brown. Grounded in cognitive science. Every decision it
          makes can be traced to something it observed.
        </p>
      </div>

      <aside className="epigraph">
        <p>
          “It taught her to read, and then to think, to reason, and to
          grapple with the hardest questions. As she grew, it grew too.”
        </p>
        <span className="epigraph-cite">
          on the Primer, <i>The Diamond Age</i>
        </span>
      </aside>
    </header>
  );
}
