import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("homePage/route.tsx"),
    route("/tetris", "tetrisGame/route.tsx")
] satisfies RouteConfig;