import { ListGroup } from "react-bootstrap";

interface GuideSection {
  title: string;
  items: string[];
}


export default function terrariaGuide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", marginTop: "1.5rem", color: "#333", padding: "0 1rem" }}>
      <h2 style={{ margin: 0 }}>Pokemon Guide</h2>
      <h3>how to get a master ball in blue version</h3>
      <h5>Requirements</h5>
      <ListGroup>
        <ListGroup.Item>Saffron City Access</ListGroup.Item>
        <ListGroup.Item>Level 30+ pokemon team</ListGroup.Item>
        <ListGroup.Item>Flying Pokemon</ListGroup.Item>
        <ListGroup.Item>Cleared Celadon Game Corner</ListGroup.Item>
        <ListGroup.Item>10 Super Potions</ListGroup.Item>
      </ListGroup>

    </div>
  );
}
