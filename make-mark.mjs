// Emits the ScripBook mark as inline SVG and patches it into index.html.
// Geometry mirrors SpendarApp/scripts/make-icons.mjs exactly so the page
// mark and the shipped app icon cannot drift apart.
import fs from "node:fs";

const BG = "#16150F", GOLD = "#F2C230", DIM = "#6E6244", ACCENT = "#FF7A45";

const S_CELLS = [[0,0],[0,1],[0,2],[1,0],[2,0],[2,1],[2,2],[3,2],[4,0],[4,1],[4,2]];
const ACCENT_CELL = [2,1];
const ALL = [...Array(5)].flatMap((_,r) => [...Array(3)].map((_,c) => [r,c]));
const isS = ([r,c]) => S_CELLS.some(([a,b]) => a===r && b===c);
const isAccent = ([r,c]) => r===ACCENT_CELL[0] && c===ACCENT_CELL[1];

function markSVG(scale = 0.62) {
  const S = 100, cols = 3, rows = 5, gapRatio = 0.30;
  const cw = (S * scale) / (cols + (cols - 1) * gapRatio);
  const gx = cw * gapRatio;
  const ch = cw * 0.82;
  const gy = ch * 0.34;
  const x0 = (S - (cols*cw + (cols-1)*gx)) / 2;
  const y0 = (S - (rows*ch + (rows-1)*gy)) / 2;
  const r  = cw * 0.24;

  // Ghost cells first so the lit cells sit on top, same order as the icon.
  const rect = (cell, fill, opacity) => {
    const [row, col] = cell;
    const x = (x0 + col * (cw + gx)).toFixed(2);
    const y = (y0 + row * (ch + gy)).toFixed(2);
    return `<rect x="${x}" y="${y}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" `
         + `rx="${r.toFixed(2)}" fill="${fill}"${opacity ? ` opacity="${opacity}"` : ""}/>`;
  };

  const ghosts = ALL.filter((c) => !isS(c)).map((c) => rect(c, DIM, "0.18"));
  const lit    = ALL.filter(isS).map((c) => rect(c, isAccent(c) ? ACCENT : GOLD));

  return `<svg viewBox="0 0 100 100" width="46" height="46" aria-hidden="true">`
       + `<rect width="100" height="100" fill="${BG}"/>`
       + ghosts.join("") + lit.join("")
       + `</svg>`;
}

const file = new URL("index.html", import.meta.url);
let html = fs.readFileSync(file, "utf8");
const replaced = html.replace(/<svg viewBox="0 0 100 100"[\s\S]*?<\/svg>/, markSVG());
if (replaced === html) { console.error("mark not found in index.html"); process.exit(1); }
fs.writeFileSync(file, replaced);
console.log("mark updated —", ALL.length, "cells:",
  ALL.filter(isS).length, "lit (1 accented) +", ALL.filter(c => !isS(c)).length, "ghost");
