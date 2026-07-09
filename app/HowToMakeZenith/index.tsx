import ListGroup from "react-bootstrap/esm/ListGroup";

export default function HowToMakeZenithPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "1rem" }}>
      <h2 style={{ margin: 0 }}>How To Make Zenith</h2>
      <p style={{ color: "#072c71" }}>Coming soon.</p>
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
    </div>
  );
}
