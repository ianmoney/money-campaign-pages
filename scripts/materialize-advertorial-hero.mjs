import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(
  root,
  "assets-src",
  "advertorial",
  "health-insurance",
  "cheaper-policy-trap",
);
const outPath = path.join(
  root,
  "public",
  "advertorial",
  "health-insurance",
  "cheaper-policy-trap",
  "hero-family.webp",
);

const parts = [
  "hero-family.part01.b64",
  "hero-family.part02.b64",
  "hero-family.part03.b64",
  "hero-family.part04.b64",
];

const base64 = parts
  .map((name) => fs.readFileSync(path.join(srcDir, name), "utf8").trim())
  .join("");

const image = Buffer.from(base64, "base64");

if (image.length < 100_000) {
  throw new Error(
    `Refusing to write advertorial hero: decoded image is unexpectedly small (${image.length} bytes).`,
  );
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, image);
console.log(`Materialized ${outPath} (${image.length} bytes)`);
