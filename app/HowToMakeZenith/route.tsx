import type { Route } from "./+types/home";
import ThomPageWithContent from "../infra/ThomPageWithContent"
import howToMakeZenithPage from ".";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "How To Make Zenith" },
    { name: "Home Page", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = ThomPageWithContent(howToMakeZenithPage);
export default function HowToMakeZenith() {
  return <Content />;
}
