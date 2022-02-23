import { Router } from "express";
import { Login } from "./Login";

export const AuthRouter = Router();

AuthRouter.post("/Login", Login);
