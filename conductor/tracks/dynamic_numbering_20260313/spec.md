# Specification: Dynamic Numbering

## Goal

The goal of this track is to remove the hardcoded `no` (number) field from the `SUPERVISORS` data and instead generate it dynamically based on the array index. This simplifies data management as reordering or adding supervisors won't require manual renumbering.

## Scope

- `src/data.js`: Remove the `no` property from each object in the `SUPERVISORS` array.
- `src/index.js`: Update the loop that renders the table and cards to use the array index (`index + 1`) as the number.

## Acceptance Criteria

- The `SUPERVISORS` array in `src/data.js` no longer contains the `no` property.
- The table rows in `index.html` still display sequential numbers (1, 2, 3...) in the "No" column.
- The cards in the card view still display sequential numbers (e.g., #1, #2...).
- The functionality of sorting or filtering (if any rely on `no`) is checked to ensure no regressions. (Note: Current search/filter is based on text content, so this should be safe).
