# Orlando coverage check (weekly, ~15 minutes)

Purpose: decide with evidence whether Wayfind needs new event/place sources.
Do not build any scraper until the same meaningful gap shows up 3 weeks running.

Each week, same evening (e.g., Thursday 6pm):
1. Open Wayfind home + Events tab. Note the top 10 events it shows for tonight/weekend.
2. Google: "things to do in Orlando tonight" and "Orlando events this weekend". Note the top 10.
3. VisitOrlando.com events page. Note anything major Wayfind missed.
4. OrlandoWeekly.com events. Note anything major Wayfind missed.

Log per week:
- Misses that MATTER (you would actually go): name, source, why it matters
- Misses that don't matter (niche, far, low quality): count only
- Wrong data in Wayfind (dead event, wrong time): name it

Decision rule:
- 0-1 meaningful misses/week: current sources are fine, do nothing.
- Same source producing 2+ meaningful misses for 3 straight weeks: scope ONE
  adapter for that source only, as its own project (see changelog v2.0 deferred
  notes on compliant architecture).
