# Mobile Template — Architecture Overview

## Components

| Component | Path | Purpose |
|-----------|------|---------|
| **Backend** | `backend/` | Shared API for mobile app, analytics dashboard, and web landing |
| **Mobile app** | `mobile/` | The product app developers ship to customers (e.g. todo app) |
| **Analytics** | `analytics/` | Developer dashboard for viewing mobile app usage metrics |
| **Web** | `web/` | Public landing page for the mobile app |

## User Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Customers  │     │  Developers │     │  Visitors   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Mobile App  │     │  Analytics  │     │    Web      │
│  (mobile/)  │     │ (analytics/)│     │   (web/)    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │     Backend     │
                  │   (backend/)    │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   Database      │
                  │   (NeonDB)      │
                  └─────────────────┘
```

## Responsibilities

### Backend (`backend/`)

- **Auth** — Better Auth for email/password and OAuth (Google, Apple)
- **Device registration** — Push tokens from the mobile app
- **Analytics API** — Users, devices, sessions, growth metrics
- **RBAC** — Roles (admin, developer, viewer) for analytics access
- **App scoping** — Filter analytics by app when multiple apps exist

### Mobile app (`mobile/`)

- End-user product (e.g. todo app)
- Users sign in and use app features
- Registers device for push notifications
- Calls backend API for data

### Analytics (`analytics/`)

- Developer dashboard
- Sign-in for developers (email/password or Google)
- View usage: total users, devices, sessions, growth charts
- Export CSV/XLSX
- App selector when multiple apps
- Role-aware UI (viewers redirected)

### Web (`web/`)

- Public landing page
- Marketing / app store presence
- Links to download or learn about the mobile app





The template is production-ready for an iOS indie. It covers auth, push, backend, analytics, landing page, CI/CD, crash reporting, and tests. Remaining work is project-specific: swapping placeholders, adding a privacy policy page, and configuring store links.
