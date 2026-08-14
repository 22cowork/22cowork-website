// Fetches the live Google rating + review count for 22cowork and writes them
// to src/data/reviews.json. Run by .github/workflows/update-reviews.yml.
// Requires env GOOGLE_MAPS_API_KEY (Places API New enabled, key restricted to it).
import { readFileSync, writeFileSync } from "node:fs";

const KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = "ChIJibrR-YpDGQ0R2UrFT6Fufsk"; // 22cowork on Google Maps
const FILE = new URL("../src/data/reviews.json", import.meta.url);

if (!KEY) {
  console.error("Missing GOOGLE_MAPS_API_KEY");
  process.exit(1);
}

const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount&key=${KEY}`;

const res = await fetch(url);
if (!res.ok) {
  console.error("Places API error:", res.status, await res.text());
  process.exit(1);
}
const data = await res.json();
const count = data.userRatingCount;
const rating = data.rating;

if (typeof count !== "number" || typeof rating !== "number") {
  console.error("Unexpected API response:", JSON.stringify(data));
  process.exit(1);
}

const current = JSON.parse(readFileSync(FILE, "utf8"));
const next = { rating: rating.toFixed(1), count };

if (current.rating === next.rating && current.count === next.count) {
  console.log("No change:", JSON.stringify(next));
  process.exit(0);
}

writeFileSync(FILE, JSON.stringify(next, null, 2) + "\n");
console.log(`Updated ${JSON.stringify(current)} -> ${JSON.stringify(next)}`);
