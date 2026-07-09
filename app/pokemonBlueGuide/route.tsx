import type { Route } from "./+types/home";
import ThomPageWithContent from "../infra/ThomPageWithContent"
import pokemonBlueGuide from ".";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Terraria Guide" },
    { name: "Terraria Guide", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = ThomPageWithContent(pokemonBlueGuide);
export default function JeffskipokemonBlueGuide() {
  return <Content />;
}
