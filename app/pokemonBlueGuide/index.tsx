import { ListGroup } from "react-bootstrap";

interface GuideSection {
  title: string;
  items: string[];
}


export default function pokemonBlueGuide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", marginTop: "1.5rem", color: "#333", padding: "0 1rem" }}>
      <h2 style={{ margin: 0 }}>Pokemon Guide</h2>
      <h3>how to get a master ball in blue version</h3>
      <h5>Requirements</h5>
      <ListGroup>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/images/pokemonGuide/saffron-city.png" alt="Saffron City" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
          Saffron City Access
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/images/pokemonGuide/pokeballx6.png" alt="Level 30+ pokemon team" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
          Level 30+ pokemon team
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/images/pokemonGuide/flying-pokemon.png" alt="Flying Pokemon" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
          Flying Pokemon
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/images/pokemonGuide/celadon-game-corner.png" alt="Celadon Game Corner" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
          Cleared Celadon Game Corner
        </ListGroup.Item>
        <ListGroup.Item style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/images/pokemonGuide/super-potion.png" alt="Super Potions" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
          10 Super Potions
        </ListGroup.Item>
      </ListGroup>

    </div>
  );
}
