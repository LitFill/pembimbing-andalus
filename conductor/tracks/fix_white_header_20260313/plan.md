# Implementation Plan: Fix White Group Header

## Phase 1: Bug Reproduction & Investigation

- [ ] **Task: Verify reported issue in table view**
  - [ ] Inspect the DOM for `tr.group-header` elements at index 1 and 4 in the table's grouping mode.
  - [ ] Use browser developer tools to determine which CSS rule is overriding the `background-color`.
  - [ ] Confirm if `tbody tr:nth-child(even)` is indeed the culprit for the white background.

- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Bug Reproduction & Investigation' (Protocol in workflow.md)**

## Phase 2: Implementation & Verification

- [ ] **Task: Apply CSS fix for `group-header`**
  - [ ] Increase CSS specificity for `.group-header` in `src/index.css` to ensure it overrides general row styles.
  - [ ] Ensure `!important` is used only if absolutely necessary, favoring stronger selectors like `table#dataTable tbody tr.group-header`.
  - [ ] Verify that the text color and background color are consistent across both expanded and collapsed states.
  - [ ] Run a quick manual check on the card view to ensure no regressions occurred (though they share the `.group-header` class, their layout is different).

- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Implementation & Verification' (Protocol in workflow.md)**
