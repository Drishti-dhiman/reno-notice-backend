import "dotenv/config";
import express from "express";
import noticeRouter from "./routes/notice.routes.js";
import { config } from "./config/config.js";

const app = express();

app.use(express.json());
app.use("/notices", noticeRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Reno backend is running" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
