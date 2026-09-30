# Data Statement

Schedula uses `data/Offered_Course_Report.xlsx` as its data source.

## Source Type

The file is an offered-course report spreadsheet used by the app for timetable lookup and research
demonstration. Schedula does not scrape, log in to, or query any university system.

## Processing

The data is processed entirely in the visitor's browser:

- the spreadsheet is fetched as a static file;
- SheetJS parses the workbook client-side;
- schedule rows are normalized and indexed in memory;
- no user data is sent to a backend because there is no backend.

## Accuracy

Schedula reflects only the contents of the uploaded spreadsheet. If the source file is outdated,
incomplete, or incorrect, the app output will also be outdated, incomplete, or incorrect.

## Privacy

The app does not collect user accounts, analytics, search history, or personal user input. The visible
course, faculty, room, and schedule information comes from the uploaded offered-course report.

## Unofficial Status

Schedula is not affiliated with, endorsed by, or maintained by AIUB administration.
