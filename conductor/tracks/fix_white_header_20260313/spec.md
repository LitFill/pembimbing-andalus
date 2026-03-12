# Specification: Fix White Group Header in Table Mode

## Goal

The goal of this track is to fix a visual bug in the table view's grouping mode. Some `tr.group-header` elements are appearing with a white background instead of the expected primary green color (`var(--primary-color)`).

## Overview

- **Affected Elements:** `tr.group-header` in `#dataTable tbody`.
- **Reported Occurrence:** Groups at index 1 and 4 (specifically "Asrama PDF" and "Asrama Fiqih").
- **Environment:** Observed in Chrome.
- **Probable Cause:** Potential CSS specificity or conflict with `tbody tr:nth-child(even)` styles that apply a background color to even rows, overriding the `group-header` class.

## Functional Requirements

- The background color of ALL group headers (`tr.group-header`) must be the primary green color defined by `var(--primary-color)`.
- The text color within group headers must be white (`#fff`).
- The "No Results" message and other rows must not be negatively affected.

## Non-Functional Requirements

- Maintain responsiveness and CSS variable usage.
- Ensure consistent styling across different browsers (Chrome, Firefox, Safari).

## Acceptance Criteria

- All group headers in "Kategori Kamar" mode (Asrama PDF, Asrama Fiqih, etc.) have the correct primary green background.
- Both expanded and collapsed states maintain the correct background color.
- Searching and filtering do not revert the headers to white.

## Out of Scope

- Changing the grouping logic itself (already refactored to use `asrama`).
- Changes to the Card View (no bug reported there).
