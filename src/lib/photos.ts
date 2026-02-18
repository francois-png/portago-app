import fs from "fs";

let photoMap: Record<string, { s: string; url: string }> | null = null;

export function getPhotoUrl(businessId: string): string | null {
  if (!photoMap) {
    try {
      const raw = fs.readFileSync("/tmp/photo-fetch-state2.json", "utf-8");
      photoMap = JSON.parse(raw);
    } catch {
      photoMap = {};
    }
  }
  const entry = photoMap![businessId];
  if (entry && entry.s === "ok" && entry.url) {
    return entry.url;
  }
  return null;
}
