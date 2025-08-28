import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showCTA, setShowCTA] = useState(false);
  const navigate = useNavigate();

  const sendMessage = async (overrideText) => {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed) return;
    const nextHistory = [...messages, { role: "user", content: trimmed }];
    setMessages(nextHistory);
    setInput(overrideText ? input : "");
    const res = await fetch(`${API_BASE}/chat/message`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: trimmed, history: nextHistory }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.response || "" }]);
    // Always show CTA after an assistant reply to guide the user to trading
    setShowCTA(true);
  };

  return (
    <div className="card slide-up">
      <h2>GoldInvestor</h2>
      <div className="chatbox">
        {messages.map((m, idx) => (
          <div key={idx} style={{ margin: "8px 0" }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>
      <div className="suggest">
        <button className="pill" onClick={() => sendMessage("What are the benefits of Sovereign Gold Bonds?")}>Benefits of SGBs?</button>
        <button className="pill" onClick={() => sendMessage("How do I buy gold bonds and what are the risks?")}>How to buy and risks?</button>
        <button className="pill" onClick={() => sendMessage("Should I invest in SGBs vs physical gold for 5 years?")}>SGBs vs physical?</button>
      </div>
      <div className="composer">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about gold investing..." />
        <button className="btn primary" onClick={() => sendMessage()}>Send</button>
      </div>
      {showCTA && (
        <div className="cta-banner fade-in">
          You can buy and sell gold bonds via our Trade Bank.
          <button className="cta" onClick={() => navigate("/trade-bank")}>Open Trade Bank</button>
        </div>
      )}
    </div>
  );
}

function TradeBank() {
  const [portfolio, setPortfolio] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const load = async () => {
    const p = await fetch(`${API_BASE}/trade/portfolio`).then((r) => r.json());
    setPortfolio(p);
  };

  useEffect(() => {
    load();
  }, []);

  const proceed = (side) => {
    navigate(`/payment?side=${side}&qty=${Number(qty)}`);
  };

  return (
    <div className="card slide-up parallax">
      <h2>Trade Bank — Gold Bonds</h2>
      {portfolio && (
        <div style={{ marginBottom: 12 }}>
          <div>Units: <b>{portfolio.goldBondUnits}</b></div>
          <div>Price per unit (mock): <b>₹{portfolio.lastPricePerUnit}</b></div>
        </div>
      )}
      <div className="row">
        <input className="input" type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />
        <button className="btn primary" onClick={() => proceed("buy")}>Buy</button>
        <button className="btn" onClick={() => proceed("sell")}>Sell</button>
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        View your recent trades in <Link to="/orders">Orders</Link>.
      </div>
    </div>
  );
}

function Payment() {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const side = params.get("side") || "buy";
  const qty = Number(params.get("qty") || 1);
  const [processing, setProcessing] = useState(false);

  const pay = async () => {
    setProcessing(true);
    // Simulate payment delay
    await new Promise((r) => setTimeout(r, 1200));
    // Place order on backend after payment success
    const res = await fetch(`${API_BASE}/trade/${side}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });
    const data = await res.json();
    const orderId = data?.order?.id;
    navigate(`/confirm?orderId=${encodeURIComponent(orderId || "")}`);
  };

  return (
    <div className="card center slide-up">
      <h2>Payment</h2>
      <p>Transaction: <b>{side.toUpperCase()}</b> {qty} unit(s) of Gold Bond.</p>
      <div className="payment">
        <div className="loader" />
        <button className="btn primary" onClick={pay} disabled={processing}>{processing ? "Processing..." : "Pay Now"}</button>
      </div>
      <p className="muted">Demo payment uses static data.</p>
    </div>
  );
}

function Confirmation() {
  const params = new URLSearchParams(useLocation().search);
  const orderId = params.get("orderId");
  const navigate = useNavigate();
  return (
    <div className="card center success-pop glow">
      <div className="checkmark">✓</div>
      <h2>Order Confirmed</h2>
      <p>Your order <b>{orderId || "(demo)"}</b> has been placed successfully.</p>
      <div className="row">
        <button className="btn" onClick={() => navigate("/")}>Back to Chat</button>
        <button className="btn primary" onClick={() => navigate("/trade-bank")}>View Trade Bank</button>
      </div>
    </div>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      const o = await fetch(`${API_BASE}/trade/orders`).then((r) => r.json());
      setOrders(o.orders || []);
    })();
  }, []);
  return (
    <div className="card slide-right">
      <h2>Orders</h2>
      {!orders.length && <p className="muted">No orders yet.</p>}
      <ul className="orders">
        {orders.map((o) => (
          <li key={o.id} className="order-tile">
            <div className="badge">{o.side}</div>
            <div className="detail"><b>{o.id}</b></div>
            <div className="detail">Qty: <b>{o.quantity}</b></div>
            <div className="detail">@ ₹{o.pricePerUnit} = <b>₹{o.amount}</b></div>
            <div className="status ok">{o.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  function PriceTicker() {
    const [price, setPrice] = useState(6000);
    const [series, setSeries] = useState(() => Array.from({ length: 40 }, (_, i) => 6000 + Math.sin(i / 2) * 8));
    const [delta, setDelta] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        const step = (Math.random() - 0.5) * 18; // random walk
        setPrice((p) => {
          const next = Math.max(5800, Math.min(6200, p + step));
          setDelta(next - p);
          setSeries((s) => [...s.slice(1), next]);
          return next;
        });
      }, 1500);
      return () => clearInterval(id);
    }, []);
    const path = useMemo(() => {
      const w = 120, h = 28;
      const min = Math.min(...series), max = Math.max(...series);
      const norm = series.map((v, i) => {
        const x = (i / (series.length - 1)) * w;
        const y = h - ((v - min) / (max - min || 1)) * h;
        return [x, y];
      });
      return `M ${norm.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L ")}`;
    }, [series]);
    const up = delta >= 0;
    const pct = ((series.at(-1) - series[0]) / series[0]) * 100;
    return (
      <div className="ticker flex">
        <svg width="120" height="28" viewBox="0 0 120 28" className={up ? "spark up" : "spark down"}>
          <path d={path} fill="none" strokeWidth="2" />
        </svg>
        <div className="px">
          <div className="px-line"><span className={up ? "pulse up" : "pulse down"} />XAU/INR mock</div>
          <div className="px-val">₹{price.toFixed(0)} <span className={up ? "up" : "down"}>{pct.toFixed(2)}%</span></div>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="shell">
        <header className="header">
          <Link to="/" className="brand">GoldInvestor</Link>
          <PriceTicker />
          <nav>
            <Link to="/" className="nav">Chat</Link>
            <Link to="/trade-bank" className="nav">Trade Bank</Link>
            <Link to="/orders" className="nav">Orders</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/trade-bank" element={<TradeBank />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirm" element={<Confirmation />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


