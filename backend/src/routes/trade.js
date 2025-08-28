import { Router } from "express";

const router = Router();

// In-memory portfolio and orders for demo
const state = {
  portfolio: { goldBondUnits: 0 },
  lastPricePerUnit: 6000, // INR per unit (mock)
  orders: [],
};

router.get("/portfolio", (_req, res) => {
  res.json({ ...state.portfolio, lastPricePerUnit: state.lastPricePerUnit });
});

router.post("/buy", (req, res) => {
  const { quantity } = req.body || {};
  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({ error: "quantity must be positive number" });
  }
  state.portfolio.goldBondUnits += qty;
  const order = {
    id: `ORD-${Date.now()}`,
    side: "BUY",
    quantity: qty,
    pricePerUnit: state.lastPricePerUnit,
    amount: qty * state.lastPricePerUnit,
    status: "CONFIRMED",
  };
  state.orders.push(order);
  res.json({ message: "Buy order confirmed", order, portfolio: state.portfolio });
});

router.post("/sell", (req, res) => {
  const { quantity } = req.body || {};
  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({ error: "quantity must be positive number" });
  }
  if (qty > state.portfolio.goldBondUnits) {
    return res.status(400).json({ error: "insufficient units" });
  }
  state.portfolio.goldBondUnits -= qty;
  const order = {
    id: `ORD-${Date.now()}`,
    side: "SELL",
    quantity: qty,
    pricePerUnit: state.lastPricePerUnit,
    amount: qty * state.lastPricePerUnit,
    status: "CONFIRMED",
  };
  state.orders.push(order);
  res.json({ message: "Sell order confirmed", order, portfolio: state.portfolio });
});

router.get("/orders", (_req, res) => {
  res.json({ orders: state.orders });
});

export default router;


