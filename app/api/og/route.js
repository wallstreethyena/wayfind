import { ImageResponse } from "next/og";

export const runtime = "edge";

// Generates a 1200x630 social preview card for a shared Wayfind list.
// Query params:
//   t   = list title (e.g. "The real Parrish move")
//   loc = location name (e.g. "Parrish, FL")
//   n   = number of spots
//   img = optional background photo URL (first place in the list)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("t") || "A few spots worth your time").slice(0, 90);
  const loc = (searchParams.get("loc") || "").slice(0, 60);
  const n = (searchParams.get("n") || "").replace(/[^0-9]/g, "").slice(0, 3);
  const img = searchParams.get("img") || "";

  const bg = "#0D1117";
  const accent = "#F97316";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: bg,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {img ? (
          <img
            src={img}
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: "1200px", height: "630px", objectFit: "cover" }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            display: "flex",
            background: img
              ? "linear-gradient(180deg, rgba(13,17,23,0.45) 0%, rgba(13,17,23,0.78) 55%, rgba(13,17,23,0.95) 100%)"
              : "linear-gradient(135deg, rgba(249,115,22,0.22) 0%, rgba(13,17,23,1) 60%)",
        }}
        />
        <div style={{ display: "flex", flexDirection: "column", padding: "64px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ display: "flex", width: "22px", height: "22px", borderRadius: "22px", backgroundColor: accent }} />
            <div style={{ display: "flex", fontSize: "30px", fontWeight: 800, color: accent, letterSpacing: "2px" }}>WAYFIND</div>
          </div>
          <div style={{ display: "flex", fontSize: "68px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.05, maxWidth: "1000px" }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "26px", fontSize: "30px", color: "#CBD5E1", fontWeight: 600 }}>
            {n ? <div style={{ display: "flex" }}>{n} curated spots</div> : <div style={{ display: "flex" }} />}
            {n && loc ? <div style={{ display: "flex", color: "#64748B" }}>·</div> : null}
            {loc ? <div style={{ display: "flex" }}>{loc}</div> : null}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
