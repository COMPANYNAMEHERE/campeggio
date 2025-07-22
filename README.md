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

### Todo
1. Responsive mobile layout and navigation.
2. Fix GitHub Pages.
3. HTTPS deployment and security hardening.
4. Booking form with simple validation.
5. Better design (skeuomorphic design approach).
6. Better narrated content.
7. Add animations.
8. Better accessibility (contrast and ARIA labels).
9. Print friendly style sheet.

## Development

Run a quick check that all internal links resolve correctly:

```bash
npm test
```

Launch the experimental drag-and-drop scrum board:

```bash
npm run scrum
```
The board supports drag-and-drop task management and a checkbox to mark tasks as minor.

### Local preview of GitHub Pages

To verify the redirect logic before pushing to `main`, build the site and run a local preview server:

```bash
npm run build
npm run preview
```

Open the printed URL and navigate to `/pages/` to check that you're redirected to the language stored in the browser (or English when none is saved).
