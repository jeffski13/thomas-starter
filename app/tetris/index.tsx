import { useState, useEffect, useCallback, useRef } from "react";

const COLS = 10;
const ROWS = 20;
const CELL = 30;

type Board = (string | null)[][];

const PIECES = {
  I: { cells: [[0,1],[1,1],[2,1],[3,1]], color: "#00f0f0" },
  O: { cells: [[0,0],[1,0],[0,1],[1,1]], color: "#f0f000" },
  T: { cells: [[1,0],[0,1],[1,1],[2,1]], color: "#a000f0" },
  S: { cells: [[1,0],[2,0],[0,1],[1,1]], color: "#00f000" },
  Z: { cells: [[0,0],[1,0],[1,1],[2,1]], color: "#f00000" },
  J: { cells: [[0,0],[0,1],[1,1],[2,1]], color: "#425dfad5" },
  L: { cells: [[2,0],[0,1],[1,1],[2,1]], color: "#5fb78b" },
  A: { cells: [[0,0],[5,0],[6,0],[6,1]], color: "#ff00b7"}
} as const;

type PieceKey = keyof typeof PIECES;

interface Piece {
  cells: [number, number][];
  color: string;
  x: number;
  y: number;
}

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function randomPiece(): Piece {
  const keys = Object.keys(PIECES) as PieceKey[];
  const key = keys[Math.floor(Math.random() * keys.length)];
  const def = PIECES[key];
  return { cells: def.cells.map(c => [...c] as [number, number]), color: def.color, x: 3, y: 0 };
}

function rotate(cells: [number, number][]): [number, number][] {
  const maxY = Math.max(...cells.map(c => c[1]));
  return cells.map(([x, y]) => [maxY - y, x]);
}

function collides(board: Board, piece: Piece, dx = 0, dy = 0, newCells?: [number, number][]): boolean {
  const cells = newCells ?? piece.cells;
  for (const [cx, cy] of cells) {
    const nx = piece.x + cx + dx;
    const ny = piece.y + cy + dy;
    if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
    if (ny >= 0 && board[ny][nx]) return true;
  }
  return false;
}

function stamp(board: Board, piece: Piece): Board {
  const next = board.map(row => [...row]);
  for (const [cx, cy] of piece.cells) {
    const nx = piece.x + cx;
    const ny = piece.y + cy;
    if (ny >= 0) next[ny][nx] = piece.color;
  }
  return next;
}

function clearLines(board: Board): [Board, number] {
  const kept = board.filter(row => row.some(cell => !cell));
  const cleared = ROWS - kept.length;
  const newRows = Array.from({ length: cleared }, () => Array(COLS).fill(null));
  return [[...newRows, ...kept], cleared];
}

const SCORE_TABLE = [0, 100, 300, 500, 800];

export default function TetrisPage() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [piece, setPiece] = useState<Piece>(() => randomPiece());
  const [next, setNext] = useState<Piece>(() => randomPiece());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const pausedRef = useRef(paused);
  const gameOverRef = useRef(gameOver);
  boardRef.current = board;
  pieceRef.current = piece;
  pausedRef.current = paused;
  gameOverRef.current = gameOver;

  const lock = useCallback(() => {
    const b = stamp(boardRef.current, pieceRef.current);
    const [cleared, count] = clearLines(b);
    setBoard(cleared);
    setScore(s => s + (SCORE_TABLE[count] ?? 0));
    setLines(l => l + count);
    const np = next;
    if (collides(cleared, np)) {
      setGameOver(true);
    } else {
      setPiece(np);
      setNext(randomPiece());
    }
  }, [next]);

  const moveDown = useCallback(() => {
    if (pausedRef.current || gameOverRef.current) return;
    if (collides(boardRef.current, pieceRef.current, 0, 1)) {
      lock();
    } else {
      setPiece(p => ({ ...p, y: p.y + 1 }));
    }
  }, [lock]);

  useEffect(() => {
    const level = Math.floor(lines / 10);
    const interval = Math.max(100, 800 - level * 70);
    const id = setInterval(moveDown, interval);
    return () => clearInterval(id);
  }, [moveDown, lines]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (gameOverRef.current) return;
    if (e.key === "p" || e.key === "P") { setPaused(v => !v); return; }
    if (pausedRef.current) return;

    const p = pieceRef.current;
    const b = boardRef.current;

    if (e.key === "ArrowLeft" && !collides(b, p, -1, 0)) {
      setPiece(prev => ({ ...prev, x: prev.x - 1 }));
    } else if (e.key === "ArrowRight" && !collides(b, p, 1, 0)) {
      setPiece(prev => ({ ...prev, x: prev.x + 1 }));
    } else if (e.key === "ArrowDown") {
      moveDown();
    } else if (e.key === "ArrowUp") {
      const rotated = rotate(p.cells);
      if (!collides(b, p, 0, 0, rotated)) {
        setPiece(prev => ({ ...prev, cells: rotated }));
      } else if (!collides(b, p, 1, 0, rotated)) {
        setPiece(prev => ({ ...prev, cells: rotated, x: prev.x + 1 }));
      } else if (!collides(b, p, -1, 0, rotated)) {
        setPiece(prev => ({ ...prev, cells: rotated, x: prev.x - 1 }));
      }
    } else if (e.key === " ") {
      e.preventDefault();
      let dy = 0;
      while (!collides(b, p, 0, dy + 1)) dy++;
      setPiece(prev => ({ ...prev, y: prev.y + dy }));
      setTimeout(lock, 0);
    }
  }, [moveDown, lock]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  function restart() {
    setBoard(emptyBoard());
    setPiece(randomPiece());
    setNext(randomPiece());
    setScore(0);
    setLines(0);
    setGameOver(false);
    setPaused(false);
  }

  // Build display board with ghost + active piece
  const ghost = (() => {
    let dy = 0;
    while (!collides(board, piece, 0, dy + 1)) dy++;
    return { ...piece, y: piece.y + dy };
  })();

  const display: (string | null)[][] = board.map(row => [...row]);
  for (const [cx, cy] of ghost.cells) {
    const nx = ghost.x + cx;
    const ny = ghost.y + cy;
    if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS && !display[ny][nx]) {
      display[ny][nx] = "ghost";
    }
  }
  for (const [cx, cy] of piece.cells) {
    const nx = piece.x + cx;
    const ny = piece.y + cy;
    if (ny >= 0 && ny < ROWS) display[ny][nx] = piece.color;
  }

  const level = Math.floor(lines / 10) + 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "1rem" }}>
      <h2 style={{ margin: 0 }}>Tetris</h2>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        {/* Board */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
              border: "2px solid #555",
              backgroundColor: "#111",
            }}
          >
            {display.flat().map((cell, i) => (
              <div
                key={i}
                style={{
                  width: CELL,
                  height: CELL,
                  backgroundColor: cell === "ghost" ? "rgba(255,255,255,0.12)" : (cell ?? "transparent"),
                  border: "1px solid #1a1a1a",
                  boxSizing: "border-box",
                }}
              />
            ))}
          </div>

          {(gameOver || paused) && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.75)",
              color: "#fff",
              gap: "1rem",
            }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {gameOver ? "Game Over" : "Paused"}
              </div>
              {gameOver && (
                <button
                  onClick={restart}
                  style={{
                    padding: "0.5rem 1.5rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                    backgroundColor: "#f0a000",
                    border: "none",
                    borderRadius: "0.4rem",
                    fontWeight: "bold",
                  }}
                >
                  Play Again
                </button>
              )}
              {!gameOver && <div style={{ fontSize: "0.9rem", color: "#aaa" }}>Press P to resume</div>}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", minWidth: "100px" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>NEXT</div>
            <div style={{
              backgroundColor: "#111",
              border: "2px solid #555",
              padding: "0.5rem",
              display: "grid",
              gridTemplateColumns: `repeat(4, 20px)`,
              gridTemplateRows: `repeat(2, 20px)`,
            }}>
              {Array.from({ length: 8 }, (_, i) => {
                const x = i % 4;
                const y = Math.floor(i / 4);
                const active = next.cells.some(([cx, cy]) => cx === x && cy === y);
                return (
                  <div key={i} style={{
                    width: 20, height: 20,
                    backgroundColor: active ? next.color : "transparent",
                    border: "1px solid #1a1a1a",
                    boxSizing: "border-box",
                  }} />
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>SCORE</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{score}</div>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>LINES</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{lines}</div>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>LEVEL</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{level}</div>
          </div>

          <button
            onClick={() => setPaused(v => !v)}
            disabled={gameOver}
            style={{
              padding: "0.4rem 0.8rem",
              cursor: gameOver ? "default" : "pointer",
              backgroundColor: "#333",
              color: "#fff",
              border: "1px solid #666",
              borderRadius: "0.3rem",
              fontSize: "0.85rem",
            }}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      <div style={{ fontSize: "0.75rem", color: "#666", textAlign: "center" }}>
        ← → Move &nbsp;|&nbsp; ↑ Rotate &nbsp;|&nbsp; ↓ Soft drop &nbsp;|&nbsp; Space Hard drop &nbsp;|&nbsp; P Pause
      </div>
    </div>
  );
}
