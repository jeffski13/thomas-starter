import type { Route } from "./+types/home";
import ThomPageWithContent from "../infra/ThomPageWithContent"
import tetrisPage from ".";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "this isn't normal tetris" },
    { name: "Home Page", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = ThomPageWithContent(tetrisPage);
export default function JeffskiHome() {
  return <Content />;
}
