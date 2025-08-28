import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRouter from "./routes/chat.js";
import tradeRouter from "./routes/trade.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/chat", chatRouter);
app.use("/api/trade", tradeRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${PORT}`);
});


