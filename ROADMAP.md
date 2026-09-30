# Roadmap

Schedula is already usable as a static timetable lookup interface. The roadmap below describes future
research and engineering directions.

## Near-Term

- Fix and harden compare-mode browser behavior.
- Add automated visual regression screenshots.
- Pin the local test dependency tree for reproducible `npm test` runs.
- Add a GitHub Actions workflow after the dependency tree is stabilized.

## Research Validation

- Test the parser against multiple semester exports.
- Measure lookup time against manual spreadsheet scanning.
- Evaluate the cohort-section heuristic on other universities' exports.
- Collect usability feedback from students and advisors.

## Product Extensions

- Optional saved favorite routines using `localStorage`.
- Improved mobile comparison layout.
- Export/share routine as image or PDF.
- Add authoritative building/room metadata only if a verified mapping is available.
