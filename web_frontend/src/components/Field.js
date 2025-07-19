import React from "react";
import styles from "./Field.module.css";

// PUBLIC_INTERFACE
/**
 * Represents a single field (cell) in the Tic Tac Toe grid.
 * @param {'X'|'O'|null} value - The cell's value (X, O, or empty).
 * @param {function} onClick - Called when the field is clicked.
 * @param {boolean} highlightX - If true, the field is highlighted as a winning X.
 * @param {boolean} highlightO - If true, the field is highlighted as a winning O.
 * @param {boolean} disabled - If true, disables click.
 */
function Field({
  value,
  onClick,
  highlightX = false,
  highlightO = false,
  disabled = false,
  "aria-label": ariaLabel = "",
}) {
  let fieldClass = styles.baseCell;
  if (highlightX) {
    fieldClass = styles.winCellX;
  } else if (highlightO) {
    fieldClass = styles.winCellO;
  } else if (value == null) {
    fieldClass = styles.emptyCell;
  }

  return (
    <button
      className={`${styles.tttCell} ${fieldClass}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      type="button"
      data-testid="ttt-field"
    >
      {value === "X" && (
        <span className={styles.cellX} aria-label="X">
          <span className={styles.xLine1}></span>
          <span className={styles.xLine2}></span>
        </span>
      )}
      {value === "O" && (
        <svg
          className={styles.cellO}
          viewBox="0 0 28 28"
          aria-label="O"
          focusable="false"
        >
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            stroke="#E65551"
            strokeWidth="4"
          />
        </svg>
      )}
    </button>
  );
}

export default Field;
