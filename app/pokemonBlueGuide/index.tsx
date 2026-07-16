import { useEffect, useRef, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import "./styles.css";

interface GuideSection {
  title: string;
  items: string[];
}

interface HowToStep {
  text: string;
  image: string;
  alt: string;
}

function interpolateColor(start: [number, number, number], end: [number, number, number], t: number): string {
  const r = Math.round(start[0] + (end[0] - start[0]) * t);
  const g = Math.round(start[1] + (end[1] - start[1]) * t);
  const b = Math.round(start[2] + (end[2] - start[2]) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

const RED: [number, number, number] = [255, 0, 0];
const BLUE: [number, number, number] = [0, 0, 255];

const howToSteps: HowToStep[] = [
  {
    text: "Navigate to the Silph Co. office.",
    image: "/images/pokemonGuide/steps/SilphCo.png",
    alt: "Silph Co. office",
  },
  {
    text: "Enter the office.",
    image: "/images/pokemonGuide/steps/SilphCo.png",
    alt: "Entering Silph Co.",
  },
  {
    text: "Fight all team rocket grunts.",
    image: "/images/pokemonGuide/steps/rocketGrunt.png",
    alt: "Team Rocket grunt battle",
  },
  {
    text: "Defeat Giovani.",
    image: "/images/pokemonGuide/steps/giovanniBattle.jpg",
    alt: "Giovanni battle",
  },
  {
    text: "Talk to the president of Silph Co.",
    image: "/images/pokemonGuide/steps/youGotAMasterball.jpg",
    alt: "Received the Master Ball",
  },
];


export default function pokemonBlueGuide() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, ratio)));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const leftBorderColor = interpolateColor(RED, BLUE, scrollProgress);
  const rightBorderColor = interpolateColor(BLUE, RED, scrollProgress);

  const BOUNCING_POKEBALL_SIZE = 80;
  const [isBouncing, setIsBouncing] = useState(false);
  const [bouncingPos, setBouncingPos] = useState({ x: 0, y: 0 });
  const [bouncingRotation, setBouncingRotation] = useState(0);
  const [speed, setSpeed] = useState(4);
  const bouncingPosRef = useRef({ x: 0, y: 0 });
  const bouncingDirRef = useRef({ x: 1, y: 1 });
  const bouncingRotationRef = useRef(0);
  const speedRef = useRef(speed);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!isBouncing) return;

    bouncingPosRef.current = {
      x: window.innerWidth / 2 - BOUNCING_POKEBALL_SIZE / 2,
      y: window.innerHeight / 2 - BOUNCING_POKEBALL_SIZE / 2,
    };
    setBouncingPos({ ...bouncingPosRef.current });
    bouncingRotationRef.current = 0;
    setBouncingRotation(0);
    bouncingDirRef.current = { x: 1, y: 1 };

    const step = () => {
      const pos = bouncingPosRef.current;
      const dir = bouncingDirRef.current;
      const currentSpeed = speedRef.current;

      pos.x += dir.x * currentSpeed;
      pos.y += dir.y * currentSpeed * 0.75;

      if (pos.x <= 0) {
        pos.x = 0;
        dir.x = 1;
        bouncingRotationRef.current += 15;
        setBouncingRotation(bouncingRotationRef.current);
      } else if (pos.x + BOUNCING_POKEBALL_SIZE >= window.innerWidth) {
        pos.x = window.innerWidth - BOUNCING_POKEBALL_SIZE;
        dir.x = -1;
        bouncingRotationRef.current += 15;
        setBouncingRotation(bouncingRotationRef.current);
      }

      if (pos.y <= 0) {
        pos.y = 0;
        dir.y = 1;
      } else if (pos.y + BOUNCING_POKEBALL_SIZE >= window.innerHeight) {
        pos.y = window.innerHeight - BOUNCING_POKEBALL_SIZE;
        dir.y = -1;
      }

      setBouncingPos({ x: pos.x, y: pos.y });
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isBouncing]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", color: "#333", padding: "0 1rem", minHeight: "100vh", borderLeft: `16px solid ${leftBorderColor}`, borderRight: `16px solid ${rightBorderColor}` }}>
      {isBouncing && (
        <img
          src="/images/pokemonGuide/pokeball.png"
          alt=""
          onClick={() => setIsBouncing(false)}
          style={{
            position: "fixed",
            left: bouncingPos.x,
            top: bouncingPos.y,
            width: `${BOUNCING_POKEBALL_SIZE}px`,
            height: `${BOUNCING_POKEBALL_SIZE}px`,
            transform: `rotate(${bouncingRotation}deg)`,
            transition: "transform 0.2s ease",
            zIndex: 1000,
            cursor: "pointer",
          }}
        />
      )}
      {isBouncing && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
            zIndex: 1001,
          }}
        >
          <label htmlFor="pokeballSpeed" style={{ fontSize: "0.85rem" }}>Speed</label>
          <input
            id="pokeballSpeed"
            type="range"
            min={1}
            max={15}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      )}
      <Container>
        <Row className="guideTitle" >
          <Col xs={4}></Col>
          <Col xs={4}><h2>Pokemon Guide</h2></Col>
          <Col xs={4}>
            <img
              src="/images/pokemonGuide/logo.webp"
              style={{ height: "50px", cursor: "pointer" }}
              onClick={() => setIsBouncing(true)}
            />
          </Col>
        </Row>
      </Container>

      <h3>how to get a master ball in blue version</h3>
      <h5>Requirements</h5>
      <ListGroup>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Saffron City Access
          <img src="/images/pokemonGuide/materials/saffron-city.png" alt="Saffron City" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Level 30+ pokemon team
          <img src="/images/pokemonGuide/materials/pokeballx6.png" alt="Level 30+ pokemon team" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Flying Pokemon
          <img src="/images/pokemonGuide/materials/flying-pokemon.png" alt="Flying Pokemon" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Cleared Celadon Game Corner
          <img src="/images/pokemonGuide/materials/celadon-game-corner.png" alt="Celadon Game Corner" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          10 Super Potions
          <img src="/images/pokemonGuide/materials/super-potion.png" alt="Super Potions" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
      </ListGroup>

      <h5>How to:</h5>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "450px", gap: "1rem" }}>
        {howToSteps.map((step, index) => (
          <div key={step.text} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem", border: "2px solid #333", borderRadius: "8px" }}>
            <span style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#666" }}>
              Step {index + 1}
            </span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <p style={{ margin: 0, flex: 1, fontSize: "0.85rem" }}>{step.text}</p>
              <img src={step.image} alt={step.alt} style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "4px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
