import { useState } from "react";
import { Image } from "react-bootstrap";
import TicTacToe from "../ticTacToe";
import './styles.css';

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
      <a href="/tetris">tetris</a>
      <div>The Zaniest Website</div>
      <div className="uncleJeffy" style={{ color: jefffyColor, fontSize: jefffySize }}>Actually, Im uncle Jeffy</div>
      <Image src="/images/pokedex-icon.png" alt="Pokedex"
       onClick={handlePokedexClick} style={{ cursor: "pointer", width: "150px" }}
      />
      <Image src="/digiegg.jpg" alt="Digiegg"
        onClick={() => { setJeffyColor("green"); setJeffySize("0.8rem"); }}
        style={{ cursor: "pointer", width: "150px" }}
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