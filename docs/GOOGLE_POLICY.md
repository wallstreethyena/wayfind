# Google Places content posture (as implemented)

Facts about what Wayfind stores vs displays:
- Place IDs: stored/cached indefinitely (explicitly exempt from caching limits).
- Place data shown in-app (ratings, hours, price, types, photos): fetched live
  per session. Home feed and attractions pools cache normalized results in
  localStorage for hours (suggested: time-bucketed; attractions: 24h) and the
  event-hero venue photo caches a photo URL REFERENCE (never image bytes) for
  7 days. All within the Places API (New) temporary caching allowance (30 days).
- No server-side database of Google content exists. Notes/curation/analytics
  tables contain Wayfind-owned data plus place_id and place name only.
- Attribution: photo author attributions are captured from the API and shown
  where photos display large (detail lightbox caption; event-hero badge when a
  venue photo is used). Small feed thumbnails do not carry per-photo credits
  yet; this is the known remaining gap if strict per-display attribution is
  required.
- Budget guardrail: venue-photo lookups capped at 12/device/day; each real
  lookup logs a venue_photo_lookup analytics event (with hit true/false) so
  cost is measurable in Supabase.

Verify against the live policy pages before any audit response:
Places API policies (caching/attribution) in the Google Maps Platform docs.
