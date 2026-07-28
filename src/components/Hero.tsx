import Tag from "./Tag";

export default function Hero() {
  return (
    <header className="hero section">
      <div className="hero-inner">
        <Tag mark="star">Axial Read</Tag>
        <h1 className="ab-h1">
          <span className="ab-h1-light">A reading tutor that learns</span>
          <span className="ab-h1-bold">how your child thinks.</span>
        </h1>

        <p className="hero-lede">
          The best education has always been one to one tutoring, and what makes
          a great tutor great is subtle. Over months they come to know a child's
          mind, and they teach from it.{" "}
          <strong>We built that model first.</strong>
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href="#demo">
            Watch it read a child's mind
          </a>
          <a className="btn btn-ghost" href="#waitlist">
            Join the waitlist
          </a>
        </div>

        <p className="hero-foot">
          Grounded in cognitive science. Every decision the tutor makes traces
          back to something it observed.
        </p>
      </div>

      <aside className="hero-quote">
        <p>
          “It taught her to read, and then to think, to reason, and to grapple
          with the hardest questions. As she grew, it grew too.”
        </p>
        <span className="hero-quote-cite">on the Primer, The Diamond Age</span>
      </aside>
    </header>
  );
}
