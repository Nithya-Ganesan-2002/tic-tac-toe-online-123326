import React from "react";
import BoardRow from "./BoardRow";
import styles from "./Board.module.css";

// PUBLIC_INTERFACE
/**
 * Renders the whole 3x3 board.
 * @param {Array<Array<'X'|'O'|null>>} board - 2D array for the game state.
 * @param {Array<Array<boolean>>} highlightsX - 2D array indicating winning X cells.
 * @param {Array<Array<boolean>>} highlightsO - 2D array indicating winning O cells.
 * @param {function(number, number):void} onFieldClick - Handler(rowIdx, colIdx).
 * @param {boolean} disabled - Whether the board cells are disabled.
 */
function Board({
  board,
  highlightsX = [[], [], []],
  highlightsO = [[], [], []],
  onFieldClick,
  disabled = false,
}) {
  return (
    <div className={styles.tictactoeBoard} role="table">
      {board.map((row, idx) => (
        <BoardRow
          key={idx}
          row={row}
          highlightsX={highlightsX[idx]}
          highlightsO={highlightsO[idx]}
          onFieldClick={(col) =>
            !disabled && onFieldClick && onFieldClick(idx, col)
          }
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default Board;
