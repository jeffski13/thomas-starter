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
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", color: "#333", padding: "0 1rem", minHeight: "100vh", borderLeft: "16px solid red", borderRight: "16px solid blue" }}>
      <Container>
        <Row className="guideTitle" >
          <Col xs={4}></Col>
          <Col xs={4}><h2>Pokemon Guide</h2></Col>
          <Col xs={4}><img src="/images/pokemonGuide/logo.webp" style={{ height: "50px" }} /></Col>
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
      <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "700px" }}>
        {howToSteps.map((step, index) => (
          <div key={step.text}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem 0" }}>
              <span style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#666" }}>
                Step {index + 1}
              </span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <p style={{ margin: 0, flex: 1 }}>{step.text}</p>
                <img src={step.image} alt={step.alt} style={{ width: "96px", height: "96px", objectFit: "cover", borderRadius: "4px" }} />
              </div>
            </div>
            {index < howToSteps.length - 1 && (
              <hr style={{ border: "none", borderTop: "3px solid #ccc", margin: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
