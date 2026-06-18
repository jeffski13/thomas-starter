import { useState, useEffect, useRef } from "react";

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

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; color: string; radius: number;
}

function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    const colors = ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6", "#e67e22"];
    let particles: Particle[] = [];
    let animId: number;

    function burst() {
      const x = Math.random() * W;
      const y = Math.random() * H * 0.6;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60;
        const speed = 2 + Math.random() * 4;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          radius: 2 + Math.random() * 2,
        });
      }
    }

    let tick = 0;
    function loop() {
      ctx.clearRect(0, 0, W, H);
      if (tick % 40 === 0) burst();
      tick++;
      particles = particles.filter(p => p.alpha > 0.05);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.alpha -= 0.018;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    }

    const audio = new Audio("/fireworks.mp3");
    audio.loop = true;
    audio.play();

    burst();
    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, W, H);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      width={300} height={300}
      style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        pointerEvents: "none", display: active ? "block" : "none",
      }}
    />
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status: string;
  if (winner) status = `Winner: ${winner}!`;
  else if (isDraw) status = "It's a draw!";
  else status = `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
      <Fireworks active={!!winner} />
      <h2 style={{ margin: 0 }}>Tic Tac Toe</h2>
      <div style={{ fontWeight: 600 }}>{status}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 80px)", gap: 3 }}>
        {squares.map((sq, i) => (
          <button key={i} onClick={() => handleClick(i)} style={{
            width: 80, height: 80, fontSize: "2rem", fontWeight: "bold",
            border: "2px solid #333", background: "#fff", cursor: sq || winner ? "default" : "pointer",
            color: sq === "X" ? "#e74c3c" : "#3498db",
          }}>
            {sq}
          </button>
        ))}
      </div>
      <button onClick={reset} style={{
        padding: "0.4rem 1.5rem", fontSize: "0.9rem", borderRadius: 5,
        border: "2px solid #333", background: "#333", color: "#fff", cursor: "pointer",
      }}>
        Reset
      </button>
    </div>
  );
}
