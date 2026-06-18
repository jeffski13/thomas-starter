import { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import './styles.css';

export default function HomePage() {
  const [tunkyColor, setTunkyColor] = useState<string | undefined>(undefined);

  function randomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
  }

  return (
    <div className="homePage" >
      <div>Good afternoon Professor Thomas.</div>
      <div className="tunkyToe" style={{ color: tunkyColor }}>tunky toe</div>
      <img src="/images/pokedex-icon.png" alt="Pokedex" 
       onClick={() => setTunkyColor(randomColor())} style={{ cursor: 'pointer' }} 
      />
    </div>
  );
}