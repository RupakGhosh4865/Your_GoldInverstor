# GoldInvestor

Full-stack demo: RAG chat about gold investing + mock gold bond trading.


<img width="1914" height="964" alt="Image" src="https://github.com/user-attachments/assets/68c51bac-1723-4d4c-82cd-d09613a8b5e9" />

<img width="1919" height="968" alt="Image" src="https://github.com/user-attachments/assets/32cddd59-64a8-407e-82ee-383f68531ea0" />

<img width="1919" height="962" alt="Image" src="https://github.com/user-attachments/assets/428bd71b-7adf-497e-903b-62be6a895eac" />

<img width="1919" height="970" alt="Image" src="https://github.com/user-attachments/assets/8643618d-3d9a-45c1-9df9-ecd2405c268b" />

<img width="1919" height="972" alt="Image" src="https://github.com/user-attachments/assets/71335ab2-0d76-4122-88a9-4b3ec2e7d1ea" />

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

