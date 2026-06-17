/**
 * geojson-to-svg.js
 * Converts india-soi.geojson into SVG path strings using Mercator projection.
 * Output: website/components/sections/india-map-paths.json
 */

const fs = require("fs");
const path = require("path");

// ─── PROJECTION CONFIG ────────────────────────────────────────────────────────
// SVG canvas size
const WIDTH = 700;
const HEIGHT = 780;

// Geographic bounding box for India (mainland + islands)
const LNG_MIN = 68.1;
const LNG_MAX = 97.5;
const LAT_MIN = 6.5;
const LAT_MAX = 35.7;

// Mercator Y of given latitude (radians)
function mercY(latDeg) {
  const latRad = (latDeg * Math.PI) / 180;
  return Math.log(Math.tan(Math.PI / 4 + latRad / 2));
}

const yTop = mercY(LAT_MAX);
const yBot = mercY(LAT_MIN);

function project(lng, lat) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * WIDTH;
  const y = HEIGHT - ((mercY(lat) - yBot) / (yTop - yBot)) * HEIGHT;
  return [x, y];
}

// ─── COORDINATE ARRAY → SVG PATH ─────────────────────────────────────────────
function ringToPath(ring) {
  if (!ring || ring.length < 2) return "";
  const parts = ring.map(([lng, lat], i) => {
    const [x, y] = project(lng, lat);
    return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  });
  return parts.join(" ") + " Z";
}

// Douglas-Peucker simplification so the SVG data stays manageable
function perpDist(pt, lineStart, lineEnd) {
  const dx = lineEnd[0] - lineStart[0];
  const dy = lineEnd[1] - lineStart[1];
  if (dx === 0 && dy === 0) {
    return Math.hypot(pt[0] - lineStart[0], pt[1] - lineStart[1]);
  }
  const t =
    ((pt[0] - lineStart[0]) * dx + (pt[1] - lineStart[1]) * dy) /
    (dx * dx + dy * dy);
  const nearX = lineStart[0] + t * dx;
  const nearY = lineStart[1] + t * dy;
  return Math.hypot(pt[0] - nearX, pt[1] - nearY);
}

function douglasPeucker(pts, epsilon) {
  if (pts.length <= 2) return pts;
  let maxDist = 0;
  let maxIdx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }
  if (maxDist > epsilon) {
    const left = douglasPeucker(pts.slice(0, maxIdx + 1), epsilon);
    const right = douglasPeucker(pts.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [pts[0], pts[pts.length - 1]];
}

// ─── PROCESS GEOJSON ─────────────────────────────────────────────────────────
const GEOJSON_PATH = path.resolve(
  __dirname,
  "../components/sections/india-soi.geojson"
);
const OUT_PATH = path.resolve(
  __dirname,
  "../components/sections/india-map-paths.json"
);

console.log("Reading GeoJSON…");
const raw = fs.readFileSync(GEOJSON_PATH, "utf8");
const geojson = JSON.parse(raw);
console.log(`Features: ${geojson.features.length}`);

// Simplification tolerance in SVG-pixel space (higher = fewer points)
const EPSILON = 0.8;

const statePaths = [];

for (const feature of geojson.features) {
  const geom = feature.geometry;
  const name = feature.properties?.ST_NM || feature.properties?.NAME_1 || "";
  const paths = [];

  const processPolygon = (coordinates) => {
    // coordinates[0] is the outer ring
    const outerRing = coordinates[0];
    // Project each coordinate pair
    const projected = outerRing.map(([lng, lat]) => project(lng, lat));
    // Simplify
    const simplified = douglasPeucker(projected, EPSILON);
    if (simplified.length < 3) return;
    const d = simplified
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ") + " Z";
    paths.push(d);
  };

  if (geom.type === "Polygon") {
    processPolygon(geom.coordinates);
  } else if (geom.type === "MultiPolygon") {
    for (const poly of geom.coordinates) {
      processPolygon(poly);
    }
  }

  if (paths.length > 0) {
    statePaths.push({ name, paths });
  }
}

// Also build a single merged outline path (all outer rings combined)
// — useful as a single background fill
const allPaths = statePaths.flatMap((s) => s.paths);

const output = {
  viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
  width: WIDTH,
  height: HEIGHT,
  states: statePaths,
  allPaths,
};

fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
console.log(`Done! Written to ${OUT_PATH}`);
console.log(`Total state groups: ${statePaths.length}`);
console.log(`Total path segments: ${allPaths.length}`);
