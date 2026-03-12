# Specification: Separate Data

## Goal

The goal of this track is to separate the hardcoded supervisor data from `index.html` into a dedicated JavaScript file (`src/data.js`) to improve maintainability and flexibility.

## Scope

- `src/data.js`: Create a new file exporting the supervisor data as a constant.
- `index.html`: Remove the hardcoded table rows and include `src/data.js`.
- `src/index.js`: Update the script to import/use the data from `src/data.js` and render the table rows dynamically on page load.

## Acceptance Criteria

- Supervisor data is stored in `src/data.js` as an array of objects.
- `index.html` contains an empty `<tbody>` initially.
- The table is populated dynamically using the data from `src/data.js`.
- All existing features (search, sort, group, copy) continue to work correctly.
- Opening `index.html` directly in a browser (via `file://`) works without CORS errors (hence using a JS file instead of JSON).
