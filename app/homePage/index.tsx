import { useState } from "react";
import { Image } from "react-bootstrap";
import './styles.css';

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

function TicTacToe() {
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
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

export default function HomePage() {
  const [jefffyColor, setJeffyColor] = useState("green");
  const [jefffySize, setJeffySize] = useState("0.8rem");

  function randomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
  }

  function randomSize() {
    return `${(Math.random() * 10).toFixed(1)}rem`;
  }

  const [hatFlying, setHatFlying] = useState(false);

  function handlePokedexClick() {
    setJeffyColor(randomColor());
    setJeffySize(randomSize());
  }

  function handleHatClick() {
    if (hatFlying) return;
    const audio = new Audio("/sadTrombone.mp3");
    setHatFlying(true);
    audio.play();
    audio.addEventListener("ended", () => setHatFlying(false));
  }

  return (
    <div className="homePage" >
      <div>Good afternoon Professor Thomas.</div>
      <div className="uncleJeffy" style={{ color: jefffyColor, fontSize: jefffySize }}>Actually, Im uncle Jeffy</div>
      <Image src="/images/pokedex-icon.png" alt="Pokedex"
       onClick={handlePokedexClick} style={{ cursor: "pointer", width: "150px" }}
      />
      <Image src="/images/marioHat.png" alt="Mario Hat"
        className={hatFlying ? "marioHatFlying" : ""}
        style={{ width: "150px", cursor: "pointer" }}
        onClick={handleHatClick}
      />
      <TicTacToe />
    </div>
  );
}