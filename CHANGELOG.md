# Wayfind Changelog

Versioning starts at 1.0. Each shipped build gets the next number (1.1, 1.2, ...).
The running app shows the version in the footer ("Wayfind v1.0") so you can confirm
which build is live on Vercel. This file is the record so nothing gets lost.

## v1.8 - credibility pass (P0 from product review)
- Event vs venue status separated. An event detail now leads with event timing
  (Tonight / Tomorrow / date / Ended) instead of "Venue closed"; venue hours are
  a small secondary tap. Filler evidence line replaced with the actual rating.
- Events with no image get a designed fallback hero, never a blank media area.
- Category gating: Breakfast and Coffee searches only surface places with real
  breakfast/cafe evidence in their Google types or name. Falls back to the full
  list only when an area is too sparse (under 5 gated results).
- Hidden gem is now earned, not decorative: rating 4.6+, 40 to 600 reviews,
  applied consistently in all three places the badge is computed.
- List average costs are labeled "Est. avg" since they mix real and estimated
  price tiers.
- Deferred deliberately: central typed engine rewrite, page-level exposure
  registry, per-card evidence insights (AI cost per card), and debug payloads.
  Sequenced next; not jammed into one untestable pass.

## v1.7 - intent-aware ranking + open status
- Fixed the core ranking bug: search results now run through the conditions
  engine, which demotes closed places and rewards open + meal-time relevance.
  Closed spots no longer rank above open ones for a "now" search like breakfast.
  (The open-now logic already existed in dayFit; the search feed just never used
  it.) The featured boost also now applies in search results.
- Added Se7en Bites and White Wolf Cafe as local favorites (bounded lift).
- Added a "Featured" chip on boosted places so promotion is transparent, not a
  silent algorithm change.
- Note: per-card grounded copy (Best for / Go when / Skip if on feed cards, not
  just the detail sheet) is a later pass; it carries an AI call per card.

## v1.6 - version in header, save state, featured boost
- Build version now shows in the header next to the location, so it is obvious
  which build is live on Vercel.
- The detail Save button now reflects saved state (filled heart, "Saved") so a
  favorited place reads as saved.
- Added an owner "featured" boost (WAYFIND_FEATURED): listed places get a
  ranking lift and surface higher in the feed and Top 10. Seeded with T-Rex Cafe.
  Bounded on purpose (a lift, not an absolute pin) to protect ranking trust.
- Reminder: like/dislike were added in v1.2, "known for coffee" removed in v1.4.
  If you still see them, you are on an old deploy.

## v1.5 - your own notes/reviews on any place
- Added a "Your note" field to every place detail. Write your own review or
  notes; it saves on your device and reappears whenever you open that place.
- This is the global mechanism for keeping your reviews. It does not change the
  AI recommendation and is not a public review (both separate if wanted).
- Saved on this device only for now (localStorage). Cross-device sync would need
  Supabase, which is a follow-up.

## v1.4 - detail sheet uses grounded intelligence (pass 1 of 2)
- The top of the place detail now uses the review-grounded /api/insight, not the
  decisionReason template. Shows: Wayfind verdict, Best for, Go when, Skip if.
- "Why Wayfind picked it" now shows the grounded whyPicked and hides entirely
  when reviews do not support it. The template body (source of "known for
  coffee") is removed from the detail experience.
- Extended /api/insight compact mode to return bestFor, goWhen, skipIf, whyPicked
  (grounded in reviews, empty when unclear, never fabricated).
- Safe fallback for API miss/loading: a plain "A highly reviewed nearby option
  with a strong rating." No "known for X" clause.
- Layout kept minimal this pass on purpose. Pass 2 is the visual redesign:
  hierarchy, border reduction, orange cleanup, comparison-card polish.

## v1.3 — detail sheet: save fix, back button, what to order
- Fixed the save bug. Save now saves in one tap and stays on the place with a
  toast, instead of closing the sheet and dumping you to home.
- Back button. The X is now a back arrow, and the phone/Safari back button (and
  swipe-back) closes the sheet instead of leaving the app.
- "What to order" up top. The review-grounded top dishes/drinks (mustTry) now
  load on open and show prominently, not only after expanding. Added a review-
  grounded "pairs well" line (needs deploy to populate).
- These read from the existing AI insight route, which is grounded in real
  reviews, so no invented dishes.

## v1.2 — detail sheet: clarity and feedback
- Added the missing like and dislike buttons to the place detail sheet. Save,
  directions and share were already there; the thumbs were not.
- Stopped wrong "known for" descriptors (e.g. "known for coffee" on T-Rex). The
  deeper fix, real decision reasoning read from reviews, is the AI pass.
- Detail hero is now a clean full-width photo/carousel, no partial side sliver.
- Renamed for confidence and value: "Could be a better fit" to "Worth comparing
  nearby" (calmer subtitle, no "beats this one" framing), "More tips, videos &
  details" to "See photos, tips & details", "Events near here" to "What's
  happening nearby".
- Toned down the orange in comparison cards (orange reserved for brand and
  primary actions).

## v1.1 — real "things to do" on home
- Fixed the repetitive home cards. The two cards were both drawing from the
  food-only home feed, so "Top 10 near you" and "Top 10 food" were nearly
  identical. Home now shows two distinct cards: Top 10 food and Top 10 things
  to do.
- Top 10 things to do pulls a real attractions set for the area (theme parks,
  aquariums, zoos, landmarks, districts), fetched once and cached ~24h per area
  to keep Google costs low. Big attractions like SeaWorld and Disney Springs
  surface here from the attractions search, not from the restaurant feed.
- Note: T-Rex Cafe and Amazonia are themed restaurants, so they correctly stay
  under Food. Cross-listing themed dining as an "experience" is the separate
  destinations feature.

## v1.0 — consolidated baseline
Everything built to date, rolled into one version.

- Itinerary trip planner. Saving a place auto-files it into a city trip. Reorder
  stops, add notes, mark visited, and open a Google Maps route for the trip.
- Conditions-aware ranking. Recommendations factor weather, day, and time of day.
  The "Your next move" hero is the single best move for right now, not a rotation.
- Cuisine as the card label. Instead of a generic "Food" tag, the card names the
  cuisine when Google has it, and tapping it opens a Top 10 of that cuisine nearby.
- Two ranked home cards: "Top 10 near you" and "Top 10 food near you." Both are
  collapsible and show the average cost for two.
- Experiences. The featured place is deduped across cards so none repeats. The
  stack is ordered by the experiences this user saves most. Each card shows the
  spot count and average cost and opens the full ranked list.
- Hero cards. Solid readable fill instead of a see-through gradient, tighter text
  layout so nothing overlaps, reduced height.
- "More like this" on a place. Surfaces nearby spots that share its experience,
  matched on category, experience tags, cuisine, price, and feel.
- Cost-for-two and cuisine come from real Google data. No invented prices.

## Pending (not in 1.0)
- Grounded AI copy: real insider tips and specific "better fit" reasons read from
  each place's actual reviews. Needs deploy and testing (no API access in build).
- Deep "More like this": read candidate reviews and search broadly to find the
  same experience anywhere. Real API cost per tap; needs your go and testing.
- Global demand ordering across all users (needs a shared Supabase table).
- Destinations/districts as their own type (see Disney Springs discussion).
