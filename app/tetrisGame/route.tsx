import type { Route } from "./+types/home";
import ThomPageWithContent from "../infra/ThomPageWithContent"
import TetrisPage from ".";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Tetris page man time" },
    { name: "Tetris Game", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = ThomPageWithContent(TetrisPage);
export default function JeffskiHome() {
  return <Content />;
}
