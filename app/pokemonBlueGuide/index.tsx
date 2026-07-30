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
    alt: "Silph Co. office and enter the Building",
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
  const [speed, setSpeed] = useState(() => {
    if (typeof window === "undefined") return 4;
    const saved = window.localStorage.getItem("pokeballSpeed");
    return saved !== null ? Number(saved) : 4;
  });
  const [colorHue, setColorHue] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = window.localStorage.getItem("pokeballColorHue");
    return saved !== null ? Number(saved) : 0;
  });
  const bouncingPosRef = useRef({ x: 0, y: 0 });
  const bouncingDirRef = useRef({ x: 1, y: 1 });
  const bouncingRotationRef = useRef(0);
  const speedRef = useRef(speed);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    speedRef.current = speed;
    window.localStorage.setItem("pokeballSpeed", String(speed));
  }, [speed]);

  useEffect(() => {
    window.localStorage.setItem("pokeballColorHue", String(colorHue));
  }, [colorHue]);

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

  const pageWrapperVars = {
    "--left-border-color": leftBorderColor,
    "--right-border-color": rightBorderColor,
  } as React.CSSProperties;

  const bouncingPokeballVars = {
    "--pokeball-left": `${bouncingPos.x}px`,
    "--pokeball-top": `${bouncingPos.y}px`,
    "--pokeball-rotation": `${bouncingRotation}deg`,
    "--pokeball-hue": `${colorHue}deg`,
  } as React.CSSProperties;

  return (
    <div className="pageWrapper" style={pageWrapperVars}>
      {isBouncing && (
        <img
          src="/images/pokemonGuide/pokeball.png"
          alt=""
          className="bouncingPokeball"
          onClick={() => setIsBouncing(false)}
          style={bouncingPokeballVars}
        />
      )}
      {isBouncing && (
        <div className="speedControlPanel">
          <label htmlFor="pokeballSpeed" className="speedControlLabel">Speed</label>
          <input
            id="pokeballSpeed"
            type="range"
            min={1}
            max={15}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <label htmlFor="pokeballColor" className="speedControlLabel">Color</label>
          <input
            id="pokeballColor"
            type="range"
            min={0}
            max={360}
            value={colorHue}
            onChange={(e) => setColorHue(Number(e.target.value))}
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
              className="logoImage"
              onClick={() => setIsBouncing(true)}
            />
          </Col>
        </Row>
      </Container>

      <h3>how to get a master ball in blue version</h3>
      <h5>Requirements</h5>
      <ListGroup>
        <ListGroup.Item className="requirementListItem">
          Saffron City Access
          <img src="/images/pokemonGuide/materials/saffron-city.png" alt="Saffron City" className="requirementImage" />
        </ListGroup.Item>
        <ListGroup.Item className="requirementListItem">
          Level 30+ pokemon team
          <img src="/images/pokemonGuide/materials/pokeballx6.png" alt="Level 30+ pokemon team" className="requirementImage" />
        </ListGroup.Item>
        <ListGroup.Item className="requirementListItem">
          Flying Pokemon
          <img src="/images/pokemonGuide/materials/flying-pokemon.png" alt="Flying Pokemon" className="requirementImage" />
        </ListGroup.Item>
        <ListGroup.Item className="requirementListItem">
          Cleared Celadon Game Corner
          <img src="/images/pokemonGuide/materials/celadon-game-corner.png" alt="Celadon Game Corner" className="requirementImage" />
        </ListGroup.Item>
        <ListGroup.Item className="requirementListItem">
          10 Super Potions
          <img src="/images/pokemonGuide/materials/super-potion.png" alt="Super Potions" className="requirementImage" />
        </ListGroup.Item>
      </ListGroup>

      <h5>How to:</h5>
      <div className="howToStepsContainer">
        {howToSteps.map((step, index) => (
          <div key={step.text} className="howToStepCard">
            <span className="howToStepLabel">
              Step {index + 1}
            </span>
            <div className="howToStepContent">
              <p className="howToStepText">{step.text}</p>
              <img src={step.image} alt={step.alt} className="howToStepImage" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
