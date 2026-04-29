# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**blink-invoice** is a Solana-based invoicing and payment link app built with Next.js 16 App Router, React 19, and TypeScript. There is no backend database — all auth is via Solana wallet connection (Phantom/Solflare on Devnet).

### Directory layout

```
src/
  app/
    layout.tsx          # Root layout — wraps everything in AppWalletProvider + ModalProvider
    page.tsx            # Public landing page
    dashboard/          # Authenticated dashboard (layout + pages)
    pay/[id]/           # Public dynamic payment link pages
  components/
    AppWalletProvider.tsx  # Solana wallet adapter setup (Devnet, auto-connect)
    landing/            # Hero, Navbar, Features, ExchangeInfo, Footer
    modals/             # creation-hub-modal and related
  context/
    modal-context.tsx   # Global modal open/close state via React Context
  lib/
    utils.ts            # cn() helper (clsx + tailwind-merge)
```

### Canonical form components — single source of truth

There are **two entry points** that lead to the same creation flows, but they must share the same form components:

| Entry point | Route navigated to |
|---|---|
| "Create new blink" (sidebar bottom) | `/dashboard/create-payment-link` and `/dashboard/create-invoice` |
| "Create new link" (payment-links page) | `/dashboard/payment-links/create` and `/dashboard/invoices/create` |

The canonical form components live here — **always import from these, never duplicate them**:

- `src/app/dashboard/create-payment-link/components/payment-link-form.tsx` → exports `PaymentLinkForm`
- `src/app/dashboard/create-invoice/components/invoice-form.tsx` → exports `InvoiceForm`

The `/payment-links/create/page.tsx` and `/invoices/create/page.tsx` pages are thin shells that import these canonical components. Any changes to the form (fields, validation, styling, defaults) must be made **only** in the canonical components — never in the page files.

**Placeholder vs default values**: Price/amount fields must use `defaultValues: { field: "" }` with an explicit `placeholder` attribute on the input. Never use a numeric string like `"0.00"` as a default value — it forces users to manually clear the field before typing.

### Key conventions

- **Path alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS 4 (`@tailwindcss/postcss`). Custom Solana theme colors are defined in `tailwind.config.ts`: primary `#9945FF`, secondary `#14F195`, background `#0F0F12`, surface `#1A1A1E`, muted `#94A3B8`.
- **Client components**: Mark with `"use client"` at the top. Layouts and page shells can be server components.
- **React Compiler**: Enabled in `next.config.ts` (`reactCompiler: true`) — avoid manual `useMemo`/`useCallback` unless profiling shows a need.
- **Network**: Hardcoded to Solana Devnet in `AppWalletProvider.tsx`. No `.env` files are in use.
- **Deployment**: Netlify via `netlify.toml`. The `@netlify/plugin-nextjs` plugin converts API routes and SSR pages to Netlify Functions automatically. No Vercel-specific configuration is used.
- **Actions API**: `src/app/api/actions/pay/route.ts` handles GET (Blink metadata) and POST (transaction builder) for Solana Actions. CORS headers are set in `next.config.ts`. The Solana Actions manifest is at `public/actions.json` and the Blink icon at `public/blink-icon.svg`.

### Solana Blinks flow

All link data is encoded in URL query params — there is no database. The key params are:

| Param | Source | Purpose |
|---|---|---|
| `name` | form input | Item/merchant name shown on Blink card |
| `sol` | form input | Amount in SOL |
| `desc` | form input | Description shown on Blink card |
| `img` | file upload (base64) | Thumbnail for the local `/pay/[id]` checkout page only |
| `to` | connected wallet (payment link) or `walletAddress` field (invoice) | Settlement destination — merchant receives this |

**Blink URL format** (shareable on X):
```
https://dial.to/?action=solana-action:{origin}/api/actions/pay?name=X&sol=0.5&desc=Y&to=WALLET
```
The `img` param is intentionally excluded from the Blink URL (base64 is too large); the API route uses `public/blink-icon.svg` as the icon instead.

**Local checkout URL** (works in any browser):
```
{origin}/pay/blink?name=X&sol=0.5&desc=Y&img=BASE64&to=WALLET
```

The `/pay/[id]/page.tsx` checkout page reads `to` from URL params to build the SOL transfer transaction. Never use a hardcoded wallet address there.
