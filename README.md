# campeggio
Koert's Camping Site

This repo contains the static site that powers **KJ's Camping**. It is built with plain HTML, CSS and JavaScript and uses [Vite](https://vitejs.dev/) for local development.

## Current features

- **Multi language pages** – English, Dutch and Italian versions live under `src/pages` and visitors are redirected based on their browser locale.
- **Shared components** – the header and footer HTML fragments are fetched at runtime so a single edit updates all pages.
- **Language switcher** – a drop-down in the header adjusts navigation links and persists the user preference.
- **Events calendar** – the events page loads the FullCalendar library and adapts text to the selected language.
- **Path checks** – running `npm test` executes `test/checkPaths.js` which validates that links to assets, components and scripts still resolve after moving files around.

## Planned improvements

### Major
1. Responsive mobile layout and navigation.
2. Booking form with simple validation.
3. HTTPS deployment and security hardening.
4. Better design (skeuomorphic design approach).
5. Better narrated content.

### Minor
- Better accessibility (contrast and ARIA labels).
- Print friendly style sheet.

## Development

Run a quick check that all internal links resolve correctly:

```bash
npm test
```

Run tests and build the project:

```bash
npm run deploy
```
