# Code Arena Monorepo

This repository hosts the MVP implementation of **Code Arena: The Proving Grounds for Thai Developers**. The monorepo is managed with `pnpm` + Turborepo and ships a Next.js mini-app alongside a NestJS API with Prisma, WebSocket match coordination, and shared UI/typed packages.

## Project layout

```
apps/
  api/        # NestJS REST + WebSocket API, Prisma ORM
  web/        # Next.js 14 front-end app
packages/
  config/     # Shared ESLint, Tailwind, and TSConfig presets
  types/      # Shared Zod/TypeScript domain contracts
  ui/         # Shared Tailwind-ready component library
```

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Boot supporting services:

   ```bash
   docker compose up -d
   ```

3. Apply database schema and seed default problems:

   ```bash
   pnpm --filter api prisma:generate
   pnpm --filter api prisma db push
   pnpm --filter api ts-node prisma/seed.ts
   ```

4. Run everything locally:

   ```bash
   pnpm dev
   ```

   - API defaults to `http://localhost:3333`
   - Web app defaults to `http://localhost:3000`

## Environment variables

Copy `.env.example` to `.env` at the repository root, then adjust secrets as needed.

| Variable | Description |
| --- | --- |
| `NODE_ENV` | Runtime environment flag |
| `WEB_ORIGIN` | Comma-separated list of allowed front-end origins |
| `PORT` | API listening port |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_EXPIRES_IN` | JWT lifetime (e.g., `7d`) |
| `WORLD_ID_VERIFY_URL` | World ID verification endpoint |

## Key commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start web + api in development mode |
| `pnpm build` | Build all workspaces |
| `pnpm lint` | Run linting across packages |
| `pnpm typecheck` | Run TypeScript checking |
| `pnpm --filter api prisma:migrate` | Create and apply Prisma migrations |

## Testing World ID locally

During MVP development you can enable World ID sandbox verification by leaving `WORLD_ID_VERIFY_URL` pointing to the official test endpoint. Stubbed responses are logged to the API for easier debugging.

## Deployment notes

- Front-end can deploy on Vercel using the `apps/web` project with `pnpm install`, `pnpm build`, `pnpm --filter web start`.
- API can run on Render/Fly with Node 20, `pnpm install`, `pnpm --filter api build`, `node dist/main.js`.
- Provision managed PostgreSQL (e.g., Supabase) and Redis (e.g., Upstash) for production matchmaking resilience.

## License

Proprietary – All rights reserved.
# Chrono
