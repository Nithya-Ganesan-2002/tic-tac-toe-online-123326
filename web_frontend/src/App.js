import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";

function getEmptyBoard() {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

/** Returns the next player to play */
function getNextPlayer(board) {
  const flat = board.flat();
  const xCount = flat.filter((c) => c === "X").length;
  const oCount = flat.filter((c) => c === "O").length;
  return xCount > oCount ? "O" : "X";
}

/** Returns winning cells as highlights for X/O, or null if not won. */
function findWin(board) {
  // Rows, columns, and diagonals
  for (let p of ["X", "O"]) {
    // rows
    for (let i = 0; i < 3; ++i) {
      if (board[i][0] === p && board[i][1] === p && board[i][2] === p) {
        const arr = [
          [false, false, false],
          [false, false, false],
          [false, false, false],
        ];
        arr[i] = [true, true, true];
        if (p === "X") return { highlightsX: arr, highlightsO: [[false, false, false],[false, false, false],[false, false, false]], winner: "X" };
        else return { highlightsO: arr, highlightsX: [[false, false, false],[false, false, false],[false, false, false]], winner: "O" };
      }
    }
    // columns
    for (let i = 0; i < 3; ++i) {
      if (board[0][i] === p && board[1][i] === p && board[2][i] === p) {
        const arr = [
          [false, false, false],
          [false, false, false],
          [false, false, false],
        ];
        arr[0][i] = true;
        arr[1][i] = true;
        arr[2][i] = true;
        if (p === "X") return { highlightsX: arr, highlightsO: [[false, false, false],[false, false, false],[false, false, false]], winner: "X" };
        else return { highlightsO: arr, highlightsX: [[false, false, false],[false, false, false],[false, false, false]], winner: "O" };
      }
    }
    // diagonals
    if (board[0][0] === p && board[1][1] === p && board[2][2] === p) {
      const arr = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ];
      arr[0][0] = arr[1][1] = arr[2][2] = true;
      if (p === "X") return { highlightsX: arr, highlightsO: [[false, false, false],[false, false, false],[false, false, false]], winner: "X" };
      else return { highlightsO: arr, highlightsX: [[false, false, false],[false, false, false],[false, false, false]], winner: "O" };
    }
    if (board[0][2] === p && board[1][1] === p && board[2][0] === p) {
      const arr = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ];
      arr[0][2] = arr[1][1] = arr[2][0] = true;
      if (p === "X") return { highlightsX: arr, highlightsO: [[false, false, false],[false, false, false],[false, false, false]], winner: "X" };
      else return { highlightsO: arr, highlightsX: [[false, false, false],[false, false, false],[false, false, false]], winner: "O" };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("dark");
  const [board, setBoard] = useState(getEmptyBoard());
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState(null);
  const [highlightX, setHighlightX] = useState([[], [], []]);
  const [highlightO, setHighlightO] = useState([[], [], []]);
  const [status, setStatus] = useState("Your turn");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Update highlights and winner after move
  useEffect(() => {
    const winResult = findWin(board);
    if (winResult) {
      setHighlightX(winResult.highlightsX);
      setHighlightO(winResult.highlightsO);
      setWinner(winResult.winner);
      setStatus(winResult.winner === "X" ? "X wins!" : "O wins!");
      setFinished(true);
    } else if (board.flat().every((c) => c)) {
      setStatus("Draw");
      setWinner(null);
      setFinished(true);
      setHighlightX([[], [], []]);
      setHighlightO([[], [], []]);
    } else {
      setStatus(`Current: ${getNextPlayer(board)}`);
      setWinner(null);
      setFinished(false);
      setHighlightX([[], [], []]);
      setHighlightO([[], [], []]);
    }
  }, [board]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const handlePlayAgain = () => {
    setBoard(getEmptyBoard());
    setFinished(false);
    setWinner(null);
    setHighlightX([[], [], []]);
    setHighlightO([[], [], []]);
    setStatus("Your turn");
  };

  // PUBLIC_INTERFACE
  const handleFieldClick = (rowIdx, colIdx) => {
    if (board[rowIdx][colIdx] != null || finished) return;
    const nextPlayer = getNextPlayer(board);
    const b = board.map((row, i) =>
      row.map((cell, j) => (i === rowIdx && j === colIdx ? nextPlayer : cell))
    );
    setBoard(b);
  };

  return (
    <div className="App" style={{ background: "#0c1017", minHeight: "100vh" }}>
      <header className="App-header" style={{ background: "none", minHeight: 0 }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main>
        <div className="frame-game-dark">
          <div className="status-message" style={{ marginTop: "48px" }}>
            <div className="win-title">
              {winner ? (winner === "X" ? "X Wins!" : "O Wins!") : status}
            </div>
            {!!winner && (
              <div className="subtitle" style={{ color: "#ADADAD", fontSize: 20 }}>
                {winner ? "Congratulations" : ""}
              </div>
            )}
          </div>
          <Board
            board={board}
            highlightsX={highlightX}
            highlightsO={highlightO}
            onFieldClick={handleFieldClick}
            disabled={finished}
          />
          <div className="cta-bar" style={{
            margin: "40px auto 0",
            width: "364px",
            height: 54,
            background: "#262626",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 18,
            position: "relative",
            top: 32,
            boxShadow: "0 1px 4px rgba(26,26,26,0.08)",
            justifyContent: "center"
          }}>
            <div
              className="cta-label"
              style={{
                fontSize: 16,
                color: "#ADADAD",
                fontWeight: 500,
                letterSpacing: 1,
                cursor: "pointer"
              }}
              role="button"
              tabIndex={finished ? 0 : -1}
              aria-disabled={!finished}
              onClick={finished ? handlePlayAgain : undefined}
            >
              Play again
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
