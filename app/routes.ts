import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("homePage/route.tsx"),
    route("/tetris", "tetris/route.tsx"),
    route("/how-to-make-zenith", "HowToMakeZenith/route.tsx")
] satisfies RouteConfig;