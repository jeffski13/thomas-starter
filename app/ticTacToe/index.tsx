import { useState, useEffect, useRef } from "react";

type Square = "X" | "O" | null;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
}

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

function FireworksCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6bff", "#ff9f43", "#fff"];

    const audio = new Audio("/fireworks.mp3");
    audio.loop = true;
    audio.play();

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function burst() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.6;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 70; i++) {
        const angle = (Math.PI * 2 * i) / 70;
        const speed = Math.random() * 5 + 1.5;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          radius: Math.random() * 3 + 1,
        });
      }
    }

    for (let i = 0; i < 6; i++) setTimeout(burst, i * 250);
    const intervalId = setInterval(burst, 700);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.09;
        p.alpha -= 0.014;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(intervalId);
      window.removeEventListener("resize", resize);
      particlesRef.current = [];
      audio.pause();
      audio.currentTime = 0;
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
    />
  );
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
      <FireworksCanvas active={!!winner} />
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
