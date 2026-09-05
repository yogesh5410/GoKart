# GoKart – Full Stack E-commerce Platform

A modern grocery e-commerce platform with role-based authentication and secure payment processing.

## Features

- **Role-Based Authentication**: Admin dashboard for product management (create, update, delete)
- **User Features**: Dynamic cart management and product search
- **Payment Integration**: Secure online payments via Stripe API with automated order confirmation
- **Performance**: Lazy loading for product components to optimize page load time

## Store assistant (chat)

A chat widget that answers shopper questions by turning plain English into a
MongoDB query, running it, and replying from the rows it gets back — no
embeddings, no vector store. Powered by Gemini 2.5 Flash.

```
shopper ──► POST /api/chat ──► Gemini (function calling)
                                  │  proposes { collection, filter, sort, limit }
                                  ▼
                          chat/guardrail.js          ◄── security boundary
                          allowlists collection, fields and operators,
                          forces userId on personal data, caps the limit
                                  ▼
                          chat/executeQuery.js  ──►  MongoDB (read-only)
                                  ▼
                          Gemini phrases the answer ──► reply + product cards
```

| File | Role |
|---|---|
| `server/config/gemini.js` | API key, model, retry/timeout handling |
| `server/chat/schema.js` | Schema card, store facts, few-shot examples, tool declaration |
| `server/chat/vocabulary.js` | Live category/sub-category names and ids (1h cache) |
| `server/chat/guardrail.js` | Validates every model-authored query before it runs |
| `server/chat/executeQuery.js` | Runs the validated plan, adds `_effectivePrice` |
| `server/controllers/chat.controller.js` | Orchestration, rate limiting, history |
| `client/src/components/ChatWidget.jsx` | Floating chat panel with product cards |

**What it will and won't do.** It answers questions about products, prices,
stock, categories, delivery, and the signed-in shopper's own orders, addresses
and cart. It declines everything else — code, general knowledge, other shops.

**Security.** The model never touches the database directly: it proposes a query
and `guardrail.js` decides whether to run it. `users` is unreachable, `$where`
and `$function` are rejected, `$regex` is downgraded to a literal substring
match, and queries against personal collections are pinned to the JWT's user id
regardless of what the model asked for.

**Configuration.** The assistant needs `GEMINI_API_KEY` in the environment —
`server/.env` locally, a project environment variable on Vercel. `GEMINI_MODEL`
optionally overrides the default (`gemini-2.5-flash`). Without a key the chat
route returns 503 and the rest of the store carries on as normal; the key is
never hardcoded, so nothing secret ever reaches git.

**Quota.** The bundled key is on Gemini's free tier: roughly 20 requests per
minute. Each shopper message costs two calls (one to build the query, one to
phrase the answer), so about 10 messages a minute across all visitors before
users start seeing "try again in a few seconds". Upgrade the key's billing plan
before any real traffic.

## Design

GoKart uses its own visual identity — **Ink & Saffron**: deep ink-navy chrome,
warm cream surfaces and a saffron accent, set in Sora (display) and Inter (body).

- Colours are CSS custom properties defined in `client/src/index.css`, exposed to
  Tailwind as semantic tokens (`bg-surface`, `text-fg-muted`, `border-line`,
  `bg-brand`) in `client/tailwind.config.js`.
- Reusable primitives (`.btn-primary`, `.card`, `.panel`, `.input`, `.chip`,
  `.modal`) live in the `@layer components` block of `index.css`.
- Dark mode is class-based (`darkMode: 'class'`). The toggle lives in the header,
  persists to `localStorage` under `gokart-theme`, defaults to the OS preference,
  and is applied before first paint by a small inline script in `index.html`.

To restyle the whole app, change the token values — not the components.

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS (custom token-driven theme, light + dark)

**Backend**
- Node.js
- Express.js
- MongoDB

**Payment**
- Stripe API

**Assistant**
- Gemini 2.5 Flash (natural language → MongoDB query)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
myProject/
├── client/          # React frontend
├── server/          # Express backend
└── README.md
```

---

*Built in 2025 
