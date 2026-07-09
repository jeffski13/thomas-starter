import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("homePage/route.tsx"),
    route("/tetris", "tetris/route.tsx"),
    route("/Zenith", "HowToMakeZenith/route.tsx")
] satisfies RouteConfig;