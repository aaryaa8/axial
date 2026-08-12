import { useState } from "react";

// Where a submitted address actually goes. Configured at build time so the
// form can be pointed at a real collector without a code change.
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

// The fallback when there is no collector, or when the collector is down. It
// exists so an interested parent is never left with nowhere to go.
const FALLBACK = "aaryaa.kamdar@gmail.com";

type Status = "idle" | "sending" | "sent" | "unsent";

/**
 * The waitlist form.
 *
 * This used to call `setSent(true)` on submit and nothing else. A parent typed
 * their address, read "You are on the list. Thank you for believing in this
 * early", and was on no list: the address went into React state and was
 * discarded on unload. No request was ever made, because there was nothing to
 * make one to.
 *
 * That is worse than a form that visibly fails. A visible failure loses the
 * lead and the person knows it; a false confirmation loses the lead and tells
 * them a comforting thing that is not true, on a page whose entire argument is
 * that this product will tell you the truth about your child.
 *
 * So the rule this component now follows: **the thank-you only appears after a
 * server has accepted the address.** Every other outcome says so plainly and
 * offers a route that does work.
 */
export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const address = email.trim();
    if (!address) return;

    // No collector configured. Say so rather than pretending.
    if (!ENDPOINT) {
      setStatus("unsent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, source: "read" }),
      });
      setStatus(res.ok ? "sent" : "unsent");
    } catch {
      setStatus("unsent");
    }
  }

  return (
    <section className="section waitlist" id="waitlist">
      <div className="waitlist-card">
        <h2 className="ab-h2 waitlist-title">
          <span className="ab-h1-light">Early access</span>
          <span className="ab-h1-bold">for your child.</span>
        </h2>
        <p className="waitlist-sub">
          Axial is in early development. Leave your email and we will reach out
          as the first reading tutor opens up.
        </p>

        {status === "sent" && (
          <p className="waitlist-thanks">
            You are on the list. Thank you for believing in this early.
          </p>
        )}

        {status === "unsent" && (
          <p className="waitlist-thanks waitlist-thanks--unsent">
            We could not save your address just now, so you are not on the list
            yet. Email{" "}
            <a href={`mailto:${FALLBACK}?subject=Axial%20Read%20early%20access`}>
              {FALLBACK}
            </a>{" "}
            and you will be, by hand.
          </p>
        )}

        {(status === "idle" || status === "sending") && (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Your email"
              disabled={status === "sending"}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Request early access"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
