# Security Policy

Schedula is a static client-side project. It has no backend, database, login system, payment flow, or
server-side API.

## Supported Version

| Version | Supported |
|---|---|
| `main` | Yes |

## Reporting a Vulnerability

Please report security concerns privately by contacting the repository owner through GitHub:

https://github.com/the-sudipta

Do not open a public issue for vulnerabilities involving:

- malicious spreadsheet payload behavior;
- cross-site scripting risk;
- dependency supply-chain concerns;
- accidental exposure of private or sensitive data;
- GitHub Pages deployment or repository-permission issues.

## Scope

In scope:

- vulnerabilities in the Schedula source code;
- unsafe handling of spreadsheet content;
- unsafe DOM rendering;
- dependency risks affecting local development or browser use.

Out of scope:

- AIUB systems, accounts, servers, portals, or infrastructure;
- GitHub platform vulnerabilities;
- social engineering;
- denial-of-service testing against GitHub Pages.
