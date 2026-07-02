import type { Route } from "./+types/home";
import ThomPageWithContent from "../infra/ThomPageWithContent"
import HomePage from ".";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "I am not a lizard wierdos" },
    { name: "Home Page", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = ThomPageWithContent(HomePage);
export default function JeffskiHome() {
  return <Content />;
}
