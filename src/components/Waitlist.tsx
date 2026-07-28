import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="section waitlist" id="waitlist">
      <div className="waitlist-card">
        <h2 className="waitlist-title">Early access for your child</h2>
        <p className="waitlist-sub">
          Axial is in early development. Leave your email and we will reach out
          as the first reading tutor opens up.
        </p>

        {sent ? (
          <p className="waitlist-thanks">
            You are on the list. Thank you for believing in this early.
          </p>
        ) : (
          <form
            className="waitlist-form"
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
            <button className="btn btn-primary" type="submit">
              Request early access
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
