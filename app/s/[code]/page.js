import Redirect from "./Redirect";

const SITE = "https://wayfind-xi.vercel.app";

function s(v) {
  if (Array.isArray(v)) return v[0] || "";
  return v || "";
}

export async function generateMetadata({ params, searchParams }) {
  const t = s(searchParams.t) || "A few spots worth your time";
  const loc = s(searchParams.loc);
  const n = s(searchParams.n).replace(/[^0-9]/g, "");
  const desc =
    (n ? `${n} curated spots` : "Curated spots") +
    (loc ? ` in ${loc}` : "") +
    " · Found on Wayfind";
  const og = `/api/og?t=${encodeURIComponent(t)}&loc=${encodeURIComponent(loc)}&n=${encodeURIComponent(n)}`;
  return {
    metadataBase: new URL(SITE),
    title: `${t} · Wayfind`,
    description: desc,
    openGraph: {
      title: t,
      description: desc,
      type: "website",
      siteName: "Wayfind",
      images: [{ url: og, width: 1200, height: 630, alt: t }],
    },
    twitter: {
      card: "summary_large_image",
      title: t,
      description: desc,
      images: [og],
    },
  };
}

export default function SharePage({ params, searchParams }) {
  const code = s(params.code);
  const t = s(searchParams.t) || "your Wayfind list";
  const target = `/?list=${code}`;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D1117",
        color: "#F1F5F9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <Redirect to={target} />
      <div style={{ fontSize: 28, fontWeight: 800, color: "#F97316", letterSpacing: "1px", marginBottom: 14 }}>
        📍 WAYFIND
      </div>
      <div style={{ fontSize: 16, color: "#CBD5E1", marginBottom: 22 }}>Opening {t}…</div>
      <a
        href={target}
        style={{
          display: "inline-block",
          padding: "12px 22px",
          borderRadius: 999,
          background: "#F97316",
          color: "#0D1117",
          fontWeight: 800,
          fontSize: 15,
          textDecoration: "none",
        }}
      >
        Open in Wayfind
      </a>
    </div>
  );
}
