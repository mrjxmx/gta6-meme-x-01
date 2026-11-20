// gta6-meme-x-01 hand-in program.
//
// The entry itself is the X post (the meme picture and its text); this
// program's whole job is to hand the post's address to the grader: it copies
// POST.json from the bot directory into the output directory.
//
// Locally the two directories come from MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR;
// in the grader they default to /bot and /output.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function envDir(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.length > 0 ? value : fallback;
}

// The hand-in only counts if POST.json really names a post, so check its
// shape before copying: a JSON object with a non-empty "url" string.
function checkPostFile(path: string): void {
  const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
  const url = (parsed as { url?: unknown } | null)?.url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error('POST.json holds no "url" string');
  }
}

function main(): void {
  const botDir = envDir('MAKEFUN_BOT_DIR', '/bot');
  const outputDir = envDir('MAKEFUN_OUTPUT_DIR', '/output');
  const source = join(botDir, 'POST.json');
  const target = join(outputDir, 'POST.json');

  if (!existsSync(source)) {
    console.error(`no POST.json in the bot directory (${botDir})`);
    process.exit(1);
  }
  try {
    checkPostFile(source);
  } catch (err) {
    console.error(`POST.json in ${botDir} is not usable: ${(err as Error).message}`);
    process.exit(1);
  }

  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, target);
  console.log(`POST.json handed in: ${source} -> ${target}`);
}

main();
