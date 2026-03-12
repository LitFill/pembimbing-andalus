# Implementation Plan: Separate Data

## Phase 1: Data Extraction and Rendering [checkpoint: 49b9a8d]

- [x] **Task: Create `src/data.js` with supervisor data** [020e1e4]
  - [x] Create `src/data.js` file.
  - [x] Extract existing supervisor data from `index.html`.
  - [x] Store data as a constant array of objects (e.g., `const SUPERVISORS = [...]`).
  - [x] Ensure the file is referenced in `index.html` (e.g., `<script src="src/data.js"></script>`) before `index.js`.
- [x] **Task: Update `src/index.js` to render table rows dynamically** [ef6868b]
  - [x] Modify `src/index.js` to initialize the table using the `SUPERVISORS` data.
  - [x] Implement a function to generate `<tr>` elements for each supervisor.
  - [x] Ensure the table body is cleared before rendering.
  - [x] Verify that existing search and copy functionality still works with dynamically added rows.
- [x] **Task: Remove hardcoded data from `index.html`** [33350b2]
  - [x] Remove all `<tr>` elements from the `<tbody>` in `index.html`.
  - [x] Verify that the page loads correctly and displays the data from `src/data.js`.
- [x] **Task: Conductor - User Manual Verification 'Phase 1: Data Extraction and Rendering' (Protocol in workflow.md)** [49b9a8d]
