// Emits the ScripBook mark as inline SVG and patches it into index.html.
// Geometry mirrors SpendarApp/scripts/make-icons.mjs exactly so the page mark
// and the shipped app icon cannot drift apart.
import fs from "node:fs";

const BG = "#16150F", GOLD = "#F2C230", DIM = "#6E6244", ACCENT = "#FF7A45";

const S_CELLS = [[0,0],[0,1],[0,2],[1,0],[2,0],[2,1],[2,2],[3,2],[4,0],[4,1],[4,2]];
const ACCENT_CELL = [2,1];
const COLS = 5, ROWS = 5, COL_SHIFT = 1;
const GAP_RATIO = 0.30, GHOST_OPACITY = 0.18, SCALE = 0.72;

const isS = (row, col) => S_CELLS.some(([a, b]) => a === row && b === col - COL_SHIFT);
const isAccent = (row, col) => ACCENT_CELL[0] === row && ACCENT_CELL[1] === col - COL_SHIFT;

function markSVG(px = 46) {
  const S = 100;
  const cw = (S * SCALE) / (COLS + (COLS - 1) * GAP_RATIO);
  const gap = cw * GAP_RATIO;
  const total = COLS * cw + (COLS - 1) * gap;
  const o = (S - total) / 2;
  const r = cw * 0.24;

  const cell = (row, col, fill, opacity) => {
    const x = (o + col * (cw + gap)).toFixed(2);
    const y = (o + row * (cw + gap)).toFixed(2);
    return `<rect x="${x}" y="${y}" width="${cw.toFixed(2)}" height="${cw.toFixed(2)}" `
         + `rx="${r.toFixed(2)}" fill="${fill}"${opacity ? ` opacity="${opacity}"` : ""}/>`;
  };

  let ghosts = "", lit = "";
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (isS(row, col)) lit += cell(row, col, isAccent(row, col) ? ACCENT : GOLD);
      else ghosts += cell(row, col, DIM, String(GHOST_OPACITY));
    }
  }
  return `<svg viewBox="0 0 100 100" width="${px}" height="${px}" aria-hidden="true">`
       + `<rect width="100" height="100" fill="${BG}"/>${ghosts}${lit}</svg>`;
}

const file = new URL("index.html", import.meta.url);
let html = fs.readFileSync(file, "utf8");
// Test for the match explicitly. Comparing before and after would also report
// failure when the mark is already correct, which is the normal case on a
// re-run.
const RE = /<svg viewBox="0 0 100 100"[\s\S]*?<\/svg>/;
if (!RE.test(html)) { console.error("mark not found in index.html"); process.exit(1); }
const out = html.replace(RE, markSVG());
fs.writeFileSync(file, out);
console.log("mark updated, 5x5 square,", ROWS * COLS, "cells");
