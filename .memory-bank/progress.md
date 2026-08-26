# 3D CosProps - Project Progress

## Global Status
- Current phase: Phase 1 (Home Experience - MVP UI)
- Last update: 2026-08-26
- Scope decision: Phase 1 delivers Home only
- Phase 0 status: Completed

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
- Services and Projects pages are published in both locales.
- Projects filtering UX works with local typed data.
- Shared components/tokens are reused without duplicating design logic.
- Core user journeys for Services/Projects are covered by tests.
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
- [ ] Bootstrap Next.js app in uis/web with TypeScript and Tailwind.
- [ ] Configure app structure (routes, layout, components, styles).
- [ ] Implement bilingual routing skeleton (/es, /en).
- [ ] Define design tokens in code (colors, typography, spacing, radius, layers).
- [ ] Build Home sections (hero, capabilities, highlights, CTA).
- [ ] Implement persistent navigation and footer.
- [ ] Add core motion (reveal/stagger/hover) with reduced-motion support.
- [ ] Add responsive behavior for desktop and mobile.

### Quality Checklist (Phase 1)
- [ ] Accessibility baseline (keyboard nav, focus states, semantics, contrast).
- [ ] SEO baseline (metadata, open graph, robots, sitemap, canonical per locale).
- [ ] Performance baseline (image strategy, lazy loading, LCP/CLS controls).
- [ ] Testing baseline (unit + smoke E2E for Home and locale switch).

### Exit Criteria
- Home is visually aligned and responsive.
- Quality baseline checks pass.

---

## Phase 2 - Informational Pages
Goal: add Services and Projects using reusable UI system and local typed data.

### Checklist
- [ ] Implement Services page.
- [ ] Implement Projects page with filtering UX.
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

