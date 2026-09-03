import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcPath = path.join(
  root,
  "assets-src",
  "advertorial",
  "health-insurance",
  "cheaper-policy-trap",
  "hero-family.webp",
);
const outPath = path.join(
  root,
  "public",
  "advertorial",
  "health-insurance",
  "cheaper-policy-trap",
  "hero-family.webp",
);

const image = fs.readFileSync(srcPath);

if (image.length < 50_000) {
  throw new Error(
    `Refusing to write advertorial hero: decoded image is unexpectedly small (${image.length} bytes).`,
  );
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, image);
console.log(`Materialized ${outPath} (${image.length} bytes)`);
