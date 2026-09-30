# Research Framing

Schedula is positioned as a compact applied-research artifact in academic data wrangling, timetable
visualization, and low-resource software deployment.

## Research Problem

Universities often publish useful operational data as spreadsheets. These files are visible but not
necessarily usable: they require manual scanning, contain overloaded identifiers, and are difficult to
query for everyday questions such as:

- When is a faculty member teaching?
- What is the full weekly routine for a freshman batch?
- Which room is used by a course?
- When are two schedules both free?

Schedula investigates how far a single static web artifact can go in turning that spreadsheet into a
usable interface without a backend, database, API, login, or preprocessing pipeline.

## Method

The implementation follows a direct spreadsheet-to-interface pipeline:

1. Fetch the `.xlsx` file from the static repository.
2. Parse it inside the visitor's browser.
3. Infer the schema from header names.
4. Normalize rows into schedule records.
5. Build faculty, section, course, and room indices.
6. Render an interactive weekly routine grid.

## Evaluation Opportunities

Future evaluation can measure:

- lookup time compared with manually scanning the spreadsheet;
- parser robustness across semester exports;
- correctness of the cohort-section heuristic;
- usability for students, faculty, and advisors;
- suitability of static hosting for long-term student-maintained tools.

## Research Contribution Type

Schedula is best understood as an applied systems and human-centered computing artifact rather than a
new algorithm. Its value is in demonstrating a low-cost, reproducible pattern for turning a recurring
institutional spreadsheet into a useful public interface.

## Limitations

- The parser has been validated against one exported data snapshot.
- The project is unofficial and not integrated with university systems.
- Compare mode needs further browser QA before it should be treated as a mature research result.
- The included spreadsheet must be updated manually each semester.
