# 3D CosProps - Project Progress

## Global Status
- Current phase: Phase 2 complete ✅ → Phase 3 (Commissions and Shop Foundations)
- Last update: 2026-08-29 — Phase 3 started: payment gateway decided (Stripe + PayPal)
- Scope decision: Phase 1 complete; Phase 2 complete; Phase 3 in progress
- Phase 0 status: Completed
- Phase 1 status: Completed
- Phase 2 status: Completed

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
- ~~Final payment provider for centralized checkout is still pending (Phase 3).~~ ✅ **Resolved: Stripe + PayPal**

### Decision Record (ADR-001)
- Date: 2026-08-26
- Updated: 2026-08-29 — Payment provider decision made
- Status: Accepted (re-evaluated and confirmed)
- Owners: Product + Technical Direction

#### Context
The project needs to launch quickly with strong SEO discoverability, controlled operational complexity, and a path to future full e-commerce centralization. Historically, the business has used external storefront flow (Gumroad) and payment methods such as PayPal, Stripe, and card.

#### Decision
- Commerce strategy (near term): Hybrid model.
	- Main website as the primary brand and SEO surface.
	- External checkout/storefront can be used during early commerce rollout (e.g. Gumroad as separate sales channel, not integrated).
- Commerce strategy (target): Evaluate migration to fully centralized checkout in this website during/after Phase 3.
- **Payment providers**: Stripe (card payments) + PayPal (PayPal button), both integrated directly in the website.
	- Customer chooses preferred method at checkout.
	- Provider-agnostic adapter pattern for future flexibility.
- Deployment platform: Vercel with owned domain.
	- Production traffic should use owned domain and SEO-ready indexing setup.

#### Rationale
- Hybrid provides fastest time-to-market while keeping future flexibility.
- Vercel minimizes infrastructure overhead and aligns well with Next.js App Router.
- Owned domain strengthens branding and search discoverability.
- Stripe + PayPal covers the vast majority of online payment preferences (card + digital wallet).
- Provider-agnostic adapter allows adding/removing providers without checkout redesign.

#### Consequences
- Short term:
	- Lower implementation risk and faster release.
	- Some checkout UX may temporarily happen outside the main web (Gumroad as separate channel).
- Mid term:
	- Need a migration plan if/when centralized checkout fully replaces external channels.
	- Stripe + PayPal integration must be built using an adapter pattern for provider abstraction.

#### Re-evaluation Trigger
~~Revisit this ADR at the beginning of Phase 3, or earlier if either condition is met:~~ ✅ **Re-evaluated and closed at Phase 3 start (2026-08-29).**
- Conversion loss attributed to external checkout flow.
- Operational or fee constraints from external storefront become significant.

#### Open Items
- ~~Select centralized payment provider stack for Phase 3+: Stripe, PayPal, card acquiring strategy, or combination.~~ ✅ **Decided: Stripe + PayPal.**
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
- Services, Projects, and Legal pages (Privacy Policy, Cookie Policy, Legal Notice, Terms & Conditions) are published in both locales.
- Projects filtering UX works with local typed data.
- Shared components/tokens are reused without duplicating design logic.
- Core user journeys for Services, Projects, and Legal pages are covered by tests.
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

## Phase 2 - Informational Pages ✅
Goal: add Services, Projects, and Privacy Policy pages using reusable UI system and local typed data.

### Checklist
- [x] Implement Services page.
  - _Component: `app/components/services-page-content.tsx`. Uses `PageIntro` hero, 6 service cards with icons (Cube, Printer, Brush, Sword, Helmet, Message), feature lists, and final CTA section._
  - _Route: `app/[locale]/services/page.tsx`. Bilingual SSG at `/en/services` and `/es/services`._
  - _Nav: Updated SiteHeader to handle both route-based (/services) and hash-based (#projects) links with locale prefix._
  - _Icons: Added 6 new service icons in `src/icons/index.tsx`._
  - _Content: Added full bilingual dictionary in `app/content.ts` with `getServicesDictionary()` export._
  - _Tests: 8 unit tests covering hero, service cards, features, and CTA. 5 E2E tests covering EN/ES load, nav links, locale persistence, header/footer._
  - _All 35 unit tests and 11 E2E tests passing._
  - [x] Replace service icons with redesigned set.
  - [x] Change the page text for fidelity of the brand, clarity and brand tone.
  - [x] Add gold-highlighted words in Service card titles (Blueprints, Design, Print, Finish, Piece) and CTA (legend).
  - [x] Add gold-highlighted words in Service card titles for Spanish (Planos, Diseñamos, Imprimimos, Acabado, Pieza) and CTA (leyenda).
  - [x] Add gold-highlighted words in Home services overview title (project, start / proyecto, empezar).
  - [x] Refactor splitGoldTag utility to accept optional className parameter, apply pr-2 only to HeroTitle (avoids extra spacing in card titles).
  - [x] Update Commissions card text in English: "Do you have a specific project in mind? Let us build it from scratch to your exact specifications."
  - [x] Update Services card text in Spanish: "diseñados para crear tus proyectos al más mínimo detalle."
  - [x] Update Commissions card text in Spanish: replace "atrezo" → "proyecto".
  - [x] Add consultation card as #1 service with new messaging and "Complete Piece" gold-wrapped in both locales.
  - [x] Add subtitle labels to all 6 service cards (PLANNING, CONCEPT, 3D MODELING, 3D PRINTING, FINISHING, RESULT / PLANIFICACIÓN, CONCEPTO, MODELADO 3D, IMPRESIÓN 3D, ACABADO, RESULTADO).
  - [x] Audit SEO metadata, aria-labels, Schema.org markup (JSON-LD: Organization, WebSite, Service+OfferCatalog), and accessibility for both pages.
    - _Skip-to-content link added for keyboard users._
    - _`aria-hidden="true"` added to all decorative SVGs (icons, checkmarks, carousel arrows, CTA arrows)._
    - _Profile link: `role="button"` + `tabIndex={0}` added._
    - _FeatureCard: converted to Client Component with keyboard handler (Enter/Space)._
    - _Sitemap updated with `/en/services` and `/es/services` entries._
    - _Root layout: restored hardcoded `lang="en"`._
  - [x] Create `src/types/component.ts` with reusable component prop types and deduplicate from `content.ts`.
    - _Types moved: `PageIntroContent`, `SectionIntroProps`, `CtaButtonProps`, `FeatureCardContent`, `CarouselSectionProps`, `IconProps`._
    - _Components updated to import from `../types/component` instead of inline or from `content.ts`._
- [x] Implement Projects page with filtering UX.
    - _Component: `src/ui/project-card.tsx` — card with category badge (icon + label), gradient placeholder, magnifying glass zoom button on hover._
    - _Component: `src/ui/project-gallery-modal.tsx` — full-screen modal with navigation arrows, position indicator (e.g. 1/6), caption (category badge + title + description), close via ✕ button, backdrop click, or Escape key, keyboard arrow navigation._
    - _Component: `app/components/projects-page-content.tsx` — hero via PageIntro (compact), gallery title with gold highlight, filter buttons (All/Anime/Games) with aria-pressed, 3-column responsive grid, Load More CTA, "No more projects." message._
    - _Route: `app/[locale]/projects/page.tsx`. Bilingual SSG at `/en/projects` and `/es/projects`._
    - _Content: Full bilingual dictionary in `app/content.ts` with `getProjectsDictionary()` export. 6 projects (Tanjiro's Sword, Mandalorian Helmet, Master Sword, Nezuko's Muzzle, Doom Slayer Armor, Levi's Spear)._
    - _Icons: Added `MagnifyingGlassIcon` in `src/icons/index.tsx`._
    - _Tests: 21 unit tests (7 new for modal: open, close via button, close via backdrop, next/prev navigation, position indicator, category badge + description in caption). All 56 tests passing._
    - _Fix applied: CTA in PageIntro changed from `#projects` to `/projects`._
  - [x] Add magnifying glass zoom button in card hover (circular, same style as Services feature-card icons, with CTA hover effect — bg white, text dark, gold glow).
  - [x] Add modal gallery with navigation, caption, and keyboard/backdrop dismiss.
  - [x] Audit SEO metadata, aria-labels, Schema.org markup, and accessibility for Projects page.
    - _Metadata: title, description, keywords, openGraph (title, description, url, siteName, locale, type), robots (index, follow), alternates with canonical and hreflang._
    - _JSON-LD: `CollectionPage` with `@id`, `provider` (Organization), `mainEntity` array of `CreativeWork` (name, description, keywords, image) per project._
    - _ProjectCard: `itemScope itemType="https://schema.org/CreativeWork"`, `itemProp` on name/description/image/keywords. Bilingual `aria-label` on zoom button and image. `role="img"` on gradient placeholder._
    - _ProjectsPageContent: `aria-labelledby="gallery-title"` on gallery section, `role="group"` on filter buttons with `aria-pressed`, `role="status" aria-live="polite"` on load-more area._
    - _ProjectGalleryModal: `aria-describedby="modal-caption-text"`, `aria-live="polite"` on position indicator, bilingual `aria-label` on nav arrows and close button, `aria-hidden="true"` on decorative SVG icons._
    - _SiteHeader: `aria-current="page"` on active nav link, `aria-label` on logo and mobile nav menu (bilingual)._
- [x] Create Legal pages (mockup versions) with dedicated route per document:
  - [x] Privacy Policy — `/en/privacy-policy`, `/es/privacy-policy`
  - [x] Cookie Policy — `/en/cookie-policy`, `/es/cookie-policy`
  - [x] Legal Notice — `/en/legal-notice`, `/es/legal-notice`
  - [x] Terms & Conditions — `/en/terms-conditions`, `/es/terms-conditions`
  - _Component: `src/ui/legal-page.tsx` — shared renderer for all legal documents._
  - _Content: `app/content/legal-content.ts` — separate file with full mockup content for ES; EN as translation-pending placeholder._
  - _Footer: Added "Legal" section in nav column with links to all 4 pages._
  - _Tests: 58 unit tests passing (new tests for legal links in footer, updated content test keys)._
  - _Sitemap: Added 10 new entries (/en/projects, /es/projects, 4 legal pages × 2 locales) — now 14 total entries._
  - _E2E: Created `e2e/projects.spec.ts` (7 tests: EN/ES load, filtering, load-more, modal open/close/nav, nav from home, locale persistence, header/footer) and `e2e/legal.spec.ts` (14 tests: 4× EN/ES load, nav via footer links, inter-legal nav, header/footer)._
  - _Unit: Created `app/__tests__/legal-page.test.tsx` (10 tests: title, disclaimer, dates, sections, body, table rendering, separators, main element, empty disclaimer)._
  - _All 77 unit tests passing._
- [x] Reuse shared components and style tokens (LegalPage shared renderer; tokens from design system).
- [x] Extend tests for main user flows (E2E: 9 projects tests, 12 legal page tests; Unit: 10 LegalPage tests).
  - _Final test counts: 77 unit tests (9 files), 32 E2E tests (4 spec files) — all passing._


### Exit Criteria — ✅ COMPLETED
- Services and Projects are production-ready in both locales.
  - _Projects: 56 unit tests passing. SEO metadata + JSON-LD + Schema.org microdata applied. aria-labels, aria-current, aria-pressed, aria-live, keyboard navigation (Escape, arrows) all in place. Skip-to-content link covers all pages._
- Legal pages mockup versions created (Privacy Policy, Cookie Policy, Legal Notice, Terms & Conditions) in both locales with shared LegalPage component and disclaimer banner for draft status.
  - Full test coverage: 10 unit tests (LegalPage component), 14 E2E tests (legal pages).
  - Sitemap includes all legal routes and bilingual `/projects` entries (14 sitemap entries total).
- 77 unit tests passing (9 test files), 32 E2E tests passing (4 spec files).
- User Profile IA and role-based visibility rule moved to Phase 3 planning.

---

## Phase 3 - Commissions and Shop Foundations
Goal: enable commissions UI and prepare commerce domain safely.

### Progress (Phase 3)
- [x] **Decide payment gateway (Stripe + PayPal)** — Decision made. ADR-001 updated.
- [x] **Define User Profile IA** — Sections defined and documented below.
- [x] **Define cart/order boundaries** — Documented below.
- [x] **Define commission lifecycle** — States updated in contracts.ts, flow documented below.
- [ ] Define rule-based visibility rule for backend link (admin/manager only).
- [ ] Build Commissions multi-step UI form (no real submission yet).
- [x] **Define typed contracts for future commissions API** — Commission, Product, Cart, CartItem, Order, OrderItem added to contracts.ts.
- [ ] Build Shop catalog UI and domain models.
- [ ] Build User Profile UI sections for editable personal data.
- [ ] Build User Profile UI sections for payment method management (provider-agnostic placeholders).
- [ ] Build User Profile order status and commission status tracking UI.
- [ ] Add backend access link in User Profile UI and hide for non-admin/manager roles.

### User Profile IA (defined 2026-08-29)

#### User Profile Sections

1. **My Data**
   - Name, email, phone
   - Shipping and billing address
   - Informational note: *"Notifications will be sent to this email"*
   - "Save changes" button → for personal data (name, phone, address)
   - "Change password" button → opens separate form (current password + new + confirm)
   - 🔒 Sensitive changes (email, address, payment method) require **current password confirmation**

2. **My Orders**
   - Purchase history with visible status
   - Statuses: draft → pending_payment → paid → processing → ready_to_ship → shipped → delivered | cancelled | refunded

3. **My Commissions**
   - Custom work tracking
   - Statuses: submitted → in_review → quoted → paid → standby → in_production → completed → ready_to_ship → shipped
   - ⛔ **Once paid, it CANNOT be cancelled.** Payment implies acceptance of terms and commitment to the work.
   - `cancelled` is only possible from pre-payment states (submitted, in_review, quoted).

4. **My Payment Methods**
   - Saved cards / linked PayPal (provider-tokenized, no raw data)
   - 🔒 Requires password confirmation to add/remove

5. **Control Panel**
   - Link to backend/admin (visible to admin/manager only)
   - Hidden for support, customer, and anonymous users

6. **Delete Account**
   - With confirmation and password validation

7. **Log Out**
   - Button to log out

#### Security Notes
- Changes to email, shipping/billing address, and payment methods require current password confirmation.
- No raw card data is stored (only provider-tokenized references).
- Account deletion requires double confirmation + password.

### Cart/Order Boundaries (defined 2026-08-29)

#### Storage
- **Current phase**: Cart saved in local storage (user's browser).
- **Future**: Migrate to server-side storage when backend is operational.

#### Cart → Order Flow

1. User adds products to cart (saved locally).
2. User pays.
3. Cart is automatically cleared.
4. Order(s) are created with initial status `pending_payment` → `paid`.

#### Cart with Multiple Product Types

The cart can contain **3 separate internal lists**, each visible with its own explanatory note:

| List | Type | Note to user | Delivery |
|-------|------|-------------|---------|
| 📦 **Physical Products** | Figures, 3D prints | "Estimated shipping: 7-15 business days" | Shipping tracking |
| 💻 **Digital Products** | STLs, downloadable models | "Immediate download after payment" | Download link |
| 🎨 **Commissions** | Custom work | "Timeline will be agreed upon budget acceptance" | Production tracking |

Each list generates an **independent order** upon payment, so the user can track each one separately in their profile.

#### Commissions: special payment flow

Commissions are **not purchased directly** like catalog products. They follow this flow:

```
Client submits request ──▶ You review and quote ──▶ Client accepts
                                                                    │
                                                                    ▼
                          ┌──────────────────────────────────────────┘
                          ▼
              Client sees in "My Commissions"
              the accepted quote with a
              "Pay now" button and X-day deadline
                          │
                          ▼
              ┌──────────────────────┐
              │  ✅ Pays             │
              │  → Stand by (queue)  │
              │  → In production     │
              │  → Completed         │
              │  → Ready to ship     │
              │  → Shipped           │
              └──────────────────────┘
              ┌──────────────────────┐
              │  ❌ Doesn't pay in X │
              │  → Cancelled         │
              └──────────────────────┘
```

#### Business rule: no cancellation after payment
- Once a commission is `paid`, **it cannot be cancelled** (payment implies acceptance of terms).
- `cancelled` is only possible from: `submitted`, `in_review`, `quoted`.

#### Commission Lifecycle (defined 2026-08-29)

```
submitted ──▶ in_review ──▶ quoted ──▶ paid ──▶ standby ──▶ in_production ──▶ completed ──▶ ready_to_ship ──▶ shipped
                                                                                                            │
                                                                                                            ▼
                                                                                                        done

cancelled (only from submitted / in_review / quoted — before payment)
```

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
- [ ] **Replace mockup legal content with final versions** (once provided by legal team):
  - [ ] Complete all `[ ]` fields (name, NIF, address, email, etc.) in each document.
  - [ ] Translate content to English (currently ES-only mockup content).
  - [ ] Review sections with brackets (e.g. `[SI 3DCOSPROPS VENDE...]`) and decide whether to keep/remove/modify.
  - [ ] Update `lastUpdated` dates.
  - [ ] Remove the mockup disclaimer banner from `legal-page.tsx`.
- [ ] Final QA pass (functional, accessibility, performance, SEO).
- [ ] Production build and deployment pipeline verified.
- [ ] Update README with setup, scripts, structure, and run guide.
- [ ] Prepare release notes and launch checklist.
- [ ] Define post-launch maintenance tasks.

### Exit Criteria
- Project is documented, tested, and deployable.

