// One-Line Office Jokes — u-markk-st-one-line-office-jokes-a51f2bcc
// Writes a single-line office joke to /output/entry.txt (MAKEFUN_OUTPUT_DIR
// or /output fallback) and prints it to stdout.
// Gate (sealed competition.yaml): UTF-8 text, 1..199 characters,
// not only whitespace, exactly one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a real office detail (the reply-all thread), with the laugh
// landing on the final beat — the sender becomes the office cautionary tale.
const ENTRY =
  "I hit reply-all to say 'please remove me from this thread,' and now 400 people know I'm the guy who can't use email.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);

// Self-checking gate: mirror the sealed scorer before we declare success.
// Entry must be 1..199 characters, a single line, not only whitespace.
const chars = [...ENTRY];
const failures: string[] = [];
if (chars.length < 1 || chars.length > 199) {
  failures.push(`length ${chars.length} chars, must be 1..199`);
}
if (ENTRY.trim().length === 0) failures.push("entry is only whitespace");
if (/[\r\n]/.test(ENTRY)) failures.push("entry must be a single line");
if (failures.length > 0) {
  console.error(`GATE FAILED: ${failures.join("; ")}`);
  process.exit(1);
}
console.error(`GATE OK: ${chars.length} chars, single line, non-blank`);
