# Master Index — Development Hub

Ground truth for every tool built in this Project. Each row links to that tool's dedicated
documentation file, which is the authoritative source for its own current state — this index only
tracks what exists, its status, and where to find it.

**Global Defaults** (apply to every tool below unless its own doc explicitly overrides one):
- Deployment target, unless noted otherwise: GitHub Pages (free tier), static hosting only.
- Documentation lives at `docs/<TOOLNAME>_DOCUMENTATION.md` inside that tool's own repo, following
  the 14-section template defined in this Project's custom instructions.
- Status values used below: `DONE` (built, tested, documented — deployment may still be an open
  human step), `IN PROGRESS`, `TODO`, `PAUSED`.

---

## Tools

| # | Name | One-line description | Status | Stack | Doc |
|---|---|---|---|---|---|
| 1 | **Schedula** | Search any AIUB faculty, freshman batch (B1…Bn), course, or room and get an interactive weekly class routine, parsed client-side from AIUB's own offered-course spreadsheet. | DONE (v1.0) — deployment to GitHub Pages is the one remaining human step (needs maintainer's GitHub account) | Single-file static HTML/CSS/JS, zero backend; SheetJS (CDN) for in-browser `.xlsx` parsing; Node/jsdom regression tests (dev-only) | `docs/SCHEDULA_DOCUMENTATION.md` in the Schedula repo |

---

## Tool 1 — Schedula

- **Repo root files:** `index.html`, `data/Offered_Course_Report.xlsx`, `docs/`, `tests/`, `README.md`, `package.json`
- **What it does:** turns AIUB's "Offered Course Report" Excel export into a searchable, comparable,
  color-coded weekly routine — faculty search, freshman-batch (cohort) search, course search, room
  search, a two-entity compare mode with a common-free-time finder, filters, a printable table view,
  and shareable URL links.
- **Maintenance model:** replace `data/Offered_Course_Report.xlsx` once per semester (same file name,
  same path); nothing else needs to change. Full checklist in the tool's `README.md`.
- **Known open items:** not yet deployed to a live GitHub Pages URL; schema-drift resilience is
  designed-for but only tested against one semester's export so far. Full list in
  `docs/SCHEDULA_DOCUMENTATION.md` §13 ("Known Issues / Open TODOs").
- **Last session:** 2026-07-09 — first end-to-end build (concept → data investigation → architecture →
  implementation → automated testing → documentation). Deployment and first real semester swap are
  the next session's work.

---

*When starting a new tool in this Project, add a new row to the table above and a new `## Tool N —`
section below it following this same shape. When resuming work on an existing tool, update its row's
Status and its own `## Tool N` section here, and treat that tool's own `docs/..._DOCUMENTATION.md` as
ground truth over anything remembered from a past conversation.*
