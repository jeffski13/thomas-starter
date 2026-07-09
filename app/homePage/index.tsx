import { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import TicTacToe from "../ticTacToe";
import './styles.css';

export default function HomePage() {
  const [tunkyColor, setTunkyColor] = useState<string | undefined>(undefined);
  const [tunkySize, setTunkySize] = useState<string | undefined>(undefined);
  const [isFlying, setIsFlying] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);

  function randomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
  }

  function randomSize() {
    return `${(Math.random() * 10).toFixed(1)}rem`;
  }

  function handlePokedexClick() {
    setTunkyColor(randomColor());
    setTunkySize(randomSize());
  }

  return (
    <div className="homePage" >
      <a href="/tetris">tetris</a>
      <div>tHe fuNniESt wEBSITe</div>
      <a href="/Zenith">Zenith</a>
      <div className="tunkyToe" style={{ color: tunkyColor, fontSize: tunkySize }}>tunky toe</div>
      <img src="/images/pokedex-icon.png" alt="Pokedex"
       onClick={handlePokedexClick} style={{ cursor: 'pointer' }}
      />
      <img
        src="/images/bleezebat.jpg"
        alt="Bleeze Bat"
        className={isFlying ? 'bleezeBatFlying' : ''}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          const audio = new Audio('/ah.mp3');
          setIsFlying(true);
          audio.play();
          audio.onended = () => setIsFlying(false);
        }}
      />
      <TicTacToe />
      <div
        style={{ background: 'black', width: '100%', height: '900px', margin: '16px auto', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        onClick={() => {
          setShowJumpscare(true);
          new Audio('/laugh.mp3').play();
        }}
      >
        {showJumpscare && (
          <img src="/images/jumpscare.gif" alt="jumpscare" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>
    </div>
  );
}