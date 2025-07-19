import React from "react";
import Field from "./Field";
import styles from "./BoardRow.module.css";

// PUBLIC_INTERFACE
/**
 * Render a row of fields for the Tic Tac Toe board.
 * @param {Array<'X'|'O'|null>} row - Array of 3 cell values.
 * @param {Array<boolean>} highlightsX - Highlight X cells.
 * @param {Array<boolean>} highlightsO - Highlight O cells.
 * @param {function(number):void} onFieldClick - Handler(index) for when a cell is clicked.
 * @param {boolean} disabled - Disable all cells in this row.
 */
function BoardRow({
  row,
  highlightsX = [],
  highlightsO = [],
  onFieldClick,
  disabled = false,
}) {
  return (
    <div className={styles.tttRow} role="row">
      {row.map((cell, idx) => (
        <Field
          key={idx}
          value={cell}
          highlightX={!!highlightsX[idx]}
          highlightO={!!highlightsO[idx]}
          onClick={() => !disabled && onFieldClick && onFieldClick(idx)}
          disabled={disabled}
          aria-label={cell || "Empty"}
        />
      ))}
    </div>
  );
}

export default BoardRow;
