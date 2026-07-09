import type { Route } from "./+types/home";
import ThomPageWithContent from "../infra/ThomPageWithContent"
import terrariaGuide from ".";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Terraria Guide" },
    { name: "Terraria Guide", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = ThomPageWithContent(terrariaGuide);
export default function JeffskiterrariaGuide() {
  return <Content />;
}
