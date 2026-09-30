<div align="center">
  <img src="assets/schedula-mark.svg" alt="Schedula logo" width="118" />

  # Schedula

  **A zero-backend academic timetable intelligence interface for AIUB offered-course data.**

  Search any AIUB faculty member, freshman batch (`B1`, `B2` ... `Bn`), course, or room and get the
  full weekly class routine instantly, styled as a dark weekly grid, straight from AIUB's own
  offered-course report. No login, no backend, no database.

  [![Live App](https://img.shields.io/badge/Live%20App-GitHub%20Pages-2f8f88?style=for-the-badge&logo=githubpages&logoColor=white)](https://the-sudipta.github.io/schedula/)
  [![Repository](https://img.shields.io/badge/Repository-the--sudipta%2Fschedula-101b26?style=for-the-badge&logo=github&logoColor=white)](https://github.com/the-sudipta/schedula)
  [![License](https://img.shields.io/badge/License-Proprietary%20Research%20Use-ffb648?style=for-the-badge)](LICENSE)
  [![Status](https://img.shields.io/badge/Status-Research%20Prototype-49c7c0?style=for-the-badge)](docs/SCHEDULA_DOCUMENTATION.md)

  [![HTML](https://img.shields.io/badge/HTML5-single%20file-e34f26?logo=html5&logoColor=white)](index.html)
  [![CSS](https://img.shields.io/badge/CSS3-responsive%20UI-1572b6?logo=css3&logoColor=white)](index.html)
  [![JavaScript](https://img.shields.io/badge/JavaScript-client%20side-f7df1e?logo=javascript&logoColor=111)](index.html)
  [![SheetJS](https://img.shields.io/badge/SheetJS-XLSX%20parser-2f8f88)](https://sheetjs.com)
  [![Zero Backend](https://img.shields.io/badge/Backend-none-0a1119)](docs/SCHEDULA_DOCUMENTATION.md)
  [![Data](https://img.shields.io/badge/Data-AIUB%20Offered%20Course%20Report-8ea2af)](data/Offered_Course_Report.xlsx)
</div>

---

## Repository Details

Use these in the GitHub **Edit repository details** form:

| Field | Text |
|---|---|
| Description | `Schedula is a zero-backend academic timetable research interface that turns AIUB offered-course spreadsheets into searchable weekly routines for faculty, batches, courses, and rooms.` |
| Website | `https://the-sudipta.github.io/schedula/` |
| Topics | `schedula aiub timetable routine schedule academic-scheduling course-planning spreadsheet-wrangling data-visualization static-site github-pages sheetjs xlsx vanilla-js research-prototype student-project` |

## Why Schedula Matters

Most routine lookup problems in universities are not caused by a lack of data. They are caused by data
being trapped in spreadsheet formats that are technically public but practically difficult to search,
compare, and reason about. Schedula treats the offered-course report as a version-controlled data source
and turns it into an interactive interface that students, faculty, advisors, and researchers can inspect
without a server or institutional API.

This repository is also a compact research artifact: it documents a small but complete pipeline for
spreadsheet wrangling, entity disambiguation, client-side parsing, schedule visualization, and free-time
comparison under severe deployment constraints.

## Research Contributions

| Contribution | What Schedula Demonstrates |
|---|---|
| Spreadsheet-to-interface pipeline | A raw `.xlsx` offered-course report becomes a searchable weekly routine without preprocessing or a backend. |
| Schema-resilient parsing | The parser detects the header row and maps columns by name instead of relying on brittle fixed positions. |
| Multi-instructor attribution | Bracketed co-instructor cells are split so each instructor receives the class in their own schedule. |
| Cohort-aware section search | Batch-like section codes such as `B1` are exposed as schedule entities while generic single-letter sections are not over-merged. |
| Zero-cost deployment model | GitHub Pages serves the app and data, making the system maintainable by one student with a one-file semester update. |
| Research reproducibility | Documentation and regression tests describe the data assumptions and verify key parsing rules against the real spreadsheet. |

For deeper academic positioning, see [RESEARCH.md](RESEARCH.md). For data-use scope, see
[DATA_STATEMENT.md](DATA_STATEMENT.md).

## Live App

**Live app:** [https://the-sudipta.github.io/schedula/](https://the-sudipta.github.io/schedula/)

**Full technical documentation:** [docs/SCHEDULA_DOCUMENTATION.md](docs/SCHEDULA_DOCUMENTATION.md)

## How It Works, In One Paragraph

`index.html` is a single static file (HTML + CSS + JS, no build step). When a visitor opens it,
their browser fetches `data/Offered_Course_Report.xlsx` from the same repo, parses it in-memory
using [SheetJS](https://sheetjs.com) (loaded from its CDN), and builds a searchable weekly
schedule entirely client-side. There is no server, no API, and no database. GitHub Pages just
serves static files.

## Feature Matrix

| Feature | Status |
|---|---|
| Faculty routine search | Implemented |
| Freshman batch routine search | Implemented |
| Course and room lookup | Implemented |
| Weekly visual grid | Implemented |
| Detail popover for class blocks | Implemented |
| Spreadsheet diagnostics | Implemented |
| Compare/free-window view | Implemented but needs additional browser QA before public claims |
| Semester data replacement workflow | Documented |
| Backend/database/API | Intentionally none |

## Architecture Snapshot

```mermaid
flowchart LR
  A["Offered_Course_Report.xlsx"] --> B["Browser fetch"]
  B --> C["SheetJS workbook parser"]
  C --> D["Schema-inferring row normalizer"]
  D --> E["Faculty, batch, course, room indices"]
  E --> F["Search and filters"]
  F --> G["Weekly routine grid"]
  F --> H["Table and diagnostics"]
```

## Repo Layout

```text
/
|-- index.html                         <- the entire app (HTML+CSS+JS in one file)
|-- assets/
|   `-- schedula-mark.svg              <- Schedula logo and favicon source
|-- data/
|   `-- Offered_Course_Report.xlsx     <- replace this file each semester (same name and path)
|-- docs/
|   `-- SCHEDULA_DOCUMENTATION.md      <- full build/rebuild manual
|-- tests/                             <- Node-based regression tests (dev-only)
|   |-- test_parser.js                 <- fast, no-DOM parsing checks
|   |-- test_dom.js                    <- full jsdom simulation of the real page
|   `-- test_coinstructor.js           <- multi-instructor edge-case regression
|-- CITATION.cff                       <- citation metadata for academic reference managers
|-- RESEARCH.md                        <- research framing, method, limitations, evaluation ideas
|-- DATA_STATEMENT.md                  <- data source, processing, accuracy, and privacy statement
|-- LICENSE                            <- proprietary, permission-required license
|-- NOTICE                             <- ownership and permitted-reference notice
|-- CONTRIBUTING.md                    <- contribution policy
|-- SECURITY.md                        <- vulnerability reporting policy
|-- SUPPORT.md                         <- support and contact guidance
|-- CODE_OF_CONDUCT.md                 <- community expectations
`-- package.json                       <- devDependencies for running tests
```

## Updating The Routine Each Semester

1. Get the new `Offered Course Report` export from AIUB.
2. Save it as exactly `Offered_Course_Report.xlsx`.
3. Replace the file at `data/Offered_Course_Report.xlsx` in this repo.
4. Commit and push to the branch GitHub Pages serves from.
5. Open the live site and use **Data diagnostics** in the footer to sanity-check the row, faculty, and course counts.
6. Optionally run `npm install && npm test` locally first. The tests parse the real file and should fail loudly if AIUB changed the column layout in a way the app cannot handle.

## Deploying To GitHub Pages

1. Push this folder's contents to the repository root.
2. In the repository, go to **Settings -> Pages**.
3. Set **Build and deployment -> Source** to **Deploy from a branch**.
4. Select `main` or `gh-pages`, then `/ (root)`.
5. Visit `https://<your-username>.github.io/<repo-name>/`.

No secrets, no environment variables, no build pipeline. That is the whole deployment.

## Running Locally

Opening `index.html` by double-clicking it will not work reliably because browsers block `fetch()` of
local files under the `file://` protocol. Serve the folder instead:

```bash
# any of these work
npx serve .
python3 -m http.server 8000
php -S localhost:8000
```

Then open the printed `http://localhost:...` URL.

## Running The Tests

```bash
npm install
npm test
```

This runs three Node scripts against the real `data/Offered_Course_Report.xlsx`. See
[docs/SCHEDULA_DOCUMENTATION.md](docs/SCHEDULA_DOCUMENTATION.md) section 11, "Testing", for what each
one checks.

## Citation

If you discuss, evaluate, or cite this repository in academic work, please use the metadata in
[CITATION.cff](CITATION.cff). A plain-text version:

```text
Sudipta. (2026). Schedula: A zero-backend academic timetable intelligence interface for AIUB offered-course data. GitHub. https://github.com/the-sudipta/schedula
```

## License And Use Permission

This project is **not open source**. Source code is visible for academic review, demonstration, and
portfolio evaluation, but copying, redistributing, reusing, modifying, deploying, or commercializing the
project requires prior written permission from the owner. See [LICENSE](LICENSE) and [NOTICE](NOTICE).

## Status

**Unofficial student research project.** Not affiliated with, endorsed by, or maintained by AIUB
administration. Data accuracy depends entirely on the uploaded `.xlsx` matching AIUB's own published
offered-course report.
