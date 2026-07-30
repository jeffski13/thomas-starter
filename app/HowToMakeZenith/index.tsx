import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroupItem, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/esm/ListGroup";

const RAINBOW_SPEED_KEY = "zenith-rainbow-speed";
const RAINBOW_SIZE_KEY = "zenith-rainbow-size";

function loadStoredNumber(key: string, fallback: number) {
  const stored = localStorage.getItem(key);
  const parsed = stored === null ? NaN : Number(stored);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const craftingSteps = [
  {
    label: "Step 1",
    text: "Go to mythril or orichalcum anvil",
    images: ["/images/zenith/Mythril_Anvil.webp", "/images/zenith/orecalcumanvil.jpg"],
  },
  {
    label: "Step 2",
    text: "Select zenith",
    images: ["/images/zenith/zenith.jpg"],
  },
];

export default function HowToMakeZenithPage() {
  const [flying, setFlying] = useState(false);
  const [dancing, setDancing] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [showDeathText, setShowDeathText] = useState(false);

  function dismissGrab() {
    setGrabbing(false);
    setShowDeathText(false);
  }
  const [rainbowSpeed, setRainbowSpeed] = useState(() => loadStoredNumber(RAINBOW_SPEED_KEY, 0.3));
  const [rainbowSize, setRainbowSize] = useState(() => loadStoredNumber(RAINBOW_SIZE_KEY, 1));

  useEffect(() => {
    localStorage.setItem(RAINBOW_SPEED_KEY, String(rainbowSpeed));
  }, [rainbowSpeed]);

  useEffect(() => {
    localStorage.setItem(RAINBOW_SIZE_KEY, String(rainbowSize));
  }, [rainbowSize]);

  return (
    <div
      className="funny-border"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "1rem", borderStyle: "dashed", borderWidth: "20px", borderRadius: "24px", boxSizing: "border-box", minHeight: "100vh" }}
    >
      <style>{`
        @keyframes funny-border-spin {
          0% { border-color: #ff595e; }
          20% { border-color: #ffca3a; }
          40% { border-color: #8ac926; }
          60% { border-color: #1982c4; }
          80% { border-color: #6a4c93; }
          100% { border-color: #ff595e; }
        }
        .funny-border {
          animation: funny-border-spin 4s linear infinite;
        }
        @keyframes rainbow-fly-across {
          0% { left: -20%; }
          100% { left: 100%; }
        }
        .rainbow-bar {
          position: fixed;
          top: 25%;
          transform: translateY(-50%) rotate(-5deg);
          background: linear-gradient(90deg, #ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93, #ff59ff);
          border-radius: 20px;
          box-shadow: 0 0 50px rgb(0, 0, 0);
          z-index: -1;
          pointer-events: none;
          animation-name: rainbow-fly-across;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }
        .speed-meter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        @keyframes man-guy-dance {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-20deg) scale(1.2); }
          50% { transform: rotate(20deg) scale(0.9); }
          75% { transform: rotate(-10deg) scale(1.1); }
        }
        .man-guy {
          font-size: 4.5rem;
          line-height: 1;
          cursor: pointer;
          display: inline-block;
        }
        .man-guy.dancing {
          animation: man-guy-dance 0.6s ease-in-out;
        }
        .grab-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
        }
        @keyframes grabbing-hand-in {
          0% { transform: translate(120vw, 120vh) rotate(30deg) scale(1); }
          60% { transform: translate(-5vw, -5vh) rotate(-10deg) scale(3); }
          100% { transform: translate(0, 0) rotate(0deg) scale(2.5); }
        }
        .grabbing-hand {
          font-size: 8rem;
          animation: grabbing-hand-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes death-text-fade {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .death-text {
          position: absolute;
          text-align: center;
          animation: death-text-fade 0.6s ease-out forwards;
        }
        .you-died {
          font-size: 4rem;
          font-weight: bold;
          color: #b30000;
          letter-spacing: 0.1em;
        }
        .dont-be-surprised {
          font-size: 1.25rem;
          color: #eee;
          margin-top: 0.5rem;
        }
      `}</style>

      {grabbing &&
        <div className="grab-overlay" onClick={dismissGrab}>
          <span
            role="img"
            aria-label="grabbing hand"
            className="grabbing-hand"
            onAnimationEnd={() => setShowDeathText(true)}
          >
            🖐️
          </span>
          {showDeathText &&
            <div className="death-text">
              <div className="you-died">YOU DIED</div>
              <div className="dont-be-surprised">don't be surprised</div>
            </div>
          }
        </div>
      }

      {flying &&
        <div
          className="rainbow-bar"
          style={{
            animationDuration: `${rainbowSpeed}s`,
            width: `${20 * rainbowSize}%`,
            height: `${50 * rainbowSize}px`,
          }}
          onAnimationEnd={() => setFlying(false)}
        />
      }

      <div className="speed-meter">
        <label htmlFor="rainbow-speed">Rainbow speed</label>
        <input
          id="rainbow-speed"
          type="range"
          min={0.1}
          max={3}
          step={0.1}
          value={rainbowSpeed}
          onChange={(e) => setRainbowSpeed(Number(e.target.value))}
        />
        <span>{rainbowSpeed.toFixed(1)}s</span>
      </div>

      <div className="speed-meter">
        <label htmlFor="rainbow-size">Rainbow size</label>
        <input
          id="rainbow-size"
          type="range"
          min={0.5}
          max={4}
          step={0.1}
          value={rainbowSize}
          onChange={(e) => setRainbowSize(Number(e.target.value))}
        />
        <span>{rainbowSize.toFixed(1)}x</span>
        <Button onClick={()=>{
          setRainbowSize(1.0);
          setRainbowSpeed(1.5);
        }}>reset</Button>
        <Button variant="dark" onClick={() => setGrabbing(true)}>???</Button>
      </div>

      <img src="/images/zenith/zenith.jpg" alt="true nights edge" height={100} />
      <Container><Row>
        <Col xs={1}></Col>
        <Col xs={3}>
          <img
            src="images/zenith/logo.webp"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => setFlying(true)}
          ></img>
        </Col>
        <Col xs={4}><h1 style={{ margin: 0 }}>How To Make Zenith</h1></Col>
        <Col xs={4} className="d-flex align-items-center gap-2">
          <img
            src="/images/pokedex-icon.png"
            alt="pokedex"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => new Audio("/augh.mp3").play()}
          />
          <span
            role="img"
            aria-label="man guy"
            className={`man-guy${dancing ? " dancing" : ""}`}
            onClick={() => setDancing(true)}
            onAnimationEnd={() => setDancing(false)}
          >
            🕺
          </span>
        </Col>
      </Row></Container>


      <h2>Materials list</h2>
      <ListGroup>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/True_NightEdge.webp" alt="true nights edge" height={32} />
          true nights edge
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/copper_shortsword.jpg" alt="copper shortsword" height={32} />
          copper shortsword
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/EnchantedSword.webp" alt="enchanted sword" height={32} />
          enchanted sword
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/star-fury.webp" alt="starfury" height={32} />
          starfury
        </ListGroup.Item>

        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/starwrath.png" alt="meowmere" height={32} />
          starwrath
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/meowmere.png" alt="meowmere" height={32} />
          meowmere
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/Seedler.webp" alt="seedler" height={32} />
          seedler
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/Beekeeper.png" alt="beekeeper" height={32} />
          beekeeper
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/horsemansblade.png" alt="horsemans blade" height={32} />
          horsemans blade
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center gap-2">
          <img src="/images/zenith/TerraBlade.webp" alt="terra blade" height={32} />
          terra blade
        </ListGroup.Item>
      </ListGroup>

      <h2>crafting</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px" }}>
        {craftingSteps.map((step, index) => (
          <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Card style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", paddingTop: "1rem" }}>
                {step.images.map((image) => (
                  <img key={image} src={image} alt={step.label} style={{ height: "100px", objectFit: "contain" }} />
                ))}
              </div>
              <Card.Body>
                <Card.Title>{step.label}</Card.Title>
                <Card.Text>{step.text}</Card.Text>
              </Card.Body>
            </Card>
            {index < craftingSteps.length - 1 && <hr style={{ width: "100%" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
