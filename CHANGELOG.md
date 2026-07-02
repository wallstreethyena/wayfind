# Wayfind Changelog

Versioning starts at 1.0. Each shipped build gets the next number (1.1, 1.2, ...).
The running app shows the version in the footer ("Wayfind v1.0") so you can confirm
which build is live on Vercel. This file is the record so nothing gets lost.

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
