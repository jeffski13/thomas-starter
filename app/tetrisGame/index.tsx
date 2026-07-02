import { useState, useEffect, useRef, useCallback } from "react";

const COLS = 10;
const ROWS = 20;
const CELL = 24;

type Board = (string | null)[][];

const COLORS: Record<string, string> = {
  I: "#3498db",
  O: "#f1c40f",
  T: "#9b59b6",
  S: "#2ecc71",
  Z: "#e74c3c",
  J: "#2980b9",
  L: "#e67e22",
  crazy: "#7b8c79",
};

const SHAPES: Record<string, number[][][]> = {
  I: [
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
  ],
  O: [
    [[1, 0], [2, 0], [1, 1], [2, 1]],
  ],
  T: [
    [[1, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [1, 2]],
    [[1, 0], [0, 1], [1, 1], [1, 2]],
  ],
  S: [
    [[1, 0], [2, 0], [0, 1], [1, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
  ],
  Z: [
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[2, 0], [1, 1], [2, 1], [1, 2]],
  ],
  J: [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [2, 2]],
    [[1, 0], [1, 1], [0, 2], [1, 2]],
  ],
  L: [
    [[2, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 1], [1, 1], [2, 1], [0, 2]],
    [[0, 0], [1, 0], [1, 1], [1, 2]],
  ],
  crazy: [
    [[1, 0], [5, 0], [6, 0], [6, -1]],
  ]
};

const PIECE_NAMES = Object.keys(SHAPES);

interface Piece {
  name: string;
  rotation: number;
  x: number;
  y: number;
}

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function randomPiece(): Piece {
  const name = PIECE_NAMES[Math.floor(Math.random() * PIECE_NAMES.length)];
  return { name, rotation: 0, x: 3, y: 0 };
}

function pieceCells(piece: Piece): number[][] {
  const shape = SHAPES[piece.name];
  const cells = shape[piece.rotation % shape.length];
  return cells.map(([cx, cy]) => [cx + piece.x, cy + piece.y]);
}

function collides(board: Board, piece: Piece): boolean {
  for (const [x, y] of pieceCells(piece)) {
    if (x < 0 || x >= COLS || y >= ROWS) return true;
    if (y >= 0 && board[y][x]) return true;
  }
  return false;
}

function mergePiece(board: Board, piece: Piece): Board {
  const next = board.map(row => row.slice());
  for (const [x, y] of pieceCells(piece)) {
    if (y >= 0 && y < ROWS && x >= 0 && x < COLS) next[y][x] = piece.name;
  }
  return next;
}

function clearLines(board: Board): { board: Board; cleared: number } {
  const remaining = board.filter(row => row.some(cell => !cell));
  const cleared = ROWS - remaining.length;
  const next = Array.from({ length: cleared }, () => Array(COLS).fill(null)).concat(remaining);
  return { board: next, cleared };
}

export default function TetrisPage() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [piece, setPiece] = useState<Piece>(randomPiece);
  const [nextPiece, setNextPiece] = useState<Piece>(randomPiece);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const gameOverRef = useRef(gameOver);
  const pausedRef = useRef(paused);
  boardRef.current = board;
  pieceRef.current = piece;
  gameOverRef.current = gameOver;
  pausedRef.current = paused;

  const spawnPiece = useCallback((upcoming: Piece, currentBoard: Board) => {
    if (collides(currentBoard, upcoming)) {
      setGameOver(true);
      return;
    }
    setPiece(upcoming);
    setNextPiece(randomPiece());
  }, []);

  const lockPiece = useCallback(() => {
    const merged = mergePiece(boardRef.current, pieceRef.current);
    const { board: clearedBoard, cleared } = clearLines(merged);
    if (cleared > 0) {
      const points = [0, 40, 100, 300, 1200][cleared] ?? cleared * 300;
      setScore(s => s + points);
      setLines(l => l + cleared);
    }
    setBoard(clearedBoard);
    spawnPiece(nextPiece, clearedBoard);
  }, [nextPiece, spawnPiece]);

  const move = useCallback((dx: number, dy: number) => {
    if (gameOverRef.current || pausedRef.current) return false;
    const moved = { ...pieceRef.current, x: pieceRef.current.x + dx, y: pieceRef.current.y + dy };
    if (collides(boardRef.current, moved)) return false;
    setPiece(moved);
    return true;
  }, []);

  const softDrop = useCallback(() => {
    if (!move(0, 1)) {
      if (!gameOverRef.current && !pausedRef.current) lockPiece();
    }
  }, [move, lockPiece]);

  const hardDrop = useCallback(() => {
    if (gameOverRef.current || pausedRef.current) return;
    let dropped = pieceRef.current;
    while (!collides(boardRef.current, { ...dropped, y: dropped.y + 1 })) {
      dropped = { ...dropped, y: dropped.y + 1 };
    }
    setPiece(dropped);
    pieceRef.current = dropped;
    lockPiece();
  }, [lockPiece]);

  const rotate = useCallback(() => {
    if (gameOverRef.current || pausedRef.current) return;
    const shape = SHAPES[pieceRef.current.name];
    const rotation = (pieceRef.current.rotation + 1) % shape.length;
    const rotated = { ...pieceRef.current, rotation };
    if (!collides(boardRef.current, rotated)) {
      setPiece(rotated);
      return;
    }
    for (const kick of [-1, 1, -2, 2]) {
      const kicked = { ...rotated, x: rotated.x + kick };
      if (!collides(boardRef.current, kicked)) {
        setPiece(kicked);
        return;
      }
    }
  }, []);

  function reset() {
    setBoard(emptyBoard());
    setPiece(randomPiece());
    setNextPiece(randomPiece());
    setScore(0);
    setLines(0);
    setGameOver(false);
    setPaused(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "p" || e.key === "P") {
        setPaused(p => !p);
        return;
      }
      if (gameOverRef.current || pausedRef.current) return;
      switch (e.key) {
        case "ArrowLeft":
          move(-1, 0);
          break;
        case "ArrowRight":
          move(1, 0);
          break;
        case "ArrowDown":
          softDrop();
          break;
        case "ArrowUp":
          rotate();
          break;
        case " ":
          hardDrop();
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, softDrop, rotate, hardDrop]);

  useEffect(() => {
    if (gameOver || paused) return;
    const speed = Math.max(120, 800 - lines * 20);
    const interval = setInterval(softDrop, speed);
    return () => clearInterval(interval);
  }, [softDrop, gameOver, paused, lines]);

  const displayBoard = mergePiece(board, piece);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem", color: "#333" }}>
      <h2 style={{ margin: 0 }}>Tetris</h2>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
              gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
              border: "2px solid #333",
              background: "#111",
            }}
          >
            {displayBoard.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  style={{
                    width: CELL,
                    height: CELL,
                    background: cell ? COLORS[cell] : "#1a1a1a",
                    border: cell ? "1px solid rgba(255,255,255,0.3)" : "1px solid #222",
                    boxSizing: "border-box",
                  }}
                />
              ))
            )}
          </div>
          {(gameOver || paused) && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontWeight: 600,
              }}
            >
              <div>{gameOver ? "Game Over" : "Paused"}</div>
              {gameOver && (
                <button
                  onClick={reset}
                  style={{
                    padding: "0.4rem 1.2rem",
                    fontSize: "0.9rem",
                    borderRadius: 5,
                    border: "2px solid #fff",
                    background: "transparent",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Restart
                </button>
              )}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: 100 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#777" }}>Score</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{score}</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#777" }}>Lines</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{lines}</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#777" }}>Next</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(4, ${CELL * 0.7}px)`,
                gridTemplateRows: `repeat(2, ${CELL * 0.7}px)`,
                marginTop: "0.25rem",
              }}
            >
              {Array.from({ length: 2 }, (_, y) =>
                Array.from({ length: 4 }, (_, x) => {
                  const filled = SHAPES[nextPiece.name][0].some(([cx, cy]) => cx === x && cy === y);
                  return (
                    <div
                      key={`${x}-${y}`}
                      style={{
                        width: CELL * 0.7,
                        height: CELL * 0.7,
                        background: filled ? COLORS[nextPiece.name] : "transparent",
                        border: filled ? "1px solid rgba(255,255,255,0.3)" : "none",
                        boxSizing: "border-box",
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
          <button
            onClick={() => setPaused(p => !p)}
            disabled={gameOver}
            style={{
              padding: "0.4rem 1rem",
              fontSize: "0.9rem",
              borderRadius: 5,
              border: "2px solid #333",
              background: "#333",
              color: "#fff",
              cursor: gameOver ? "default" : "pointer",
            }}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={reset}
            style={{
              padding: "0.4rem 1rem",
              fontSize: "0.9rem",
              borderRadius: 5,
              border: "2px solid #333",
              background: "#fff",
              color: "#333",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div style={{ fontSize: "0.8rem", color: "#777", textAlign: "center" }}>
        Arrow keys to move/rotate, Space to hard drop, P to pause
      </div>
    </div>
  );
}
