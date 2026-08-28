# 3D CosProps - Project Progress

## Global Status
- Current phase: Phase 2 (Informational Pages)
- Last update: 2026-08-28
- Scope decision: Phase 1 complete; Phase 2 in progress (Services page active)
- Phase 0 status: Completed
- Phase 1 status: Completed

## Progress Tracking Rules
- Mark each item with [x] only when fully completed.
- Keep blockers listed at the end of each phase.
- Do not move to the next phase until all critical items are completed.

## Phase 0 - Planning and Foundations
Goal: lock architecture, UX direction, quality gates, and delivery criteria before coding.

### Checklist
- [x] Review project brief and design system docs.
- [x] Confirm project structure and folder responsibilities.
- [x] Confirm app location inside uis/web.
- [x] Confirm i18n approach by route (es/en).
- [x] Define high-level roadmap by phases.
- [x] Confirm initial content strategy (mock/local data).
- [x] Define Definition of Done per phase.
- [x] Create architecture decision record document.

### Exit Criteria
- Architecture, i18n, and phase scope are approved.
- Quality criteria for accessibility, SEO, performance, and testing are documented.

### Blockers
- Final payment provider for centralized checkout is still pending (Phase 3).

### Decision Record (ADR-001)
- Date: 2026-08-26
- Status: Accepted (with scheduled re-evaluation)
- Owners: Product + Technical Direction

#### Context
The project needs to launch quickly with strong SEO discoverability, controlled operational complexity, and a path to future full e-commerce centralization. Historically, the business has used external storefront flow (Gumroad) and payment methods such as PayPal, Stripe, and card.

#### Decision
- Commerce strategy (near term): Hybrid model.
	- Main website as the primary brand and SEO surface.
	- External checkout/storefront can be used during early commerce rollout.
- Commerce strategy (target): Evaluate migration to fully centralized checkout in this website during/after Phase 3.
- Deployment platform: Vercel with owned domain.
	- Production traffic should use owned domain and SEO-ready indexing setup.

#### Rationale
- Hybrid provides fastest time-to-market while keeping future flexibility.
- Vercel minimizes infrastructure overhead and aligns well with Next.js App Router.
- Owned domain strengthens branding and search discoverability.

#### Consequences
- Short term:
	- Lower implementation risk and faster release.
	- Some checkout UX may temporarily happen outside the main web.
- Mid term:
	- Need a migration plan if/when centralized checkout is implemented.
	- Payment provider choice remains open until Phase 3 decision gate.

#### Re-evaluation Trigger
Revisit this ADR at the beginning of Phase 3, or earlier if either condition is met:
- Conversion loss attributed to external checkout flow.
- Operational or fee constraints from external storefront become significant.

#### Open Items
- Select centralized payment provider stack for Phase 3+: Stripe, PayPal, card acquiring strategy, or combination.
- Define compliance and fiscal requirements for centralized checkout rollout.

### Definition of Done (Per Phase)

#### DoD - Phase 0 (Planning and Foundations)
- Scope, architecture, i18n strategy, and roadmap are documented and approved.
- ADR-001 is created and accepted.
- Quality baselines (accessibility, SEO, performance, testing) are defined in planning docs.
- Remaining unknowns are tracked explicitly as open items with a re-evaluation trigger.

#### DoD - Phase 1 (Home Experience - MVP UI)
- Next.js + TypeScript + Tailwind app is running in uis/web.
- Home page is implemented in both locales (/es and /en) with responsive behavior.
- Core layout and brand system are applied (navigation, footer, tokens, CTA styles).
- Accessibility baseline passes manual checks (keyboard navigation, focus visibility, semantics, contrast).
- SEO baseline is implemented (metadata, open graph, robots, sitemap, canonical per locale).
- Performance baseline is met on Home (optimized images, lazy loading where relevant, no critical layout shifts).
- Testing baseline exists and passes (unit + smoke E2E for Home and locale switch).

#### DoD - Phase 2 (Informational Pages)
- Services, Projects, and Privacy Policy pages are published in both locales.
- Projects filtering UX works with local typed data.
- Shared components/tokens are reused without duplicating design logic.
- Core user journeys for Services/Projects/Privacy Policy are covered by tests.
- User Profile information architecture is defined (sections, navigation entry, and role-aware backend link behavior).

#### DoD - Phase 3 (Commissions and Shop Foundations)
- Commissions multi-step UI is complete and validated at UI level.
- Contracts for future commissions API are typed and documented.
- Shop catalog UI and domain models (product, cart, order draft) are implemented.
- User Profile UI is implemented with editable personal data and placeholders for payment method management.
- User Profile shows order and commission tracking views with domain-aligned status models.
- Payment-provider decision is made and documented (update ADR or create a new ADR).
- Migration path from hybrid checkout to centralized checkout is documented.

#### DoD - Phase 4 (Full Commerce and Services Integration)
- Commissions submission flow is connected to backend endpoints with validation and error handling.
- Checkout flow is fully integrated with the selected payment provider(s).
- Order lifecycle states are implemented and traceable.
- User Profile is connected to backend endpoints for profile updates, password updates, payment method management, and status tracking.
- Integration tests validate purchase-critical scenarios and failure handling.
- Security and compliance minimums for payments/data handling are documented and enforced.

#### DoD - Phase 5 (Backend Setup and Admin Operations)
- Backend foundation is deployed and connected to the web app.
- Admin metrics dashboard baseline is available for future KPI iteration.
- User management panel supports filtering, user detail inspection, and user removal flows.
- Commissions management panel supports request intake, status tracking, and operational notes.
- Online shop operations panel supports sales visibility, shipping management, and order status updates.
- Product database CRUD is implemented and connected to store catalog rendering.
- Portfolio database CRUD is implemented and connected to Projects page rendering.
- Role/permission model is defined for admin access and sensitive actions.
- Backend access link from User Profile is visible only for admin/manager and enforced server-side by RBAC.

#### DoD - Phase 6 (Launch Readiness)
- Full QA sign-off is completed (functional, accessibility, SEO, performance).
- Production deployment pipeline is stable and reproducible.
- Project documentation is updated (README, setup, scripts, structure, runbook).
- Launch checklist and rollback/incident procedure are documented.
- Post-launch monitoring and maintenance responsibilities are defined.

---

## Phase 1 - Home Experience (MVP UI)
Goal: deliver a polished bilingual Home page aligned with brief + design + references.

### Checklist
- [x] Bootstrap Next.js app in uis/web with TypeScript and Tailwind.
- [x] Configure app structure (routes, layout, components, styles).
- [x] Implement bilingual routing skeleton (/es, /en).
- [x] Define design tokens in code (colors, typography, spacing, radius, layers).
- [x] Build Home sections (hero, capabilities, highlights, CTA).
- [x] Implement gallery image carousel (auto-play, manual arrows, dots, keyboard nav, accessible).
  - _Component: `src/ui/carousel-section.tsx`. Uses `CarouselSlide[]` type with placeholder gradients._
- [x] Implement persistent navigation and footer.
- [x] Add core motion (reveal/stagger/hover) with reduced-motion support.
- [x] Add responsive behavior for desktop and mobile.

### Quality Checklist (Phase 1)
- [x] Accessibility baseline (keyboard nav, focus states, semantics, contrast).
  - _Resolved: Added global `*:focus-visible` styles (2px gold outline + 3px offset + 4px radius). Added `aria-label` to footer nav and social sections. Fixed Spanish accent typos: "Impresion"→"Impresión", "Produccion"→"Producción", "captacion"→"captación", "estan"→"están", "ruta de produccion"→"ruta de producción"._
- [x] SEO baseline (metadata, open graph, robots, sitemap, canonical per locale).
- [x] Performance baseline (image strategy, lazy loading, LCP/CLS controls).
  - _Resolved: Migrated Hero `<img>` to `next/image` with `fill`, `priority`, `sizes="100vw"`. Configured `deviceSizes` in next.config.ts. Deduplicated background scales image — removed `/background-scales.png`, both layout and Hero now reference `/media/Background-Scales.png` via symlink to root `/media`._
- [x] Testing baseline (unit + smoke E2E for Home and locale switch).
  - _Resolved: 33 unit tests across 7 files (i18n, robots, sitemap, site-footer, content, home-page-content, services-page-content). 11 Playwright E2E tests covering Home (EN/ES, locale switch, mobile menu, robots/sitemap) and Services (EN/ES, nav links, locale persistence, header/footer). All tests passing._

### Exit Criteria
- Home is visually aligned and responsive.
- Quality baseline checks pass.

### Gallery Carousel — Image Replacement Guide
When real images are ready, replace placeholders in `app/content.ts` → each slide's `slides[]` array (both `en` and `es` dictionaries).

**Per slide, add `src` pointing to the image asset (e.g. `/media/gallery/filename.webp`):**
```typescript
{
  id: "props",
  src: "/media/gallery/prop-helmet.webp",  // <-- add this line
  alt: "High-fidelity prop replicas showcase",
  label: "Props",
  placeholderGradient: "linear-gradient(135deg, …)",   // ignored when src is present
}
```

**Steps:**
1. Place real images in the root `/media/gallery/` directory (symlinked to `uis/web/public/media/`).
2. Add `src` field to each slide in both EN and ES entries.
3. Update `alt` text to describe the actual image content.
4. Run `npx next build` to verify no errors.
5. Optionally remove `placeholderGradient` fields once all slides have `src`.

**Image guidelines:**
- Use WebP format for production (lighter, faster).
- Aspect ratio 16:9 (mobile) / 21:9 (desktop). The carousel clips to fill.
- Optimize with `next/image` (already configured — no extra work).
- Max 5 slides shown; add more by pushing objects into the `slides[]` array.

---

## Phase 2 - Informational Pages
Goal: add Services, Projects, and Privacy Policy pages using reusable UI system and local typed data.

### Checklist
- [x] Implement Services page.
  - _Component: `app/components/services-page-content.tsx`. Uses `PageIntro` hero, 6 service cards with icons (Cube, Printer, Brush, Sword, Helmet, Message), feature lists, and final CTA section._
  - _Route: `app/[locale]/services/page.tsx`. Bilingual SSG at `/en/services` and `/es/services`._
  - _Nav: Updated SiteHeader to handle both route-based (/services) and hash-based (#projects) links with locale prefix._
  - _Icons: Added 6 new service icons in `src/icons/index.tsx`._
  - _Content: Added full bilingual dictionary in `app/content.ts` with `getServicesDictionary()` export._
  - _Tests: 8 unit tests covering hero, service cards, features, and CTA. 5 E2E tests covering EN/ES load, nav links, locale persistence, header/footer._
  - _All 33 unit tests and 11 E2E tests passing._
  - [x] Replace service icons with redesigned set.
  - [x] Change the page text for fidelity of the brand, clarity and brand tone.
  - [x] Add gold-highlighted words in Service card titles (Blueprints, Design, Print, Finish, Piece) and CTA (legend).
  - [x] Add gold-highlighted words in Service card titles for Spanish (Planos, Diseñamos, Imprimimos, Acabado, Pieza) and CTA (leyenda).
  - [x] Add gold-highlighted words in Home services overview title (project, start / proyecto, empezar).
  - [x] Refactor splitGoldTag utility to accept optional className parameter, apply pr-2 only to HeroTitle (avoids extra spacing in card titles).
  - [x] Update Commissions card text in English: "Do you have a specific project in mind? Let us build it from scratch to your exact specifications."
  - [x] Update Services card text in Spanish: "diseñados para crear tus proyectos al más mínimo detalle."
  - [x] Update Commissions card text in Spanish: replace "atrezo" → "proyecto".
  - [ ] Audit SEO metadata, aria-labels, Schema.org markup (e.g. `Service` type), and accessibility for the Services page.
  - [ ] Check if there are new types to create and reuse in future views.
- [ ] Implement Projects page with filtering UX.
- [ ] Implement Privacy Policy page in both locales (/en/privacy-policy and /es/politica-privacidad).
- [ ] Reuse shared components and style tokens.
- [ ] Add bilingual content for new pages.
- [ ] Extend tests for main user flows.
- [ ] Define User Profile IA (personal data, payment method, order status, commission status).
- [ ] Define role-based visibility rule for backend link (admin/manager only).

### Exit Criteria
- Services and Projects are production-ready in both locales.

---

## Phase 3 - Commissions and Shop Foundations
Goal: enable commissions UI and prepare commerce domain safely.

### Checklist
- [ ] Build Commissions multi-step UI form (no real submission yet).
- [ ] Define typed contracts for future commissions API.
- [ ] Build Shop catalog UI and domain models.
- [ ] Define cart/order domain boundaries for future payment integration.
- [ ] Build User Profile UI sections for editable personal data.
- [ ] Build User Profile UI sections for payment method management (provider-agnostic placeholders).
- [ ] Build User Profile order status and commission status tracking UI.
- [ ] Add backend access link in User Profile UI and hide for non-admin/manager roles.
- [ ] Decide payment gateway (Stripe/PayPal/other).

### Exit Criteria
- Commissions UI is complete.
- Shop domain is ready for payment implementation.

---

## Phase 4 - Full Commerce and Services Integration
Goal: implement real backend integration and payment flow.

### Checklist
- [ ] Implement backend/API endpoints under services.
- [ ] Connect commissions form to API.
- [ ] Implement checkout with selected payment gateway.
- [ ] Add order lifecycle handling and validation.
- [ ] Add integration tests for commerce flows.
- [ ] Connect User Profile personal data updates to backend.
- [ ] Connect User Profile password update flow to backend with secure validation.
- [ ] Connect User Profile payment method management to payment provider tokens/references.
- [ ] Connect User Profile order and commission status feeds to backend endpoints.
- [ ] Enforce backend link access by role on both frontend guards and backend authorization.

### Exit Criteria
- End-to-end purchase flow works reliably.
- Error handling and observability are in place.

---

## Phase 5 - Backend Setup and Admin Operations
Goal: configure backend capabilities and admin operations required to run users, commissions, store, products, and portfolio.

### Checklist
- [x] Define backend integration blueprint and shared API contracts for all views (pre-implementation).
- [ ] Configure backend project foundation and integration boundaries.
- [ ] Implement admin metrics dashboard baseline (KPIs to be finalized later).
- [ ] Implement users control panel (filter, view details, delete/disable).
- [ ] Implement commissions control panel (intake, detail view, status tracking).
- [ ] Implement online shop control panel (sales view, shipping management, order status).
- [ ] Implement products database CRUD (create/read/update/delete).
- [ ] Connect products database to store listing and updates.
- [ ] Implement portfolio database CRUD for Projects content.
- [ ] Connect portfolio database to Projects page rendering.
- [ ] Define admin auth and permissions model.

### Exit Criteria
- Admin panels and database operations are functional end-to-end.
- Store and Projects content can be maintained from backend tools.
- Commission requests can be tracked operationally.

### Notes
- Scope may be modified in future when this phase starts, based on business and operational requirements.
- Prepared artifacts:
	- docs/BACKEND_INTEGRATION_BLUEPRINT.md
	- docs/API_RBAC_MATRIX.md
	- services/contracts/endpoints.md
	- src/models/api/contracts.ts

### User Profile Planning Rationale (Cross-Phase)
- Phase 2:
	- Why here: this phase defines structure and navigation patterns, so the User Profile IA and role-visibility rules must be fixed early to prevent UX rework.
- Phase 3:
	- Why here: this phase already establishes commissions/shop domains; adding profile UI at the same time ensures status displays and account sections use consistent domain models.
- Phase 4:
	- Why here: this is the integration phase where profile edits, password changes, payment methods, and tracking views become real through API connections.
- Phase 5:
	- Why here: backend operations and RBAC mature here, so privileged backend access from profile must be fully enforced and auditable.

---

## Phase 6 - Launch Readiness
Goal: prepare release, documentation, and post-launch operations.

### Checklist
- [ ] Final QA pass (functional, accessibility, performance, SEO).
- [ ] Production build and deployment pipeline verified.
- [ ] Update README with setup, scripts, structure, and run guide.
- [ ] Prepare release notes and launch checklist.
- [ ] Define post-launch maintenance tasks.

### Exit Criteria
- Project is documented, tested, and deployable.

