import { Col, Container, ListGroup, Row } from "react-bootstrap";

interface GuideSection {
  title: string;
  items: string[];
}


export default function pokemonBlueGuide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", marginTop: "1.5rem", color: "#333", padding: "0 1rem" }}>
      <Container>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}><h2 style={{ margin: 0 }}>Pokemon Guide</h2></Col>
          <Col xs={4}><img src="/images/pokemonGuide/logo.webp" style={{ height: "50px" }} /></Col>
        </Row>
      </Container>

      <h3>how to get a master ball in blue version</h3>
      <h5>Requirements</h5>
      <ListGroup>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Saffron City Access
          <img src="/images/pokemonGuide/saffron-city.png" alt="Saffron City" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Level 30+ pokemon team
          <img src="/images/pokemonGuide/pokeballx6.png" alt="Level 30+ pokemon team" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Flying Pokemon
          <img src="/images/pokemonGuide/flying-pokemon.png" alt="Flying Pokemon" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          Cleared Celadon Game Corner
          <img src="/images/pokemonGuide/celadon-game-corner.png" alt="Celadon Game Corner" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          10 Super Potions
          <img src="/images/pokemonGuide/super-potion.png" alt="Super Potions" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
        </ListGroup.Item>
      </ListGroup>

      
    </div>
  );
}
