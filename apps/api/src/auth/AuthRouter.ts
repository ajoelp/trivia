import { Router } from "express";
import { Login } from "./Login";
import { AuthCallback } from "./AuthCallback";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CurrentUser } from "./CurrentUser";

export const AuthRouter = Router();

AuthRouter.get("/auth/login", Login);
AuthRouter.get("/auth_callback", AuthCallback);
AuthRouter.get("/auth/user", [AuthMiddleware, CurrentUser]);
