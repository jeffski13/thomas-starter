import { useState } from "react";
import { Card, Col, Container, ListGroupItem, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/esm/ListGroup";

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
          top: 50%;
          width: 20%;
          height: 40px;
          transform: translateY(-50%) rotate(-5deg);
          background: linear-gradient(90deg, #ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93, #ff595e);
          border-radius: 20px;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
          z-index: 9999;
          pointer-events: none;
          animation: rainbow-fly-across 1.5s ease-in-out forwards;
        }
      `}</style>

      {flying && <div className="rainbow-bar" onAnimationEnd={() => setFlying(false)} />}

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
        <Col xs={4}></Col>
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
