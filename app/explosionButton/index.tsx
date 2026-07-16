import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
}

function ExplosionCanvas({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const colors = ["#ff3d00", "#ff9100", "#ffea00", "#ff1744", "#fff"];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 4 + 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.vx *= 0.98;
        p.alpha -= 0.018;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      if (particlesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        onDone();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
    />
  );
}

export default function ExplosionButton() {
  const [boom, setBoom] = useState<{ x: number; y: number } | null>(null);
  const [shake, setShake] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setBoom({ x: e.clientX, y: e.clientY });
    setShake(true);
    new Audio("/laugh.mp3").play();
    setTimeout(() => setShake(false), 400);
  }

  return (
    <>
      <style>{`
        @keyframes explosion-shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-8px, 6px); }
          40% { transform: translate(8px, -6px); }
          60% { transform: translate(-6px, -8px); }
          80% { transform: translate(6px, 8px); }
        }
        .explosion-shake {
          animation: explosion-shake 0.4s ease-in-out;
        }
      `}</style>
      <div className={shake ? "explosion-shake" : ""}>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Do not press
        </button>
      </div>
      {boom && <ExplosionCanvas x={boom.x} y={boom.y} onDone={() => setBoom(null)} />}
    </>
  );
}
