# Contributing to Schedula

Thank you for your interest in Schedula.

This repository is publicly visible for academic review and demonstration, but it is not an open-source
project. Contributions are accepted only with the maintainer's approval and do not automatically grant
reuse rights outside this repository.

## Before Opening a Contribution

Please open an issue first if your change affects:

- parsing behavior for the offered-course spreadsheet;
- search/indexing semantics;
- schedule visualization;
- licensing, citation, or research claims;
- data files or institution-specific assumptions.

## Development Setup

```bash
npm install
npm test
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Contribution Rules

- Keep the zero-backend, static-hosting architecture intact.
- Do not add tracking, analytics, login, or external services without discussion.
- Do not guess institution-specific facts such as room/building mappings.
- Preserve the unofficial-status disclaimer.
- Keep spreadsheet parsing defensive and documented.
- Include or update tests for parsing changes.

## Intellectual Property

By submitting a contribution, you confirm that you have the right to contribute it and that you grant
the repository owner permission to use it in Schedula. You do not receive permission to reuse the
project elsewhere unless separately granted in writing.
