# Mobile Backend API

Production-ready Hono backend template for mobile apps, deployed to Cloudflare Workers.

## Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Framework      | [Hono](https://hono.dev)      |
| Database       | [NeonDB](https://neon.tech) (Serverless PostgreSQL) |
| ORM            | [Drizzle ORM](https://orm.drizzle.team) |
| Authentication | [Better Auth](https://better-auth.com) |
| Deployment     | [Cloudflare Workers](https://workers.cloudflare.com) |
| Validation     | [Zod](https://zod.dev) |

## Project Structure

```
src/
├── index.ts              # Entry point — Hono app with middleware
├── env.ts                # Environment bindings types
├── db/
│   ├── index.ts          # Database connection factory
│   ├── schema/
│   │   ├── index.ts      # Schema barrel export
│   │   ├── auth.ts       # Better Auth tables (user, session, account)
│   │   └── app.ts        # App tables (profiles, devices)
│   └── migrations/       # Drizzle-generated migrations
├── auth/
│   ├── index.ts          # Better Auth instance factory
│   └── middleware.ts     # Auth middleware for protected routes
├── routes/
│   ├── index.ts            # Route aggregator
│   ├── auth.routes.ts      # Auth endpoints (Better Auth handler)
│   ├── user.routes.ts      # User profile CRUD (protected)
│   ├── device.routes.ts    # Device/push notification registration
│   ├── notification.routes.ts  # Send push (test & trigger)
│   └── health.routes.ts    # Health check endpoints
├── middleware/
│   ├── cors.ts           # CORS configuration (production-strict)
│   ├── error-handler.ts  # Global error handler
│   ├── logger.ts         # Request logger (with request ID)
│   ├── rate-limit.ts     # Rate limiting
│   ├── request-id.ts     # X-Request-Id for tracing
│   └── security-headers.ts # Security headers (HSTS, X-Frame-Options, etc.)
├── lib/
│   ├── api-response.ts   # Standardized response helpers
│   ├── errors.ts         # Custom error classes
│   ├── logger.ts         # Structured logging + Axiom APM
│   ├── push.ts           # FCM / APNs / Expo push sending
│   └── validators.ts     # Shared Zod schemas
└── types/
    └── index.ts          # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (included as dev dependency)
- A [NeonDB](https://console.neon.tech) database

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` with your actual values. See `.env.example` for a full reference of all variables (required and optional).

### 3. Generate & Apply Database Migrations

```bash
# Generate migration files from your schema
npm run db:generate

# Development: push schema directly (quick, no migration history)
npm run db:push

# Production: apply migrations (versioned, reproducible)
# Run with production DATABASE_URL before deploy:
DATABASE_URL="postgresql://..." npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:8787`.

### 5. Test the API

```bash
# Health check
curl http://localhost:8787/health

# Readiness (includes DB probe)
curl http://localhost:8787/health/ready

# Sign up
curl -X POST http://localhost:8787/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Sign in
curl -X POST http://localhost:8787/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Register device for push (requires Bearer token from sign-in)
curl -X POST http://localhost:8787/api/v1/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <session-token>" \
  -d '{"platform":"ios","pushToken":"<apns-or-fcm-token>"}'
```

## Deployment

### 1. Set Production Secrets (One-time)

Secrets are **sensitive** and should never be stored in `wrangler.jsonc`. Set them directly on Cloudflare:

```bash
wrangler secret put DATABASE_URL
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put BETTER_AUTH_URL
```

Optional (for Apple Sign-In):

```bash
wrangler secret put APPLE_CLIENT_ID
wrangler secret put APPLE_CLIENT_SECRET
```

### 2. Configure Environment Variables (Optional)

Non-sensitive variables (like `API_VERSION`) can be managed in `wrangler.jsonc` under the `"vars"` key.

### 3. Run Migrations (Production)

**Before deploying**, run migrations against your production database:

```bash
DATABASE_URL="postgresql://user:pass@prod-host/db?sslmode=require" npm run db:migrate
```

In CI/CD, set `DATABASE_URL` from secrets and run this step before `npm run deploy`.

### 4. Deploy

```bash
npm run deploy
```

## Production Configuration

### Apple Sign-In (iOS)
Set `APPLE_CLIENT_ID` and `APPLE_CLIENT_SECRET` in `.dev.vars` (local) or as Wrangler secrets (production) to enable Sign in with Apple. Required for iOS App Store if you offer social login.

### CORS
- **Development:** Allows common dev origins (localhost, Expo, etc.). With no `ALLOWED_ORIGINS`, permits all.
- **Production:** Set `ALLOWED_ORIGINS` (comma-separated) in Wrangler vars to restrict origins. Example: `https://your-app.com,myapp://`

### Trusted Origins (Better Auth)
The auth config includes `exp://`, `capacitor://localhost`, and `myapp://` for Expo and native apps. Replace `myapp://` with your app's URL scheme in `src/auth/index.ts`.

### Push Notifications (FCM / APNs / Expo)
Set these env vars to enable push sending:

| Var | Platform | Description |
|-----|----------|-------------|
| `FCM_PROJECT_ID` | Android | Firebase project ID |
| `FCM_CLIENT_EMAIL` | Android | Service account email |
| `FCM_PRIVATE_KEY` | Android | Service account private key (PEM) |
| `APNS_KEY_ID` | iOS | Apple .p8 key ID |
| `APNS_TEAM_ID` | iOS | Apple Team ID |
| `APNS_BUNDLE_ID` | iOS | App bundle ID |
| `APNS_PRIVATE_KEY` | iOS | .p8 key content (PEM) |
| `APNS_PRODUCTION` | iOS | `true` for prod, `false` for sandbox |

**Expo** tokens (`ExponentPushToken[...]`) work without extra config. Call `sendPushToUser(env, userId, { title, body, data })` from your code, or use `POST /api/v1/notifications/send` to test.

### Production Checklist (Analytics Dashboard)

Before going live with the analytics dashboard:

- [ ] `ALLOWED_ORIGINS` includes your analytics app URL (e.g. `https://analytics.your-domain.com`)
- [ ] `BETTER_AUTH_URL` points to your production API URL (e.g. `https://api.your-domain.com`)
- [ ] Run `npm run db:migrate` with production `DATABASE_URL` before deploy
- [ ] Set `NEXT_PUBLIC_API_URL` in the analytics app to your production API URL

### Logging / APM (Axiom)
Set `AXIOM_TOKEN` and `AXIOM_DATASET` to ship request logs to [Axiom](https://axiom.co) for querying and dashboards. Create a dataset and API token in Axiom, then add to Wrangler secrets.

## Environment Files

| File | Purpose |
|------|---------|
| `.env.example` | Reference of all env vars (required + optional). Not loaded by Wrangler. |
| `.dev.vars.example` | Template for local development. Copy to `.dev.vars` — Wrangler loads it automatically. |
| `.dev.vars` | Local secrets (gitignored). Never commit. |

## Security Best Practices

- **Never commit `.dev.vars`** to your repository. It contains your local secrets.
- **Use `wrangler secret put`** for any production credential (DB, API Keys).
- **Rotate your `BETTER_AUTH_SECRET`** if you suspect a compromise.

## Available Scripts

| Script           | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start local dev server (Wrangler)        |
| `npm run deploy` | Deploy to Cloudflare Workers             |
| `npm run typecheck` | Check TypeScript types                |
| `npm run db:generate` | Generate migration files from schema |
| `npm run db:migrate`  | Apply pending migrations             |
| `npm run db:push`     | Push schema directly (dev only)      |
| `npm run db:studio`   | Open Drizzle Studio (DB GUI)         |

## API Endpoints

### Public
- `GET  /`               — API info
- `GET  /health`         — Health check
- `GET  /health/ready`   — Readiness check

### Authentication (Better Auth)
- `POST /api/auth/sign-up/email`    — Register
- `POST /api/auth/sign-in/email`    — Sign in
- `POST /api/auth/sign-out`         — Sign out
- `GET  /api/auth/get-session`      — Get session

### Protected (Requires Authentication)
- `GET   /api/v1/users/me`      — Get current user profile
- `PATCH /api/v1/users/me`      — Update profile
- `POST   /api/v1/devices`         — Register device for push notifications
- `GET    /api/v1/devices`         — List user's registered devices
- `DELETE /api/v1/devices/:id`     — Unregister device
- `POST   /api/v1/notifications/send` — Send test push to current user

## Adding New Routes

1. Create a new route file in `src/routes/`:
```typescript
// src/routes/posts.routes.ts
import { Hono } from "hono";
import type { Env } from "../env";
import type { AuthVariables } from "../auth/middleware";
import { authMiddleware } from "../auth/middleware";

const posts = new Hono<{ Bindings: Env; Variables: AuthVariables }>();
posts.use("/*", authMiddleware);

posts.get("/", async (c) => {
  // Your logic here
});

export default posts;
```

2. Mount it in `src/routes/index.ts`:
```typescript
import postRoutes from "./posts.routes";
routes.route("/api/v1/posts", postRoutes);
```

## Adding New Database Tables

1. Add your table to `src/db/schema/app.ts` (or create a new schema file)
2. Export it from `src/db/schema/index.ts`
3. Run `npm run db:generate` to create a migration
4. **Development:** `npm run db:push` — **Production:** `npm run db:migrate` (with production `DATABASE_URL`)

## Sending Push Notifications from Code

Import and call `sendPushToUser` when you need to notify a user:

```ts
import { sendPushToUser } from "../lib/push";

// e.g. when creating a comment, notify the post author
await sendPushToUser(c.env, postAuthorId, {
  title: "New comment",
  body: `${user.name} commented on your post`,
  data: { type: "comment", postId: post.id },
});
```
