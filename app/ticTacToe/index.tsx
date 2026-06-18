import { useState } from "react";

type Square = "X" | "O" | null;

function calculateWinner(squares: Square[]): Square {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const currentPlayer = xIsNext ? "X" : "O";

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = currentPlayer;
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const status = winner
    ? `Player ${winner} wins!`
    : isDraw
    ? "It's a draw!"
    : `Player ${currentPlayer}'s turn`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <h2>Tic Tac Toe</h2>
      <div style={{ fontWeight: "bold" }}>{status}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 5rem)", gap: "0.4rem" }}>
        {squares.map((val, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "5rem",
              height: "5rem",
              fontSize: "2rem",
              fontWeight: "bold",
              cursor: squares[i] || winner ? "default" : "pointer",
              backgroundColor: "#f0f0f0",
              border: "2px solid #333",
              borderRadius: "0.4rem",
              color: val === "X" ? "#e74c3c" : "#3498db",
            }}
          >
            {val}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        style={{
          padding: "0.4rem 1.5rem",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "0.4rem",
        }}
      >
        New Game
      </button>
    </div>
  );
}
