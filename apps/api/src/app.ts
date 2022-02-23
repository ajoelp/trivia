import { AuthRouter } from "./auth/AuthRouter";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ status: "ok" });
});

app.use(AuthRouter);

export default app;
