import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("homePage/route.tsx"),
    route("/tetris", "tetrisGame/route.tsx"),
    route("/pokemon-guide", "pokemonBlueGuide/route.tsx")
] satisfies RouteConfig;