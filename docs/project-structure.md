# Project structure

See [doc.md](./doc.md) for the full architecture overview, user flows, and component responsibilities.

| App | Purpose |
|-----|---------|
| **web** | Marketing/landing page for the product |
| **analytics** | Developer dashboard — sign in to view internal app metrics, user growth, device breakdown, and session analytics |
| **mobile** | End-user mobile app (Expo) |
| **backend** | Hono API on Cloudflare Workers — auth, users, devices, notifications, analytics |

## Running locally

1. **Backend** (required for analytics and mobile): `cd backend && npm run dev` → http://localhost:8787  
2. **Web** (landing): `cd web && npm run dev` → http://localhost:3000  
3. **Analytics** (dashboard): `cd analytics && npm run dev` → http://localhost:3001 (or next available port)  
4. **Mobile**: `cd mobile && npm run start`

Analytics uses the same backend auth; set `NEXT_PUBLIC_API_URL=http://localhost:8787` in `analytics/.env.local`.
