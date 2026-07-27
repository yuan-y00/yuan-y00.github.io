import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

const root = normalize(join(import.meta.dirname, ".."));
const htmlFiles = [
  "index.html",
  "404.html",
  "projects/jabx-north-america-pmf/index.html",
  "projects/ai-fighting-robot-commercialization/index.html",
];

const localRef = /(?:href|src|data-lightbox-src)=["']([^"']+)["']/g;
let failures = 0;

for (const file of htmlFiles) {
  const abs = join(root, file);
  const html = readFileSync(abs, "utf8");
  const dir = dirname(abs);

  for (const match of html.matchAll(localRef)) {
    const ref = match[1];
    if (
      ref.startsWith("http") ||
      ref.startsWith("mailto:") ||
      ref.startsWith("#") ||
      ref.startsWith("/")
    ) {
      continue;
    }

    const clean = ref.split("#")[0].split("?")[0];
    if (!clean) continue;
    const target = normalize(join(dir, clean));
    const candidates = [target, join(target, "index.html")];
    if (!candidates.some((candidate) => existsSync(candidate))) {
      console.error(`Missing reference in ${file}: ${ref}`);
      failures += 1;
    }
  }
}

if (failures) {
  process.exit(1);
}

console.log("All local HTML references are valid.");
