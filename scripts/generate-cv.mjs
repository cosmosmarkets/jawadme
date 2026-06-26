// Renders scripts/cv/cv.html to public/jawad-jalal-cv.pdf using Playwright +
// the pre-installed Chromium. Run with: node scripts/generate-cv.mjs
//
// Keeping the CV as HTML (rather than a hand-authored PDF) means the document
// is versioned, on-brand, and regenerable whenever Jawad's roles change.

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Playwright ships with the toolchain (not as a project dependency), so resolve
// it from wherever `require` can find it — including the global install.
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, "cv/cv.html");
const outPath = resolve(__dirname, "../public/jawad-jalal-cv.pdf");

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  // Give the web fonts a beat to settle so headings render in Newsreader.
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`Wrote ${outPath}`);
} finally {
  await browser.close();
}
