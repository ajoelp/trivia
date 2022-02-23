import { Router } from "express";
import { Login } from "./Login";
import { AuthCallback } from "./AuthCallback";

export const AuthRouter = Router();

AuthRouter.get("/auth/login", Login);
AuthRouter.get("/auth_callback", AuthCallback);
