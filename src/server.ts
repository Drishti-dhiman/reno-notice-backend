import express from "express";
import cors from "cors"
import type { Request, Response } from "express";
import noticeRouter from "./routes/notice.routes.js";
import { config } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://reno-notice-frontend-40jw86nhn-drishti-dhimans-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}))
app.use("/notices", noticeRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Reno backend is running" });
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
