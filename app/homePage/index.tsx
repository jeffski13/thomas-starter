import { useState } from "react";
import { Image } from "react-bootstrap";
import './styles.css';

export default function HomePage() {
  const [jefffyColor, setJeffyColor] = useState("green");

  function randomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
  }

  return (
    <div className="homePage" >
      <div>Good afternoon Professor Thomas.</div>
      <div className="uncleJeffy" style={{ color: jefffyColor }}>Actually, Im uncle Jeffy</div>
      <Image src="/images/pokedex-icon.png" alt="Pokedex" 
       onClick={() => setJeffyColor(randomColor())} style={{ cursor: "pointer" }} 
      />
    </div>
  );
}