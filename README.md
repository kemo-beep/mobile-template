# All-in-One iOS App Developer Template

A production-ready template for shipping mobile apps: backend API, Expo app, marketing landing page, and analytics dashboard.

| App | Purpose |
|-----|---------|
| **backend** | Shared API — auth (Better Auth), device/push registration, analytics API, RBAC, app scoping |
| **mobile** | End-user product — sign in, push registration, calls backend API |
| **analytics** | Developer dashboard — sign in (email/Google), view usage, export CSV/XLSX, app selector, role-aware |
| **web** | Public landing page — marketing, links to App Store / Play Store |

See [docs/doc.md](docs/doc.md) for architecture and responsibilities.

## Prerequisites

- Node.js 18+
- npm
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (included in backend)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) / EAS CLI (for builds)
- A [NeonDB](https://neon.tech) database
- An [Expo](https://expo.dev) account (for EAS Build)

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo-url>
cd mobile-template
```

Install each app:

```bash
cd backend && npm install && cd ..
cd mobile && npm install && cd ..
cd web && npm install && cd ..
cd analytics && npm install && cd ..
```

### 2. Backend (required for mobile and analytics)

```bash
cd backend
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` and set:

- `DATABASE_URL` — NeonDB connection string from [console.neon.tech](https://console.neon.tech)
- `BETTER_AUTH_SECRET` — Generate with `openssl rand -base64 32`
- `BETTER_AUTH_URL` — `http://localhost:8787` for local dev

Then:

```bash
npm run db:push
npm run dev
```

API runs at http://localhost:8787

### 3. Mobile app

```bash
cd mobile
```

Optional: copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` (e.g. `http://192.168.1.x:8787`) for physical device testing.

- iOS Simulator / Web: `localhost` works by default
- Android Emulator: uses `10.0.2.2` by default
- Physical device: set `EXPO_PUBLIC_API_URL` to your machine's IP

```bash
npm run start
```

### 4. Web (landing page)

```bash
cd web
npm run dev
```

Runs at http://localhost:3000. Optional: copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_APP_STORE_URL` and `NEXT_PUBLIC_PLAY_STORE_URL` for download buttons.

### 5. Analytics dashboard

```bash
cd analytics
cp .env.local.example .env.local
```

Set `NEXT_PUBLIC_API_URL=http://localhost:8787` in `.env.local`.

```bash
npm run dev
```

Runs at http://localhost:3001 (or next available port). Sign in with the same auth as the mobile app (admin/developer role required for analytics).

## Project structure

See [docs/project-structure.md](docs/project-structure.md) for details.

## Environment variables

| App | Key | Required | Description |
|-----|-----|----------|-------------|
| backend | `DATABASE_URL` | Yes | NeonDB connection string |
| backend | `BETTER_AUTH_SECRET` | Yes | Auth signing secret |
| backend | `BETTER_AUTH_URL` | Yes | Public API URL |
| mobile | `EXPO_PUBLIC_API_URL` | No | Override API URL (default: localhost/10.0.2.2) |
| mobile | `EXPO_PUBLIC_SENTRY_DSN` | No | Sentry DSN for crash reporting |
| web | `NEXT_PUBLIC_APP_STORE_URL` | No | App Store link for download button |
| web | `NEXT_PUBLIC_PLAY_STORE_URL` | No | Play Store link for download button |
| analytics | `NEXT_PUBLIC_API_URL` | Yes | Backend API URL |

See each app's `.env.example` or `.env.local.example` for full lists.

## Pre-launch checklist

Before shipping to the App Store:

- [ ] Replace placeholders in `mobile/eas.json`: `EXPO_PUBLIC_API_URL`, `appleId`, `ascAppId`, `appleTeamId`
- [ ] Update `mobile/app.json`: `name`, `slug`, `ios.bundleIdentifier`, Sentry org/project
- [ ] Add privacy policy URL (required by App Store) — e.g. add `/privacy` on the web app, set in App Store Connect
- [ ] If using Sign in with Apple: set `APPLE_CLIENT_ID` and `APPLE_CLIENT_SECRET` in backend `.dev.vars` / Wrangler secrets
- [ ] Set `NEXT_PUBLIC_APP_STORE_URL` and `NEXT_PUBLIC_PLAY_STORE_URL` on the landing page when app is live

## Deployment

- **Backend:** Cloudflare Workers — `cd backend && npm run deploy`. Set secrets via `wrangler secret put`.
- **Mobile:** EAS Build — `cd mobile && eas build --platform all`. See `mobile/eas.json` and `.eas/workflows/`.
- **Web / Analytics:** Vercel, Netlify, or Cloudflare Pages. Connect the repo and set env vars.

## Scripts

| App | Command | Description |
|-----|---------|-------------|
| backend | `npm run dev` | Start Wrangler dev server |
| backend | `npm run deploy` | Deploy to Cloudflare Workers |
| backend | `npm run db:push` | Push schema (dev) |
| backend | `npm run test` | Run tests |
| mobile | `npm run start` | Start Expo dev server |
| mobile | `npm run ios` | Run on iOS |
| mobile | `npm run android` | Run on Android |
| mobile | `npm run test` | Run tests |
| web | `npm run dev` | Start Next.js dev server |
| analytics | `npm run dev` | Start analytics dashboard |
