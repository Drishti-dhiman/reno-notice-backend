import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Reno backend is running" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
