# campeggio
Koert's Camping Site

This repo contains the static site that powers **KJ's Camping**. It is built with plain HTML, CSS and JavaScript and uses [Vite](https://vitejs.dev/) for local development.
## Installation

1. Ensure Node.js 18 or newer is installed.
2. Run `npm install` to fetch dependencies.

## Current Features

- **Multi language pages** – English, Dutch and Italian versions live under `src/pages` and visitors are redirected based on their browser locale.
- **Shared components** – the header and footer HTML fragments are fetched at runtime so a single edit updates all pages.
- **Language switcher** – a drop-down in the header adjusts navigation links and persists the user preference.
- **Events calendar** – the events page displays entries pulled from a linked Google Calendar and adapts text to the selected language.
- **Path checks** – running `npm test` executes `test/checkPaths.js` which validates that links to assets, components and scripts still resolve after moving files around.
- **Automatic language redirect and dynamic footer year** – the index page picks a language based on browser settings and the footer shows the current year.
- **Contact form with smart routing** – submissions automatically send an email sorted by the selected category.

## Planned improvements

### Todo
1. Responsive mobile layout and navigation.
2. Fix GitHub Pages.
3. HTTPS deployment and security hardening.
4. Booking form with simple validation.
5. Better design (skeuomorphic design approach).
6. Better narrated content.
7. Add animations.
8. Fully functioning calendar synced with a Google account.
9. Print friendly style sheet.
10. Contact form automatically emails submissions sorted by category.
11. Map with directions to the campsite.
12. Photo gallery using a lightbox effect.

## Development

Start a local server during development:

```bash
npm run dev
```

Create the production build:

```bash
npm run build
```

Run a quick check that all internal links resolve correctly:

```bash
npm test
```

## License

Released under the ISC License.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
