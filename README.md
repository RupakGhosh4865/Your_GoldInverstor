# GoldInvestor

Full-stack demo: RAG chat about gold investing + mock gold bond trading.

## Stack
- Backend: Node.js (Express), simple RAG + Hugging Face Inference
- Frontend: React + Vite

## Setup

1) Install dependencies
```
cd backend && npm i
cd ../frontend && npm i
```

2) Run backend
```
cd backend
npm run dev
```
- Server: http://localhost:4000
- Optional env: see `ENV.md`

3) Run frontend
```
cd frontend
npm run dev
```
- App: http://localhost:5173

## APIs

- Chat: `POST /api/chat/message`
  - Body: `{ message: string, history?: {role:"user"|"assistant", content:string}[] }`
  - Returns: `{ response: string, redirectToTrade: boolean }`

- Trade:
  - `GET /api/trade/portfolio`
  - `POST /api/trade/buy` `{ quantity:number }`
  - `POST /api/trade/sell` `{ quantity:number }`
  - `GET /api/trade/orders`

## Notes
- In-memory orders/portfolio reset on server restart.
- RAG uses a small retriever + HF text generation fallback.
- Prompt steers users to Trade when intent is buy/sell/order.

