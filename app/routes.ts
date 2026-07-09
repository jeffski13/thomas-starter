import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("homePage/route.tsx"),
    route("/tetris", "tetrisGame/route.tsx"),
    route("/teraria-guide", "terrariaGuide/route.tsx")
] satisfies RouteConfig;