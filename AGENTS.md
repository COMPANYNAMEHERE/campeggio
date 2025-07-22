# AGENTS

These instructions apply to the entire project repository and describe how Codex should make changes and prepare pull requests.

## Coding style
- Use **2 spaces** for indentation in JavaScript, HTML and CSS files.
- End JavaScript statements with semicolons.
- Use CommonJS modules (`require`, `module.exports`) for Node scripts.
- Keep runtime dependencies minimal; prefer built-in Node modules when possible.

## Project layout
- Source files live in `src/`. HTML pages are under `src/pages/<lang>`.
- Shared components are in `src/pages/components` and assets in `src/assets`.
- Test scripts reside in `test/`.
- Do **not** commit files in `node_modules/` or `dist/`.
- Ignore the `dev/` directory; it contains experimental utilities unrelated to
  the production site.

## Testing
- Run `npm install` whenever `package.json` or `package-lock.json` changes.
- Always run `npm test` before committing to ensure page references are valid.
- The project expects Node.js 18 or newer.

## Commit and PR guidelines
- Keep commit messages concise, e.g. `Fix image path`.
- The pull request description should include:
  - A **Summary** section listing major changes in bullet points.
  - A **Testing** section showing the commands run (e.g. `npm test`) and the outcome.

