import { useEffect, useRef, useState } from "react";
import CognitiveMap from "./CognitiveMap";
import { STEPS, CHILD } from "../data/child";
import { citesForTrail } from "../data/evidence";

export default function ReadingDemo() {
  const [step, setStep] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const cur = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;
  const playedFor = useRef(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play the step's recorded clip when sound is on. These are real audio files
  // shipped with the site, so there is no speech API, no key and no network
  // call to fail. Maya's lines were recorded at a child's pitch.
  useEffect(() => {
    if (!soundOn || !cur.audio) return;
    if (playedFor.current === step) return;
    playedFor.current = step;
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.src = `${import.meta.env.BASE_URL}audio/${cur.audio}.mp3`;
    el.currentTime = 0;
    // Autoplay can still be refused before any interaction; ignore quietly.
    el.play().catch(() => {});
  }, [step, soundOn, cur]);

  useEffect(() => {
    const el = audioRef.current;
    return () => {
      el?.pause();
    };
  }, []);

  function go(next: number) {
    playedFor.current = -1;
    setStep(next);
  }

  function toggleSound() {
    const turningOn = !soundOn;
    setSoundOn(turningOn);
    if (turningOn) {
      // Replay the current step so switching sound on is audible right away.
      playedFor.current = -1;
    } else {
      audioRef.current?.pause();
    }
  }

  return (
    <div className="demo-shell">
      <audio ref={audioRef} preload="auto" />

      <div className="demo-panel">
        <div className="demo-panel-top">
          <div className="demo-kicker">
            <span className="demo-kicker-dot" />
            {cur.kicker}
          </div>
          <button
            className={`sound-toggle ${soundOn ? "is-on" : ""}`}
            onClick={toggleSound}
            aria-pressed={soundOn}
          >
            {soundOn ? "◗ sound on" : "sound off"}
          </button>
        </div>

        <h3 className="demo-title">{cur.title}</h3>

        {cur.transcript && (
          <div className={`transcript ${cur.correct ? "is-correct" : "is-stumble"}`}>
            <span className="transcript-face" aria-hidden="true">
              {cur.correct ? "☺" : "…"}
            </span>
            <div className="transcript-body">
              <span className="transcript-name">{CHILD.name} reads</span>
              <span className="transcript-words">{cur.transcript}</span>
            </div>
          </div>
        )}

        {!cur.parent && <p className="demo-body">{cur.body}</p>}

        {cur.activity && (
          <div className="activity">
            <div className="activity-row activity-before">
              <span className="activity-tag">was</span>
              <span>{cur.activity.before}</span>
            </div>
            <div className="activity-row activity-after">
              <span className="activity-tag">now</span>
              <span>{cur.activity.after}</span>
            </div>
          </div>
        )}

        {cur.trail && cur.trail.length > 0 && (
          <div className="evidence-note">
            <span className="evidence-tag">grounded in</span>
            {citesForTrail(cur.trail).map((c) => (
              <span className="evidence-cite" key={c}>
                {c}
              </span>
            ))}
          </div>
        )}

        {cur.parent && (
          <div className="parent-note">
            <span className="parent-note-head">A note home</span>
            <p>{cur.body}</p>
            <span className="parent-note-sign">— Axial, on Maya’s reading</span>
          </div>
        )}

        <div className="demo-controls">
          {!isLast ? (
            <button className="btn btn-primary" onClick={() => go(step + 1)}>
              {isFirst ? "▸  Play" : "Next"}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => go(0)}>
              ↺  Replay
            </button>
          )}
          {!isFirst && (
            <button className="btn btn-ghost" onClick={() => go(step - 1)}>
              Back
            </button>
          )}
          <div className="demo-progress" role="presentation">
            {STEPS.map((_, i) => (
              <button
                key={i}
                className={`progress-dot ${i === step ? "is-active" : ""} ${
                  i < step ? "is-done" : ""
                }`}
                onClick={() => go(i)}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="demo-mapwrap">
        <CognitiveMap states={cur.states} trail={cur.trail} />
      </div>
    </div>
  );
}
