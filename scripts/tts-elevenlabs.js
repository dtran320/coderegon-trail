#!/usr/bin/env node
// scripts/tts-elevenlabs.js - ElevenLabs TTS engine for diff-pair-review
// Standalone CLI: parses args, calls ElevenLabs API, plays audio via afplay

const { execFile } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

// --- Arg parsing ---
const args = process.argv.slice(2);
let voice = process.env.ELEVENLABS_VOICE_ID || "pjcYQlDFKMbcOUp6F5GD";
let speed = 1.0;
let model = "eleven_turbo_v2_5";
let debug = false;
const textParts = [];

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--voice":
      voice = args[++i];
      break;
    case "--speed":
      speed = parseFloat(args[++i]);
      break;
    case "--model":
      model = args[++i];
      break;
    case "--debug":
      debug = true;
      break;
    default:
      textParts.push(args[i]);
      break;
  }
}

function log(...msg) {
  if (debug) process.stderr.write(`[elevenlabs] ${msg.join(" ")}\n`);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf-8").trim();
}

async function streamToBuffer(stream) {
  // Handle both Node.js Readable and Web ReadableStream
  if (typeof stream[Symbol.asyncIterator] === "function") {
    const chunks = [];
    for await (const chunk of stream) chunks.push(Buffer.from(chunk));
    return Buffer.concat(chunks);
  }
  if (typeof stream.getReader === "function") {
    const reader = stream.getReader();
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks);
  }
  throw new Error("Unsupported stream type");
}

async function main() {
  let text = textParts.join(" ");
  if (!text) {
    text = await readStdin();
  }
  if (!text) {
    process.stderr.write("Error: no text provided\n");
    process.exit(1);
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    process.stderr.write("Error: ELEVENLABS_API_KEY not set\n");
    process.exit(1);
  }

  log(`voice=${voice} model=${model} speed=${speed} text_length=${text.length}`);

  const { ElevenLabsClient } = require("@elevenlabs/elevenlabs-js");
  const client = new ElevenLabsClient({ apiKey });

  const audioStream = await client.textToSpeech.convert(voice, {
    text,
    modelId: model,
    outputFormat: "mp3_44100_128",
    voiceSettings: { speed },
  });

  const audioBuffer = await streamToBuffer(audioStream);
  log(`received ${audioBuffer.length} bytes of audio`);

  if (audioBuffer.length === 0) {
    process.stderr.write("Error: received empty audio from ElevenLabs\n");
    process.exit(1);
  }

  // Write to temp file and play
  const tmpDir = path.join(os.tmpdir(), "diff-review-tts");
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmpFile = path.join(tmpDir, `el_${Date.now()}.mp3`);
  fs.writeFileSync(tmpFile, audioBuffer);

  log(`playing ${tmpFile}`);
  const child = execFile("afplay", [tmpFile], (err) => {
    fs.unlinkSync(tmpFile);
    if (err && err.killed) return; // ignore if killed
    if (err) log(`afplay error: ${err.message}`);
  });
  child.unref();
}

main().catch((err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
