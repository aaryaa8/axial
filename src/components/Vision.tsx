const HORIZON = [
  { k: "Now", v: "Teaching young children to read, one mind at a time." },
  { k: "Next", v: "Writing and early arithmetic, on the same model." },
  { k: "Over years", v: "The harder things a great tutor teaches: reasoning, judgment, how to think." },
  { k: "For schools", v: "A view for teachers that makes one teacher effective across thirty children." },
];

export default function Vision() {
  return (
    <section className="section vision" id="vision">
      <div className="section-head">
        <h2 className="section-title">Where the model goes after reading</h2>
      </div>

      <p className="vision-lede">
        The model that teaches a six-year-old to read is the same model that
        can grow with her for years. It supports teachers across a whole
        class, and it comes to know one child deeply. That kind of attention has
        always been reserved for the luckiest few, and the point of Axial is to
        give it to every child.
      </p>

      <div className="horizon">
        {HORIZON.map((h) => (
          <div className="horizon-row" key={h.k}>
            <span className="horizon-k">{h.k}</span>
            <span className="horizon-v">{h.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
