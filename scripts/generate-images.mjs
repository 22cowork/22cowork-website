/**
 * Generates .avif and .webp siblings for every .jpg in public/assets.
 *
 * Committed alongside the JPEGs rather than produced during the Docker build,
 * so a deploy never depends on image tooling being present on the Mini PC.
 * Run with `npm run images` after adding or replacing a photograph.
 */
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/assets";
const AVIF = { quality: 50, effort: 5 };
const WEBP = { quality: 78, effort: 5 };

const kb = (n) => `${Math.round(n / 1024)}KB`;
const files = readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f));

let jpg = 0;
let avif = 0;
let webp = 0;
let written = 0;

for (const file of files) {
  const src = join(DIR, file);
  const base = src.replace(/\.jpe?g$/i, "");
  const srcStat = statSync(src);
  jpg += srcStat.size;

  for (const [ext, opts] of [
    ["avif", AVIF],
    ["webp", WEBP],
  ]) {
    const out = `${base}.${ext}`;
    // Skip anything already newer than its source, so reruns are cheap.
    if (existsSync(out) && statSync(out).mtimeMs >= srcStat.mtimeMs) {
      const size = statSync(out).size;
      if (ext === "avif") avif += size;
      else webp += size;
      continue;
    }
    const buf = await sharp(src)[ext](opts).toBuffer();
    writeFileSync(out, buf);
    written++;
    if (ext === "avif") avif += buf.length;
    else webp += buf.length;
  }
}

console.log(`${files.length} sources, ${written} file(s) written`);
console.log(`  jpg  ${kb(jpg)}`);
console.log(`  webp ${kb(webp)}  (${Math.round((1 - webp / jpg) * 100)}% smaller)`);
console.log(`  avif ${kb(avif)}  (${Math.round((1 - avif / jpg) * 100)}% smaller)`);
