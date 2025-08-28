import { Router } from "express";
import { goldRagChat } from "../services/rag.js";

const router = Router();

router.post("/message", async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const response = await goldRagChat({ message, history: Array.isArray(history) ? history : [] });

    // simple redirect signal: if user intent is to buy/sell/order, flag it
    const lower = message.toLowerCase();
    const redirect = /\b(buy|purchase|sell|order)\b/.test(lower) && /\bgold\b/.test(lower);

    res.json({ response, redirectToTrade: redirect });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("/api/chat/message error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;


