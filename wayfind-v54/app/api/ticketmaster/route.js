export const runtime = "nodejs";

// Upcoming local events via the Ticketmaster Discovery API. Returns name, date,
// venue, image, price, and a tickets link. Fails soft: no key or any error
// returns an empty list so the screen never breaks.
export async function POST(req) {
  try {
    const { lat, lng, keyword, radius } = await req.json();
    const key = process.env.TICKETMASTER_API_KEY;
    if (!key) return Response.json({ unavailable: true, events: [] }, { status: 200 });
    if (lat == null || lng == null) return Response.json({ events: [] }, { status: 200 });

    const start = new Date().toISOString().slice(0, 19) + "Z";
    const params = new URLSearchParams({
      apikey: key,
      latlong: `${lat},${lng}`,
      radius: String(radius || 60),
      unit: "miles",
      sort: "date,asc",
      size: "30",
      startDateTime: start,
    });
    if (keyword) params.set("keyword", keyword);

    const r = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`);
    if (!r.ok) return Response.json({ error: true, events: [] }, { status: 200 });
    const data = await r.json();

    const raw = (data._embedded && data._embedded.events) || [];
    const events = raw.map((e) => {
      const dates = e.dates && e.dates.start ? e.dates.start : {};
      const venue = e._embedded && e._embedded.venues && e._embedded.venues[0] ? e._embedded.venues[0] : null;
      const vloc = venue && venue.location ? venue.location : null;
      let img = null;
      if (Array.isArray(e.images) && e.images.length) {
        const wide = e.images.filter((i) => i.ratio === "16_9").sort((a, b) => (b.width || 0) - (a.width || 0));
        img = (wide[0] || e.images[0]).url;
      }
      const cls = Array.isArray(e.classifications) && e.classifications[0] ? e.classifications[0] : null;
      const seg = cls && cls.segment ? cls.segment.name : "";
      const genre = cls && cls.genre ? cls.genre.name : "";
      let price = null;
      if (Array.isArray(e.priceRanges) && e.priceRanges.length) {
        const pr = e.priceRanges[0];
        const cur = pr.currency === "USD" ? "$" : (pr.currency ? pr.currency + " " : "");
        if (pr.min != null && pr.max != null) {
          price = pr.min === pr.max ? `${cur}${Math.round(pr.min)}` : `${cur}${Math.round(pr.min)} to ${cur}${Math.round(pr.max)}`;
        }
      }
      return {
        id: e.id,
        name: e.name || "",
        date: dates.localDate || "",
        time: dates.localTime || "",
        venue: venue ? venue.name || "" : "",
        city: venue && venue.city ? venue.city.name || "" : "",
        lat: vloc && vloc.latitude != null ? Number(vloc.latitude) : null,
        lng: vloc && vloc.longitude != null ? Number(vloc.longitude) : null,
        segment: seg,
        genre: genre,
        image: img,
        price,
        url: e.url || "",
      };
    });

    return Response.json({ events }, { status: 200 });
  } catch (e) {
    return Response.json({ error: true, events: [] }, { status: 200 });
  }
}
