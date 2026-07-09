import ListGroup from "react-bootstrap/esm/ListGroup";

export default function HowToMakeZenithPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "1rem" }}>
      <h2 style={{ margin: 0 }}>How To Make Zenith</h2>
      <p style={{ color: "#072c71" }}>Coming soon.</p>
      <h2>Materials list</h2>
    <ListGroup>
      <ListGroup.Item>true nights edge</ListGroup.Item>
      <ListGroup.Item>copper shortsword</ListGroup.Item>
      <ListGroup.Item>enchanted sword</ListGroup.Item>
      <ListGroup.Item>starfury</ListGroup.Item>
      <ListGroup.Item>starwrath</ListGroup.Item>
      <ListGroup.Item>meowmere</ListGroup.Item>
      <ListGroup.Item>seedler</ListGroup.Item>
      <ListGroup.Item>beekeeper</ListGroup.Item>
      <ListGroup.Item>horsemans blade</ListGroup.Item>
      <ListGroup.Item>terra blade</ListGroup.Item>
    </ListGroup>
    </div>
  );
}
