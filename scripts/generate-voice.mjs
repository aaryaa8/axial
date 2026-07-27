// Generates the demo's voice clips with ElevenLabs, offline.
//
// The key is read from the environment or from a file OUTSIDE this repo, and
// only the resulting .mp3 files are committed. The key never reaches the site.
//
//   node scripts/generate-voice.mjs --list      # show the voices on your account
//   node scripts/generate-voice.mjs             # generate all clips
//
// Key lookup order: $ELEVENLABS_API_KEY, then ~/.elevenlabs-key

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const API = "https://api.elevenlabs.io/v1";
const OUT = new URL("../public/audio/", import.meta.url);

async function getKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  try {
    return (await readFile(join(homedir(), ".elevenlabs-key"), "utf8")).trim();
  } catch {
    console.error(
      "No API key found.\n" +
        "  Either:  export ELEVENLABS_API_KEY=sk_...\n" +
        "  Or:      write the key into ~/.elevenlabs-key (outside this repo)"
    );
    process.exit(1);
  }
}

// Set these once you have picked voices from --list.
// MAYA should be a young/child voice; TUTOR a warm, calm adult.
const VOICES = {
  maya: process.env.VOICE_MAYA || "",
  tutor: process.env.VOICE_TUTOR || "",
};

const CLIPS = [
  { file: "s0-intro", who: "tutor", text: "Let's read three words together." },
  { file: "s1-cat", who: "maya", text: "c... a... t... cat!" },
  { file: "s2-sun", who: "maya", text: "s... u... um... snake?" },
  { file: "s3-map", who: "maya", text: "m... a... it's gone." },
  { file: "s5-adapt", who: "tutor", text: "Let's join just two sounds. Ss, un. Sun." },
];

async function listVoices(key) {
  const res = await fetch(`${API}/voices`, { headers: { "xi-api-key": key } });
  if (!res.ok) throw new Error(`voices: ${res.status} ${await res.text()}`);
  const { voices } = await res.json();
  for (const v of voices) {
    const l = v.labels || {};
    console.log(
      `${v.voice_id}  ${v.name.padEnd(20)} ${[l.age, l.gender, l.accent, l.description]
        .filter(Boolean)
        .join(", ")}`
    );
  }
  console.log(`\n${voices.length} voices. Pick one for Maya (young) and one for the tutor.`);
}

async function tts(key, voiceId, text, file) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`${file}: ${res.status} ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(OUT, { recursive: true });
  await writeFile(new URL(`${file}.mp3`, OUT), buf);
  console.log(`  ${file}.mp3  ${(buf.length / 1024).toFixed(0)} kB`);
}

const key = await getKey();

if (process.argv.includes("--list")) {
  await listVoices(key);
  process.exit(0);
}

if (!VOICES.maya || !VOICES.tutor) {
  console.error(
    "Set the two voice ids first.\n" +
      "  node scripts/generate-voice.mjs --list\n" +
      "  then: VOICE_MAYA=<id> VOICE_TUTOR=<id> node scripts/generate-voice.mjs"
  );
  process.exit(1);
}

console.log("Generating:");
for (const c of CLIPS) {
  await tts(key, VOICES[c.who], c.text, c.file);
}
console.log("Done. The clips are in public/audio/.");
