import "express-async-errors";
import { AuthRouter } from "./auth/AuthRouter";
import express from "express";
import cors from "cors";
import globalErrorMiddleware from "./middleware/GlobalErrorMiddleware";
import { GamesRouter } from "./games/GamesRouter";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.json({ status: "ok" });
});

app.use(AuthRouter);
app.use(GamesRouter);

app.use(globalErrorMiddleware);

export default app;
