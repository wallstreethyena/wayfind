import { ImageResponse } from "next/og";

export const runtime = "edge";

// Generates a 1200x630 social preview card for a shared Wayfind list.
// Vibrant, photo-free (so it always renders reliably) and built to stop a scroll.
// Query params: t = title, loc = location, n = number of spots
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("t") || "A few spots worth your time").slice(0, 90);
  const loc = (searchParams.get("loc") || "").slice(0, 60);
  const n = (searchParams.get("n") || "").replace(/[^0-9]/g, "").slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage: "linear-gradient(135deg, #F97316 0%, #EA2A8A 52%, #160C22 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* soft glow accents */}
        <div style={{ position: "absolute", top: -160, right: -120, width: 520, height: 520, borderRadius: 520, background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -200, left: -140, width: 560, height: 560, borderRadius: 560, background: "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)", display: "flex" }} />

        {/* top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "56px 64px 0" }}>
          <div style={{ display: "flex", width: 30, height: 30, borderRadius: 30, backgroundColor: "#FFFFFF" }} />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "#FFFFFF", letterSpacing: 3 }}>WAYFIND</div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", padding: "0 64px" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.04, letterSpacing: -1, maxWidth: 1040, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 30 }}>
            {n ? (
              <div style={{ display: "flex", alignItems: "center", backgroundColor: "#FFFFFF", color: "#16101F", fontSize: 30, fontWeight: 800, padding: "10px 22px", borderRadius: 999 }}>
                {n} spots inside
              </div>
            ) : <div style={{ display: "flex" }} />}
            {loc ? <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>{loc}</div> : <div style={{ display: "flex" }} />}
          </div>
        </div>

        {/* bottom: CTA strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 64px 56px" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
            Hand-picked, ranked best first
          </div>
          <div style={{ display: "flex", alignItems: "center", backgroundColor: "#160C22", color: "#FFFFFF", fontSize: 28, fontWeight: 800, padding: "14px 28px", borderRadius: 999 }}>
            Tap to explore →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
