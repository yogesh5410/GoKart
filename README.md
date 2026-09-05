# GoKart – Full Stack E-commerce Platform

A modern grocery e-commerce platform with role-based authentication and secure payment processing.

## Features

- **Role-Based Authentication**: Admin dashboard for product management (create, update, delete)
- **User Features**: Dynamic cart management and product search
- **Payment Integration**: Secure online payments via Stripe API with automated order confirmation
- **Performance**: Lazy loading for product components to optimize page load time

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
