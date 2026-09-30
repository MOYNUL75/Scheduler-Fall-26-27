# Schedula — Documentation

**Status:** DONE (v1.0, first end-to-end build) · **Stack:** static HTML/CSS/JS, zero backend · **Live doc owner:** this file
**Last updated:** 2026-07-09 · **Data snapshot the app ships with:** `Offered_Course_Report.xlsx` (4,402 structural rows, 4,109 scheduled sessions)

> Read this whole file before changing anything. It is written so that a different AI agent (Codex, Cursor, a future Claude session) or a future human maintainer with zero prior context can rebuild, extend, or debug this tool from this document alone.

---

## 1. Overview

**What it is.** Schedula is a single static web page (`index.html`) that turns AIUB's own
"Offered Course Report" Excel export into a searchable, comparable, visually laid-out weekly class
routine. A visitor can search a faculty member's name, a freshman batch code (B1, B2 … Bn), a
course code/title, or a room number, and see that entity's entire week rendered as a color-coded
grid — the same visual language as a printed university routine, but interactive.

**Who it's for.**
- **Students** looking up "when and where is my class" or "when is Professor X's office/teaching hour."
- **Freshman batches (B1…Bn)**, whose entire first-semester course load is fixed by cohort under AIUB's
  closed-credit system — searching the batch code alone reconstructs their whole personal weekly timetable.
- **Students/advisors comparing two schedules** (e.g., two faculty members, or a student's batch against
  a faculty member) to find a shared free slot for a meeting, advising session, or make-up class.

**Why it exists.** AIUB publishes this data as a single, unstyled multi-thousand-row spreadsheet.
Reading it by eye to answer "when is my class" or "when are both of us free" is slow and error-prone.
No AIUB-run tool currently turns this export into an interactive routine. This project closes that
gap with a tool that costs nothing to run (GitHub Pages), requires no login, and needs no maintenance
beyond replacing one file each semester.

**What it deliberately is not.** It is not a class-registration tool, not a conflict-free schedule
*generator* (it visualizes what already exists; it does not build a new timetable from constraints),
and not an official AIUB product — see §12 for the explicit unofficial-status disclaimer shown in the UI.

---

## 2. Literature Review

Three adjacent bodies of work inform this design: (a) research and commercial systems for
*visualizing* academic timetables, (b) research on *wrangling* messy, real-world spreadsheet data into
usable form, and (c) research and case studies on building useful software under the resource
constraints typical of student-run or civic/non-profit projects.

**(a) Timetable visualization.** de Souza Alencar et al. (2019) propose information-visualization
techniques specifically to surface *conflicts* in educational timetables and help non-specialist users
resolve them interactively, evaluating the approach on coverage, visual-mapping efficiency, interaction
support, and scalability. Wehrer and Yellen (2014) describe an interactive course-timetabling system
built around direct manipulation of a visual schedule rather than a fully automated solver, arguing that
human-in-the-loop visual tools remain valuable even where optimization algorithms exist. On the
production-software side, York University's Visual Schedule Builder lays out generated candidate
schedules on a color-coded weekly grid and flags tight cross-campus transitions, and CourseLeaf CLSS's
"Snapper" visualization breaks an institution's whole-week course load into a filterable, color-coded
view for schedulers. UniTime is a widely deployed open-source scheduling suite that layers timetable
construction, room sharing, and student scheduling on top of a maintained relational backend. Consumer
tools such as Coursicle let an individual student manually re-enter their own course list into a
weekly-grid planner and compare "what-if" course combinations. A recurring web-based timetable-generation
line of work (reported, e.g., in conference proceedings on genetic-algorithm timetabling for higher
education) applies heuristic optimization — genetic algorithms, graph coloring — to *construct* a
conflict-minimized institutional timetable from constraints, which is a different problem from the one
this project addresses (this project visualizes an *already-fixed* published timetable; it does not
construct one).

**(b) Data wrangling from messy, real-world sources.** Kandel, Heer, Plaisant, Kalinin, Hellerstein,
Parikh, and Shneiderman's widely cited research agenda on data wrangling argues that turning messy,
real data into a form usable for analysis or interfaces is typically the most time-consuming part of any
data-facing system, and calls specifically for tools that integrate verification, transformation, and
*visualization* rather than treating cleaning and presentation as separate stages — precisely the
integration this project attempts at a small scale for one institutional export. Guo, Kandel, Hellerstein,
and Heer's earlier UIST work on "proactive wrangling" frames end-user data cleaning as a mixed-initiative
programming problem, relevant background for why this project chose defensive, self-describing parsing
(§9) over a one-off hand-tuned script. A 2021 study on end-user needs around fragmented institutional
databases in higher education (published in an MDPI open-access journal) documents that non-specialist
staff and students routinely maintain "homebrew databases" stitched together from spreadsheets precisely
because centrally maintained systems don't expose the views they need — the exact situation this project
formalizes into a reusable interface rather than leaving as an ad hoc spreadsheet.

**(c) Building for resource-constrained contexts.** Work on civic technology capacity-building
(published in ScienceDirect, drawing on Cunha et al., 2019) observes that non-profit and other
resource-limited organizations frequently lack the technical, financial, and time resources to make full
use of the data they already hold — the same constraint that shapes this project's zero-backend,
zero-recurring-cost architecture (§6, §12), chosen specifically so that a single unfunded student
maintainer can sustain it indefinitely with a one-file replacement per semester and no server bill,
database migration, or hosting renewal to manage.

**References** (all URLs retrieved 2026-07-09; verify directly, as venue/volume metadata for two
web-only sources below could not be fully confirmed from the retrieved excerpt and should be checked
against the publisher page before citing this document elsewhere):

1. de Souza Alencar, W., do Nascimento, H. A. D., Jradi, W. A. R., Soares, F. A. A. M. N., & Felix, J. P. (2019). *Information Visualization for Highlighting Conflicts in Educational Timetabling Problems*. Springer. https://link.springer.com/chapter/10.1007/978-3-030-33720-9_21
2. Wehrer, A., & Yellen, J. (2014). The design and implementation of an interactive course-timetabling system. *Annals of Operations Research, 218*(1), 327–345. https://doi.org/10.1007/s10479-013-1384-6
3. Kandel, S., Heer, J., Plaisant, C., Kalinin, A., Hellerstein, J. M., Parikh, D., & Shneiderman, B. (2011). Research directions in data wrangling: Visualizations and transformations for usable and credible data. *Information Visualization*. https://www.researchgate.net/publication/261843443_Research_directions_in_data_wrangling_Visualizations_and_transformations_for_usable_and_credible_data
4. Guo, P. J., Kandel, S., Hellerstein, J. M., & Heer, J. (2011). Proactive wrangling: Mixed-initiative end-user programming of data transformation scripts. *Proceedings of the 24th ACM Symposium on User Interface Software and Technology (UIST)*, 65–74.
5. *End-User Needs of Fragmented Databases in Higher Education Data Analysis and Decision Making* (2021). MDPI (open access). https://www.mdpi.com/2227-9709/8/3/42 — *(author names not resolvable from the retrieved excerpt; verify on the publisher page.)*
6. *Building the capacities of civic tech communities through digital data analytics*, ScienceDirect (discussing Cunha et al., 2019 on resource constraints in non-profit data work). https://www.sciencedirect.com/science/article/pii/S2444569X19300599
7. UniTime — comprehensive educational scheduling system. https://sourceforge.net/projects/unitime/
8. York University Registrar's Office. *Visual Schedule Builder.* https://registrar.yorku.ca/enrol/guide/vsb
9. CourseLeaf CLSS — academic scheduling software with "Snapper" timetable visualization. https://www.courseleaf.com/software/clss/
10. Coursicle — student course schedule planner. https://www.coursicle.com/course-planner/
11. *Design and Implementation of a Web-Based Timetable System for Higher Education Institutions* (genetic-algorithm PHP timetable generator, presented at the 18th International Istanbul Scientific Research Congress). https://www.researchgate.net/publication/351359363 — *(author names not resolvable from the retrieved excerpt; verify on the publisher page.)*

---

## 3. Research Gap

The timetable-visualization literature and the production tools in §2(a) — UniTime, CourseLeaf CLSS,
Visual Schedule Builder, the genetic-algorithm generators — all assume the deploying institution
maintains a structured, queryable backend (a database, an SIS integration, an API) that a visualization
or optimization layer sits on top of. Coursicle assumes the opposite extreme: no institutional feed at
all, with the student manually re-entering every course. Neither model fits a very common real situation,
especially at smaller or resource-constrained institutions (§2c): the *only* artifact publicly available
is a single, human-formatted, semi-structured spreadsheet, re-exported every semester with no guaranteed
schema stability, no API, and cell-level irregularities that only resolve correctly with
format-specific heuristics — for example (confirmed by direct inspection of AIUB's actual export while
building this tool, §9):

- **Multi-valued cells**: some `Faculty` cells list several co-instructors bracketed together in one
  string (`"[NAME A] [NAME B] [NAME C]"`), not one name per row — 214 of 4,402 rows in the snapshot this
  app ships with.
- **Ambiguous, overloaded identifiers**: the `Section` column uses the same literal codes (`"A"`, `"B"`,
  `"C"` …) for two structurally different concepts that the source data never distinguishes: (1) a
  reused, single-course section label attached to hundreds of unrelated course offerings university-wide
  (e.g., literal section `"A"` appears on 492 distinct course codes), and (2) a numbered cohort code
  (`"B1"`, `"G105"`, …) that uniquely identifies one closed-credit student batch's *entire* weekly course
  load across multiple departments. Nothing in the file marks which meaning applies to a given row; it
  must be inferred from the code's shape.
- **Redundant, denormalized labels**: the section code is duplicated inside the free-text course-title
  string (`"INTRODUCTION TO PROGRAMMING [B1]"`), which must be stripped for clean display without losing
  information if the bracket is ever absent.

Kandel et al. (2011) explicitly call for systems that integrate data verification, transformation, and
*visualization* rather than treating spreadsheet cleanup as a separate, throwaway preprocessing step —
but the worked examples in that literature and in general-purpose tools (OpenRefine, Trifacta) target
data analysts cleaning data for their own downstream use, not a zero-maintenance, semester-over-semester
public-facing interface maintained by one non-specialist person replacing one file. **The gap this
project addresses**: there is no documented, reusable design for collapsing the wrangling step and the
interactive-visualization step for *one recurring, uncontrolled, single-sheet institutional export* into
a single client-side artifact — with defensive parsing that survives the export's own year-to-year drift,
and with an explicit, empirically derived rule for the ambiguous-identifier problem above — cheap enough
for an unfunded student maintainer to sustain indefinitely with no server, database, or recurring cost.

---

## 4. Novelty

Relative to the research gap in §3, this build's concrete, checkable contributions are:

1. **Schema-inferring parser, not a hardcoded column map.** `findHeaderRow()` (§9) scans the first 30
   rows for the row containing the literal header cells `"Class ID"`, `"Faculty"`, and `"Section"`, then
   builds a name→column-index map from whatever header row it finds — rather than assuming, e.g.,
   "column H is always Faculty." This means a future semester's export can add, remove, or reorder
   columns, or add/remove the leading blank spacer column (present in the current export), without
   breaking the app, directly responding to the "fragmented, homebrew spreadsheet" instability documented
   in the higher-ed end-user data literature (Kandel et al., 2011; MDPI 2021, §2).
2. **An empirically derived, regex-based cohort/generic section disambiguation rule**, not an assumption.
   Section codes matching `^[A-Za-z]{1,3}\d{1,4}$` (letters *then* digits — `B1`, `G105`) are offered as
   standalone "batch" search entities whose *entire* weekly load merges safely across course and
   department boundaries; plain-letter codes (`A`, `B`, `C`) are not, because direct inspection of the
   real data (§9, and `tests/test_parser.js`) showed the numbered form clusters into a normal 2–7-course
   semester load per code, while the plain-letter form is reused across as many as 492 *unrelated* courses
   university-wide under the same literal label. This rule was derived from the data, not assumed from
   the user's description of the closed-credit system, and is small enough (one regex + a grouping
   query) to fit the zero-budget, no-ML-infrastructure constraint from §2(c) — a deliberately
   lightweight alternative to the general entity-resolution research Kandel et al. (2011) call for.
3. **Correct multi-instructor attribution.** `parseFacultyList()` (§9) splits bracket-delimited
   co-instructor cells so every named instructor individually gets the class on *their own* personal
   schedule — a concrete, verified fix (§11) for the multi-valued-cell problem named in §3, applied to
   this specific institutional format rather than solved generically.
4. **A "shared free time" view, not a conflict view.** The prior visualization literature (de Souza
   Alencar et al., 2019) targets *scheduler-facing* conflict detection (flagging double-bookings during
   timetable construction). This project's compare mode instead computes and displays common *free*
   windows between two already-fixed schedules (§9's `computeFreeWindows`) — the everyday
   student/advisor question ("when can we both meet") rather than the administrative one.
5. **Zero-backend, version-controlled "database."** The entire system — code and data — lives in one
   Git repository and deploys as two static files with no server process, matching the resourcing
   reality described in §2(c) for small, unfunded maintainers.

**Honest scope of this novelty.** Items 1, 3, and 5 are applied-engineering contributions — a specific,
tested solution to a specific, previously undocumented data problem — not new algorithms or theory.
Item 2 is an empirical heuristic validated against one institution's one snapshot; it is *not* yet shown
to generalize. A genuinely publishable claim (e.g., for a systems/experience-report track such as
SIGCSE/ITiCSE or a regional CS conference, rather than a top algorithms or HCI venue) would need, at
minimum: (a) the same disambiguation heuristic tested against several other universities' exports to
measure how often the letters-then-digits pattern actually holds, (b) a small user study timing
"find when X is free" against the status quo (manually scanning the spreadsheet) to quantify the claimed
usability gain, and (c) at least one full semester of production use to see how often the defensive
parser in fact survives real schema drift rather than merely being designed to. None of that evaluation
has been run yet — see §13.

---

## 5. Architecture

```
                    ┌──────────────────────────────┐
                    │   GitHub Pages (static host)  │
                    │  serves 2 files, nothing else │
                    └───────────────┬────────────────┘
                                    │  HTTPS GET
                     ┌──────────────┴───────────────┐
                     │                               │
              index.html                 data/Offered_Course_Report.xlsx
      (HTML shell + CSS + all JS)         (replaced once per semester)
                     │
        visitor's browser, on load:
        1. fetch(data/....xlsx)  ──────────────► arrayBuffer
        2. XLSX.read(arrayBuffer) [SheetJS, CDN] ─► workbook
        3. findHeaderRow + column map           ─► normalized `records[]`
        4. buildIndices(records)                ─► faculty / sections / courses / rooms maps
        5. buildSearchIndex(idx)                 ─► flat searchable entity list
        6. user searches → selectEntity()        ─► renderSingle() / renderCompare()
        7. renderSingle/Compare                  ─► DOM: SVG-free HTML/CSS absolute-positioned grid
```

There is no server-side component anywhere in this system. All parsing, indexing, search, rendering,
and the free-time computation happen in the visitor's browser, once per page load, entirely from the one
`.xlsx` file. Nothing is sent anywhere; there is no analytics or tracking call in the code.

**Data flow inside `index.html` (functions, in call order from `boot()`):**
`loadWorkbook()` → `findHeaderRow()` / `parseFacultyList()` / `stripSectionSuffix()` /
`parseTimeToMinutes()` (per-row cleaning) → `buildIndices()` (groups records by faculty / section /
course / room) → `buildSearchIndex()` (flattens those groups into one searchable entity list, applying
the cohort-section regex from §4.2) → `renderFilterUI()` / `renderQuickChips()` / `wireSearchSlot()`
(UI wiring) → `applyHash()` (restores a shared/bookmarked view, if the URL has one) → on selection,
`renderSingle()` or `renderCompare()` → `packEvents()` (overlap-column layout per day) →
`eventBlockHtml()` (per-class DOM block) → `renderGaps()` (compare mode only) → `renderTable()`
(accessible/printable list view of the same data).

---

## 6. Tech Stack

| Layer | Choice | Version / source | Why |
|---|---|---|---|
| Markup/styling/logic | Plain HTML5 + CSS3 + vanilla ES2020+ JS | — | Single-file requirement; no build step to break across semesters. |
| Spreadsheet parsing | [SheetJS](https://sheetjs.com) `xlsx.full.min.js` | `https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js` (authoritative CDN per docs.sheetjs.com, verified 2026-07-09) | Only realistic way to parse a real `.xlsx` binary entirely client-side; no server-side conversion step to maintain. |
| Fonts | Google Fonts: Space Grotesk (display), Inter (body), IBM Plex Mono (data/time/room codes) | `fonts.googleapis.com` `<link>` in `<head>` | Non-functional dependency — if it fails to load, the browser falls back to system fonts with no loss of function. See §9 design rationale for why three distinct type roles were used. |
| Hosting | GitHub Pages | — | Free, matches the zero-budget constraint (§2c, §4.5); "deploy" = git push. |
| Dev-only tooling (not shipped) | Node.js, `xlsx` npm package, `jsdom` | package.json: `xlsx@^0.18.5`, `jsdom@^29.1.1` | Used only by `tests/` to validate parsing logic before each deploy; never loaded by real visitors. |

**No framework, no bundler, no package manager step for the shipped app.** This is a deliberate
decision (§9) — see Key Design Decisions.

---

## 7. File / Folder Structure

```
schedula/
├── index.html                         # THE APP. Single file: <head> (meta, fonts, SheetJS CDN,
│                                       #   ~340 lines CSS in one <style>), <body> (HTML shell:
│                                       #   header, hero, search UI, filters, grid container,
│                                       #   detail overlay, footer), <script> (~430 lines JS, all
│                                       #   logic — see §5 call graph).
├── data/
│   └── Offered_Course_Report.xlsx     # THE DATABASE. Fetched at runtime by index.html via a
│                                       #   hard-coded relative path (CONFIG.DATA_URL). Replace this
│                                       #   exact file, exact name, exact path each semester — nothing
│                                       #   else needs to change. See §12 for the update procedure.
├── docs/
│   └── SCHEDULA_DOCUMENTATION.md   # this file
├── tests/
│   ├── test_parser.js                 # Fast, DOM-free: re-derives parsing rules against the real
│                                       #   xlsx via the Node `xlsx` package and asserts exact row/
│                                       #   faculty/warning counts for the shipped data snapshot.
│   ├── test_dom.js                    # Full simulation: loads index.html into jsdom, injects a
│                                       #   Node-compatible XLSX global and a `fetch` stub that reads
│                                       #   the local file, then actually runs boot(), search,
│                                       #   single-entity render, compare render, gap computation,
│                                       #   table view, and the detail popover — i.e. it executes the
│                                       #   REAL browser code path, not a reimplementation.
│   └── test_coinstructor.js           # Targeted regression for the multi-instructor bug found and
│                                       #   fixed during this build (§11) — asserts a known co-taught
│                                       #   row correctly produces 3 separate faculty entities.
├── package.json                       # devDependencies for tests/ only; the shipped app has zero
│                                       #   npm dependency (SheetJS loads from its own CDN at runtime).
├── package-lock.json
└── README.md                          # Quick start, deploy steps, semester-update steps.
```

No other files exist in the repo. `index.html` and `data/Offered_Course_Report.xlsx` are the only
two files GitHub Pages needs to serve; everything else is developer-facing.

---

## 8. Setup & Run Instructions

**From a clean machine, to run locally:**

```bash
git clone <this-repo-url> schedula
cd schedula

# Serve the folder (do NOT open index.html by double-clicking — see note below)
npx serve .
# or: python3 -m http.server 8000
# or: php -S localhost:8000

# then open the printed http://localhost:... URL in a browser
```

**Why a server is required for local testing:** `index.html` calls `fetch('./data/Offered_Course_Report.xlsx')`.
Browsers block `fetch()` of local files opened via the `file://` protocol (a CORS restriction), so
double-clicking `index.html` will show the app's own "could not load the schedule data" error banner. Any
static file server fixes this.

**To run the test suite:**

```bash
npm install       # installs jsdom + xlsx, dev-only, not used by the shipped app
npm test          # runs all three scripts in tests/, see §11 for expected output
```

**To deploy (GitHub Pages):** see the step-by-step in `README.md` §"Deploying to GitHub Pages." In
short: push this folder to a public GitHub repo's default branch, then in **Settings → Pages** set
*Deploy from a branch* → that branch → `/ (root)`. No build step, no CI required (though adding
`npm test` as a GitHub Action pre-merge check would be a reasonable future addition — see §13).

**To update the data each semester:** replace `data/Offered_Course_Report.xlsx` in place (same file
name, same folder), commit, push. See `README.md` for the full checklist, including running
`npm test` first as a sanity check against the new file.

---

## 9. Key Design Decisions & Rationale

**Single static file, zero backend, zero build step — chosen over any framework/bundler.**
*Rejected:* React/Vue + a build pipeline, or a small backend (Node/Flask) to pre-parse the spreadsheet
server-side. *Why rejected:* the explicit brief was one HTML file deployable to GitHub Pages for free by
a single non-professional maintainer; a build step or server is one more thing to break, one more
dependency to go stale, and one more reason the "replace one file each semester" maintenance model would
stop working after the original builder graduates. *Trade-off accepted:* all 4,402 rows are parsed in
every visitor's browser on every page load. Measured to be well under a second in the Node/jsdom
simulation (§11) for a dataset this size; would need revisiting only if the export grew by roughly two
orders of magnitude.

**Client-side `.xlsx` parsing via SheetJS, rather than pre-converting to JSON at commit time.**
*Considered alternative:* a small script that converts the `.xlsx` to a `data.json` checked into the
repo, so the browser never parses a spreadsheet at all. *Why not chosen:* it would reintroduce exactly
the "one more build step a non-technical maintainer must remember to run" problem the single-file
constraint exists to avoid — forgetting to regenerate `data.json` after replacing the `.xlsx` would
silently serve stale data with no error. Fetching and parsing the real `.xlsx` directly means the file
the maintainer replaces *is* the data source, with no intermediate artifact that can drift out of sync.
*Trade-off accepted:* a hard runtime dependency on the SheetJS CDN being reachable (mitigated only by
using the library's own authoritative CDN, §6; a fully offline-proof version would need to vendor the
script into the repo, noted as a TODO in §13).

**Schema-inferring header detection instead of fixed column indices.** See §4.1 and §3. Directly
motivated by the observed fragility of institutional spreadsheet exports in the literature (§2b) and
by the fact that this exact export already has one structural quirk (a leading blank spacer column)
that would break a fixed-index parser on day one.

**Regex-based cohort/generic section split, not a hand-maintained allowlist.** *Considered
alternative:* hardcode the known list of freshman batch codes for the current semester. *Why not
chosen:* it would need manual updating every semester as batches are added, defeating the
"replace one file, nothing else" maintenance goal — exactly the problem this project exists to avoid
elsewhere. The regex rule, once derived and validated against the real data (§4.2, §11), needs no
per-semester maintenance as long as AIUB's own naming convention holds.

**Curated jewel-tone palette (deterministically hashed per class ID), not a fixed single color per
type.** In single-entity view, each distinct class keeps a stable color across every render (same hash
input → same palette slot), echoing the reference routine image's visual language, so a student can
learn to recognize "their Thursday lab is always that maroon block" across sessions. In compare mode,
this is deliberately dropped in favor of exactly two flat lane colors (teal/amber) plus a legend,
because the comparison view's job is "whose class is this," not "which specific class is this" — using
per-class colors in both lanes at once would have doubled the palette and made the two schedules harder,
not easier, to visually separate.

**Typography: three distinct type roles (Space Grotesk display / Inter body / IBM Plex Mono for all
codes — times, room numbers, section codes, class IDs).** The monospace treatment for schedule metadata
is the page's one deliberate signature choice (per the frontend-design brief this was built against):
it reads as a departure-board/ledger convention appropriate to a timetable, is functionally justified
(these values genuinely are codes, not prose), and avoids the generic "one font everywhere" default
without adding decoration that doesn't serve the content.

**"Freshman/Open/Reserved" shown by default; "Cancel/Closed" hidden behind a filter toggle.** These
rows either have no day/time data at all (`Closed` — confirmed empty in every one of the 293 unscheduled
rows in the current snapshot, §11) or represent a class not actually running this term (`Cancel`).
Showing them by default in a *weekly grid* view would be actively misleading (an empty grid slot implies
"free," not "cancelled"); they remain fully visible in the table view and are one click away via the
Status filter for anyone who specifically wants them (e.g., to audit what was cancelled).

**No invented building-name mapping for room codes.** The source data gives only room codes (`5108`,
`DS0203`, `TBA`) with no authoritative building-name legend. Rather than guess a scheme (e.g., "5xxx =
Building 5") and risk stating something false, the tool shows the code exactly as published and nothing
more. This is a conscious accuracy-over-polish trade-off — see §13 for how to add real building names if
an authoritative mapping is later obtained from AIUB.

---

## 10. API / Interfaces

There is no network API — this is a static, client-only app. The "interface" surface is the internal
JS function contracts inside `index.html`'s `<script>`, documented here so another agent can call or
extend them correctly.

**Record shape** (one row of the parsed spreadsheet, after `loadWorkbook()`):
```ts
{
  classId: string,        // e.g. "00065" — groups multi-day meetings of one enrolled class
  courseCode: string,     // upper-cased, e.g. "CSC1103"
  status: string,         // one of "Open" | "Freshman" | "Reserved" | "Cancel" | "Closed" | "Unknown"
  capacity: string,       // raw numeric string, may be ""
  count: string,          // raw numeric string (enrolled), may be ""
  courseTitle: string,    // cleaned: trailing " [SECTION]" suffix stripped
  section: string,        // raw code as published, e.g. "B1" or "A"
  facultyList: string[],  // 0..n instructor names, split from multi-bracket cells (see §4.3, §11)
  faculty: string|null,   // facultyList joined with " & ", or null if unassigned ("-")
  type: string|null,      // "Theory" | "Lab" | null
  day: string|null,       // "Monday".."Sunday" or null (Closed rows have no day)
  startTime: string|null, // original label, e.g. "1:00 PM"
  endTime: string|null,
  startMin: number|null,  // minutes since midnight, or null if unparseable/absent
  endMin: number|null,
  room: string|null,
  department: string|null,
}
```

**Entity shape** (one searchable item, after `buildSearchIndex()`):
```ts
{
  type: 'faculty'|'section'|'course'|'room',
  id: string,        // faculty: normalized name; section: code; course: course code; room: code
  label: string,     // display label
  sub: string,       // secondary line shown in the search dropdown
  records: Record[],
  norm: string,       // normalized (lowercased, accent-stripped) label, for search matching
}
```

**Key functions** (call signature and contract):
- `searchEntities(query: string, limit=30): Entity[]` — token-substring scored search over the flat
  entity index; pure function, no side effects, safe to call on every keystroke.
- `selectEntity(entity: Entity, slot: 'A'|'B'): void` — sets `STATE.slotA`/`STATE.slotB`, updates
  `location.hash` for shareable/bookmarkable URLs, and triggers a re-render. Side-effecting.
- `renderSingle(entity: Entity): void` / `renderCompare(a: Entity, b: Entity): void` — full DOM
  re-render of the grid, meta header, legend, table, and (compare only) the gaps panel.
- `computeFreeWindows(dayRecords: Record[]): [number,number][]` — pure function; merges busy
  intervals and returns free `[startMin,endMin]` windows ≥ `CONFIG.MIN_GAP_MIN` (20) within
  `[STATE.gridStart, STATE.gridEnd]`.

**URL/hash contract** (for shareable links): `#faculty=<id>`, `#section=<id>`, `#course=<id>`,
`#room=<id>` for a single view; `#cmp=typeA:idA|typeB:idB` for a compare view. IDs are
`encodeURIComponent`-escaped. `applyHash()` parses this on load and on `hashchange`.

---

## 11. Testing

**Philosophy:** every parsing rule that materially affects correctness (header detection, time
parsing, faculty-cell splitting, section stripping) is checked against the **real, current**
`data/Offered_Course_Report.xlsx` — not a synthetic fixture — so the tests double as a data-health
check for future semesters, not just a code-correctness check for this one.

**What's covered (run via `npm test`, or individually with `node tests/<file>.js`):**

- `tests/test_parser.js` — DOM-free, fast. Re-derives the header-detection, time-parsing, and
  faculty-splitting rules directly (Node `xlsx` package only) and asserts, against the shipped
  snapshot: header auto-detected at row 0; exactly 4,402 structural rows parsed; exactly 4,109 of
  those have both a day and parseable start/end time; zero time strings fail to parse; exactly 434
  distinct individual instructors after splitting co-taught cells; a specific known co-taught row
  (`ARC1114`/section `D1`) splits into exactly 3 named instructors.
- `tests/test_dom.js` — full simulation. Loads the actual `index.html` into `jsdom`, stubs `fetch`
  to read the local `.xlsx` and injects the Node `xlsx` package as the `XLSX` global (same API
  surface as the browser build), then really executes `boot()` and exercises: entity counts by type,
  free-text search for a faculty name / batch code / course code / room code, a single-entity render
  (asserting grid bounds and per-day block counts), a compare render (asserting the gaps panel and
  legend populate), a course-level render (the many-sections-at-once view that mirrors the reference
  routine image), the detail popover opening on block click, and that the default status filters
  (Freshman checked, etc.) render correctly. This runs the *real* shipping code, not a
  reimplementation, so it also functions as a syntax/runtime smoke test for `index.html` itself.
- `tests/test_coinstructor.js` — targeted regression for the multi-instructor bug (below).

**A real bug this test suite caught during the build:** the first parser implementation treated
`Faculty` as a single bracketed name per cell (`normFaculty()`). Running `test_dom.js` against the real
file surfaced garbled entities like `"Mashiour Rahman] [Dr. Md. Saef Ullah Miah"` in search results —
214 rows actually contain **multiple** bracketed co-instructor names in one cell (architecture
studio/critique courses in particular). This was fixed by replacing the single-name normalizer with
`parseFacultyList()`, which extracts every bracketed group and indexes each instructor separately
(§4.3, §9). `tests/test_coinstructor.js` locks this fix in as a permanent regression test. **Lesson for
future maintainers:** always run the DOM-level test against the real current file after any parsing
change, not just the fast parser-only test — this class of bug (correct-looking code, wrong on real
data) only showed up once real rows were actually rendered.

**Known gaps in test coverage** (see also §13): no automated visual/screenshot regression test (no
headless-browser tool was available in the build environment; testing relied on `jsdom` + manual
reasoning about the CSS instead of pixel comparison); no test of the URL hash sharing feature beyond
manual code review; no cross-browser test matrix; no test against a *second* semester's export (only
one snapshot has ever existed for this repo so far), so the schema-drift resilience claimed in §4.1 is
untested in practice, only designed for.

---

## 12. Deployment

**Target environment:** GitHub Pages, "Deploy from a branch," repo root, no build step. See the exact
step-by-step in `README.md`.

**Current live status:** not yet deployed by the maintainer as of this writing — this documentation and
codebase are the complete, ready-to-deploy v1.0 artifact. **Explicit open item for the human maintainer:**
create the GitHub repository, push these files, and enable Pages in Settings — this is the one step in
the "Concept → Architecture → Implementation → Testing → Deployment → Documentation" pipeline that
requires the maintainer's own GitHub account and cannot be completed inside this chat.

**Semester update procedure** (the only recurring maintenance this project requires):
1. Replace `data/Offered_Course_Report.xlsx` with the new semester's export, same file name, same path.
2. Optionally run `npm install && npm test` locally to catch schema drift before pushing.
3. Commit and push. GitHub Pages redeploys automatically within about a minute.
4. Spot-check the live site's footer "Data diagnostics" panel for sane row/faculty/course counts.

**Rollback:** since the data file is just a tracked file in git, reverting to a previous commit
restores the previous semester's data instantly — no database migration involved.

---

## 13. Known Issues / Open TODOs

**Priority: high**
- [ ] **Not yet actually deployed to GitHub Pages** — needs the maintainer's own GitHub account (§12).
- [ ] **Validated against only one semester's export.** The schema-inferring parser and the
  cohort-section regex (§4) are designed to survive schema drift but have only ever been tested
  against the single snapshot in this repo. Re-run `npm test` immediately after the *first* real
  semester swap and fix forward if anything breaks, then note the outcome here.

**Priority: medium**
- [ ] **No offline fallback if the SheetJS CDN is unreachable.** Vendoring `xlsx.full.min.js` into the
  repo (SheetJS's own documented alternative to CDN loading) would remove this single external
  runtime dependency at the cost of a larger repo and a manual step to update the library version.
- [ ] **No automated visual regression testing.** `tests/` proves the data and DOM structure are
  correct; nothing currently proves the CSS renders pixel-correctly across browsers. Adding a headless
  screenshot test (e.g., Playwright) would close this gap.
- [ ] **Room codes are shown as-is, with no building-name mapping** (§9) — add one only if AIUB
  publishes an authoritative code→building legend; do not guess.
- [ ] **No CI.** Wiring `npm test` into a GitHub Action on every push/PR would catch a broken
  `data/Offered_Course_Report.xlsx` swap automatically instead of relying on the maintainer to run
  tests locally.

**Priority: low / future research (see §4's honest-scope note)**
- [ ] Validate the cohort/generic-section regex heuristic against other institutions' exports if this
  approach is ever generalized beyond AIUB.
- [ ] Run a small timed user study (find-when-X-is-free, tool vs. manually scanning the raw
  spreadsheet) to turn the novelty claims in §4 into an evaluated, citable result.
- [ ] Consider an opt-in "my saved views" feature (e.g., pinning a favorite faculty/batch) — deliberately
  out of scope for v1 to keep the zero-backend constraint (nothing to persist server-side); a
  `localStorage`-based version would be the natural next step and does not require a backend.

---

## 14. Changelog

**2026-07-09 — v1.0, first end-to-end build.**
- Investigated the real `Offered_Course_Report.xlsx` (4,402 structural rows, 14 columns, one sheet)
  directly with pandas/openpyxl and a mirrored Node parser before writing any UI code.
- Discovered and designed around three real data quirks: multi-instructor bracketed cells (214 rows),
  the ambiguous cohort-vs-generic section-code collision (§3), and the redundant section-suffix embedded
  in course titles.
- Built the single-file app: schema-inferring parser, faculty/section/course/room search index, dark
  jewel-toned weekly grid renderer (single-entity and two-entity compare-with-lane-split modes), a
  common-free-time computation for compare mode, a filter panel (department/status/day/type), a
  sortable/accessible table view, a click-through detail popover, shareable URL hashes, and a
  self-diagnostic panel in the footer.
- Wrote and ran a three-part regression suite (`tests/`) against the real data file, using a full
  `jsdom` simulation of the actual shipped `index.html` rather than a reimplementation.
- **Bug found and fixed via testing, not by inspection alone:** the first faculty-parsing implementation
  mishandled multi-instructor cells; caught by `tests/test_dom.js`, fixed with `parseFacultyList()`,
  locked in with `tests/test_coinstructor.js` (§11).
- Wrote this documentation, `README.md`, and drafted the `MASTER_INDEX.md` entry.
- **Not done in this session:** actual GitHub repo creation and Pages deployment (§12, §13 — requires
  the maintainer's own GitHub account).
