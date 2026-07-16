import { useState } from "react";

type Color = "red" | "black";
type Piece = { color: Color; king: boolean } | null;
type Move = { to: number; capture?: number };

const SIZE = 8;

function idx(row: number, col: number) {
  return row * SIZE + col;
}

function inBounds(row: number, col: number) {
  return row >= 0 && row < SIZE && col >= 0 && col < SIZE;
}

function initialBoard(): Piece[] {
  const board: Piece[] = Array(SIZE * SIZE).fill(null);
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if ((row + col) % 2 === 1) {
        if (row < 3) board[idx(row, col)] = { color: "black", king: false };
        if (row > 4) board[idx(row, col)] = { color: "red", king: false };
      }
    }
  }
  return board;
}

function getMoves(board: Piece[], index: number): Move[] {
  const piece = board[index];
  if (!piece) return [];
  const row = Math.floor(index / SIZE);
  const col = index % SIZE;
  const rowDirs = piece.king ? [-1, 1] : piece.color === "black" ? [1] : [-1];
  const moves: Move[] = [];

  for (const dr of rowDirs) {
    for (const dc of [-1, 1]) {
      const nr = row + dr;
      const nc = col + dc;
      if (inBounds(nr, nc) && !board[idx(nr, nc)]) {
        moves.push({ to: idx(nr, nc) });
      }

      const mr = row + dr;
      const mc = col + dc;
      const jr = row + dr * 2;
      const jc = col + dc * 2;
      if (
        inBounds(jr, jc) &&
        !board[idx(jr, jc)] &&
        inBounds(mr, mc) &&
        board[idx(mr, mc)] &&
        board[idx(mr, mc)]!.color !== piece.color
      ) {
        moves.push({ to: idx(jr, jc), capture: idx(mr, mc) });
      }
    }
  }

  return moves;
}

export default function Checkers() {
  const [board, setBoard] = useState<Piece[]>(initialBoard());
  const [turn, setTurn] = useState<Color>("black");
  const [selected, setSelected] = useState<number | null>(null);

  const redCount = board.filter((p) => p?.color === "red").length;
  const blackCount = board.filter((p) => p?.color === "black").length;
  const winner = redCount === 0 ? "black" : blackCount === 0 ? "red" : null;

  const validMoves = selected !== null ? getMoves(board, selected) : [];

  function handleSquareClick(index: number) {
    if (winner) return;

    if (selected === null) {
      if (board[index] && board[index]!.color === turn) setSelected(index);
      return;
    }

    if (index === selected) {
      setSelected(null);
      return;
    }

    const move = validMoves.find((m) => m.to === index);
    if (move) {
      const next = board.slice();
      const piece = next[selected]!;
      next[index] = piece;
      next[selected] = null;
      if (move.capture !== undefined) next[move.capture] = null;

      const toRow = Math.floor(index / SIZE);
      if (!piece.king && ((piece.color === "black" && toRow === SIZE - 1) || (piece.color === "red" && toRow === 0))) {
        next[index] = { ...piece, king: true };
      }

      setBoard(next);
      setSelected(null);
      setTurn(turn === "black" ? "red" : "black");
      return;
    }

    if (board[index] && board[index]!.color === turn) {
      setSelected(index);
    } else {
      setSelected(null);
    }
  }

  function reset() {
    setBoard(initialBoard());
    setTurn("black");
    setSelected(null);
  }

  const status = winner ? `${winner === "black" ? "Black" : "Red"} wins!` : `${turn === "black" ? "Black" : "Red"}'s turn`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <h2>Checkers</h2>
      <div style={{ fontWeight: "bold" }}>{status}</div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${SIZE}, 3rem)`, gridTemplateRows: `repeat(${SIZE}, 3rem)` }}>
        {board.map((piece, i) => {
          const row = Math.floor(i / SIZE);
          const col = i % SIZE;
          const isDark = (row + col) % 2 === 1;
          const isSelected = selected === i;
          const isValidTarget = validMoves.some((m) => m.to === i);

          return (
            <div
              key={i}
              onClick={() => isDark && handleSquareClick(i)}
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: isSelected ? "#f7e26b" : isValidTarget ? "#a8e6a3" : isDark ? "#8b4513" : "#f5deb3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isDark ? "pointer" : "default",
              }}
            >
              {piece && (
                <div
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    borderRadius: "50%",
                    backgroundColor: piece.color,
                    border: "2px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "gold",
                    fontWeight: "bold",
                  }}
                >
                  {piece.king ? "K" : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={reset} style={{ cursor: "pointer" }}>New Game</button>
    </div>
  );
}
