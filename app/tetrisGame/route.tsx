import type { Route } from "./+types/home";
import ThomPageWithContent from "../infra/ThomPageWithContent"
import TetrisPage from ".";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Jeff Szcinski" },
    { name: "Home Page", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = ThomPageWithContent(TetrisPage);
export default function JeffskiHome() {
  return <Content />;
}
