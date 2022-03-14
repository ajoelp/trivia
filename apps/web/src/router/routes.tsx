import { RouteInstance } from "./shared";
import { lazy } from "react";

export enum RouteNames {
  WATCH = "watch",
  GAME = "game",
  DASHBOARD = "dashboard",
  LOGIN = "login",
  NOT_FOUND = "not-found",
  ROOT = "root",
}

export const ROUTES: RouteInstance[] = [
  {
    path: "/",
    name: RouteNames.ROOT,
    title: "Trivia",
    component: lazy(() => import("../screens/root-page")),
  },
  {
    path: "/game-setup",
    component: lazy(() => import("../screens/game-setup/Layout")),
    title: "Game Setup",
    auth: true,
    children: [
      {
        path: "",
        name: RouteNames.DASHBOARD,
        component: lazy(() => import("../screens/game-setup/dashboard")),
        title: "Dashboard",
      },
    ],
  },
  {
    path: "/watch",
    component: lazy(() => import("../screens/watch/Layout")),
    title: "Watch",
    children: [
      {
        path: "",
        name: RouteNames.WATCH,
        component: lazy(() => import("../screens/watch/Landing")),
        title: "Watch",
      },
    ],
  },
  {
    path: "/game",
    component: lazy(() => import("../screens/game/Layout")),
    title: "Game",
    children: [
      {
        path: "",
        name: RouteNames.GAME,
        component: lazy(() => import("../screens/game/Landing")),
        title: "Game",
      },
    ],
  },
  {
    path: "/auth/login",
    name: RouteNames.LOGIN,
    component: lazy(() => import("../screens/login")),
    title: "Login",
  },
  { path: "*", name: RouteNames.NOT_FOUND, title: "Not Found", component: lazy(() => import("../screens/not-found")) },
];
