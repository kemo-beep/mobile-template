# Analytics Dashboard

Developer dashboard for internal app metrics — users, devices, sessions, and growth charts.

## Setup

1. Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8787`).
2. Start the backend: `cd backend && npm run dev`.

## Run

```bash
npm run dev
```

Sign in with your backend account (or create one) to view analytics.

## Structure

- `app/page.tsx` — Entry (sign-in CTA or redirect to dashboard)
- `app/(auth)/sign-in`, `sign-up` — Auth pages
- `app/(dashboard)/analytics` — Main analytics page with charts
