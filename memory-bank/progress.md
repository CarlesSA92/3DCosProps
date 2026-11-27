# 3D CosProps - Project Progress

## Global Status
- Current phase: Phase 3 foundation/UI scope complete ✅; Phase 4 (Full Commerce and Services Integration) next
- Last update: 2026-11-27 — planned an early visual Backoffice prototype in Phase 4, with implementation and API integration delivered incrementally by workflow
- Scope decision: Phase 1 complete; Phase 2 complete for documented UI scope; Phase 3 foundation/UI scope complete; Phase 4 not started
- Phase 0 status: Completed
- Phase 1 status: Completed
- Phase 2 status: Completed
- Phase 3 status: Foundation/UI scope completed (not production commerce readiness)
- Phase 4 status: Not started
- Payment-provider status: Stripe (cards) + PayPal selected; real checkout integration, compliance, and backend flows remain Phase 4 work.
- Accessibility/SEO audit note: all implemented localized page families were inspected for landmarks, labels, keyboard semantics, metadata, and structured data. Automated verification: TypeScript passed; 109/109 unit tests passed; ESLint completed with five existing warnings and no errors; `git diff --check` passed. This is a code review, not a manual WCAG conformance or screen-reader sign-off.
- Audit follow-up: verify product-specific structured data and runtime accessibility (keyboard/focus/dialog behavior) during Phase 4 QA; the product detail currently relies on global Organization data rather than Product JSON-LD.
- Backoffice planning decision (2026-11-23; sequencing clarified 2026-11-27): create a visual-only Backoffice prototype during Phase 4 planning/early delivery, using mock data to expose UX and operational requirements. Then specify, implement, and connect each workflow incrementally. A visual prototype does not approve business rules, grant access, or authorize backend actions. Do not duplicate prototype/UI tasks in Phase 5; Phase 5 owns operational backend capabilities and production connections.

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

### Backoffice Planning (Pre-Phase 4; planning only)
Goal: agree on operational workflows and access boundaries before backend and commerce integration work. This planning does not change phase status or authorize backend coding.

#### Principles
- Treat the backoffice as a private, role-protected operational area; hiding UI controls is not authorization. Enforce permissions on the server/API.
- Use explicit, domain-specific states and permitted transitions. Record actor, timestamp, action, and relevant before/after values for sensitive changes.
- Separate internal operational notes from customer-visible messages. Require confirmation and safeguards for destructive, financial, or publication actions.
- Define dashboard metrics (calculation, time range, timezone, and treatment of cancellations/refunds) before presenting them.
- Prefer review/preview and controlled publishing for public-facing catalog and portfolio changes.

#### Initial roles and permission questions
- **Role model agreed in principle (2026-11-26):** the business currently has one operator, who will hold the **Admin** role. If more staff are added later, they will be **Managers**. Customers are **Users** when registered and **Anonymous** when not registered.
- **Admin:** unrestricted access to all site and backoffice pages and capabilities, including editing and support; includes all Manager and customer capabilities, plus administration/override capabilities.
- **Manager:** backoffice access; may manage commissions and orders and create/edit product drafts, including uploading product images. Publication requires Admin validation/approval. Exact authority for refunds, cancellations, archiving, user data, and other sensitive actions remains to be specified by workflow.
- **User (registered customer):** frontend access; may purchase products and submit/contact the shop regarding commissions; no backoffice access or site editing.
- **Anonymous:** frontend browsing and registration are allowed; purchasing and sending messages/submitting commission requests are not allowed until registered.
- **Permission proposal reviewed at high level (2026-11-26):** Admin/Manager proposal is accepted as a first draft, subject to a detailed review when those views/permissions are implemented. Admin is unrestricted; Manager operates within limited backoffice permissions and cannot publish public content without Admin approval. **Users and Anonymous must never access backoffice pages, routes, fields, or privileges.** Customer activities (contact, purchases, commissions, profile, order/download management) happen exclusively through frontend pages and customer-facing forms/profile, never through backoffice interfaces. Keep the detailed action matrix explicitly marked “review before implementation”; do not treat this draft as final authorization policy.

#### Workflow drafts to validate (not final state contracts)
- **Updated definitions and policies (2026-11-26):** an Order may contain multiple Projects. Each product or commission that needs creation follows project phases; when ready, it becomes an order item ready for dispatch. Products/commissions may be digital or physical. After verified payment, digital items are downloadable from the user's profile from server/cloud/database storage; digital returns are not allowed per business policy because access is immediate (legal validation required). Mixed orders enable downloads after payment verification while physical items follow production and shipping separately.
- **Cancellation/production calendar rule (2026-11-26):** payment/order day counts as working day one. Monday payment → cancellation Monday and Tuesday; production starts Wednesday. Friday payment → cancellation Friday and Monday; production starts Tuesday. Public holidays count like weekends/non-working days; use Spain timezone. Within the two-working-day period, refund payment minus provider fee; after it, no refund per business policy. For a post-window provider dispute, intended evidence includes production having started, customer acceptance/payment confirmation, and expiry of cancellation window. Validate legal wording/provider terms before implementation.
- **Shipping incidents and calendar proposal (2026-11-26):** all physical shipments use tracking. Photograph the product/order and package before dispatch. Incidents may occur at origin, transit, customs, destination, or delivery; for damage/non-delivery provide evidence to the carrier and submit a complaint/claim, with handling dependent on the specific case. Consider an internal Calendar for holidays, events, and orders; holidays should inform working-day scheduling. Dedicated Incidents manager and Calendar page are proposed; MVP scope remains undecided. Storage, resale, and legal terms remain deferred for external discussion.
- **Backoffice views agreed as project scope (2026-11-26), delivered incrementally one at a time:** 1) Dashboard (home); 2) Sales (list/details, newest first by default); 3) Portfolio & Media (home carousel, portfolio, product images); 4) Product Catalog (create/edit); 5) Commissions (intake, review, feasibility/costs, customer contact and quotes); 6) User Management (registered users, data editing, role assignment); 7) Asset Vault (archive/STL/PDF uploads and storage for product association); 8) Incidents; 9) Calendar (schedule, timing, events); 10) Statistics (detailed telemetry/charts); 11) Profile. Backoffice must be responsive and usable on PC, tablet, and mobile. Individual view designs, sequencing, permissions, security/privacy review and detailed behavior remain to be defined.
- **Backoffice access requirement (2026-11-26):** only authenticated Admins and Managers may access backoffice pages. Direct URL access by unauthenticated or unauthorized users must not render protected content and should redirect to login. Enforce authorization at server/API level as well as in UI/navigation.
- **Core commerce terms agreed at definition level (2026-11-26):** a **Product** is any item displayed in the online shop that can be purchased. An **Order** consists of one or more products placed for purchase. An **Encargo/Commission** is a custom request for a product not listed in the shop or an extra/customization to an existing product, submitted through the Commissions form. A **Project** is the set of phases involved in creating product(s). Each product or commission requiring creation goes through project phases; an Order may contain multiple Projects. Once creation is complete, the result becomes part of an Order ready for dispatch. Products and commissions may be digital or physical. Define digital delivery milestones and mixed-format order handling before finalizing contracts.
- **Payment, cancellation, delivery, and incident policies agreed at workflow level (2026-11-26):** do not hand over or deliver a product until payment is verified and received; once verified and received, proceed with delivery/shipping. A customer may cancel during the first **two working days, Monday–Friday, in Spain's timezone**, after payment; refund the payment less the payment-provider fee. After this window, refunds are not allowed under the agreed business policy. Every physical shipment must have a tracking number. If a failure occurs, wait for the customer's response/decision as applicable. Shipping incidents can arise at origin, in transit, customs, destination, or delivery; usual evidence practice is to photograph the product/order and package before dispatch, then provide evidence and submit a complaint/claim to the carrier for delivery damage or non-delivery. Exact case handling varies. A dedicated backoffice Incidents page is proposed, not yet approved for MVP. Storage, resale, and legal terms remain deferred for external discussion.
- **Remaining clarifications before implementation:** define working-day counting precisely (payment timestamp vs next local business day, cutoff time, public holidays, inclusive/exclusive deadline); define provider-specific payment verification/receipt and handling of later reversal, dispute, or chargeback; detail incident categories, evidence, ownership, customer/carrier communication, resolution/closure, and digital-delivery exceptions; decide whether Incidents is an MVP backoffice page or later addition. Do not encode financial/legal rules until externally validated.
- **Products:** Draft → In review → Published → Archived. Inventory/availability are separate operational fields, not publication states. Clarify review/publish authority, price-change safeguards, stock adjustments, and handling of products referenced by existing orders.
- **Portfolio projects:** Draft → In review → Published → Archived. Define required media/alt text/localized content, preview, approval, and what happens to public URLs when unpublishing.
- **Orders:** Received → Payment pending/paid (payment state tracked distinctly) → Confirmed → Preparing → Shipped/Ready for delivery → Delivered → Closed. Exceptions include cancellation, failed payment, return/refund, and partial fulfillment where applicable. Provider events are not ordinary manual status edits; define reconciliation and authorized refund flow.
- **Commissions (functional workflow agreed 2026-11-23; storage/resale and legal terms deferred):** Customer submits the website form → request appears in the backoffice for review → store determines feasibility. If not feasible, staff sends the customer an explanation and closes/declines the request. If feasible, staff prepares and presents a product quote (materials + production), excluding shipping because final weight is unknown; the customer is told shipping will be quoted separately. The product quote is valid for 14 calendar days. If no response/payment is received by expiry, it is treated as rejected and the request is closed. Acceptance is payment in full of the product quote in advance (not a deposit). Once paid, the order is final: no customer-requested cancellation or changes, as materials procurement and production proceed. Production duration depends on project size; no fixed ETA is promised. Staff shares progress photos during production to reassure the customer and show progress. When the product is ready, staff informs the customer and sends a second quote with shipping options/prices from different carriers so the customer can choose. If the customer does not contract shipping, this is treated as rejection of the finished product. Storage duration and any subsequent resale policy are explicitly deferred for later decision; do not implement or communicate an assumed storage period or resale action until that policy is agreed and legally reviewed.
  - **Draft states:** Received → Under review → (Not feasible → Declined/Closed) OR (Feasible → Product quote prepared → Product quote sent / Awaiting payment) → (14-day expiry without response/payment or customer rejection → Rejected/Closed) OR (Paid / Accepted → Materials procurement → In production ↔ Progress photos/updates → Product ready → Shipping options/quote sent → Awaiting carrier choice/payment) → (Carrier selected → Shipping paid/arranged → Shipped → Delivered/Closed) OR (Customer declines/no shipping contracted → Product rejected; storage/resale disposition pending policy decision).
  - Product payment and shipping payment are separate financial events. Track product quote/version, itemized materials/production costs, currency, sent/expiry timestamps, payment status/reference, and shipping quote/options/carrier selection/payment separately. Progress photos and customer messages are timeline events, not status transitions. Keep internal notes separate from customer-visible messages/media. Do not imply a fixed production deadline; duration depends on project scope.
  - **Deferred/open policy decisions:** storage duration and process after customer declines/does not arrange shipping; whether and under what conditions the product may be offered for resale; legal wording and any applicable consumer/refund exceptions for advance payment and the no-cancellation/no-changes rule. Also define whether a product quote may be revised before payment, shipping quote validity/price changes, handling failed/returned shipments, and photo consent/privacy, retention, and allowed file types. No deposit, post-payment cancellation/change path, fixed production ETA, or revision-round policy is assumed.

#### Dashboard and reporting decisions (2026-11-26)
- Dashboard KPI cards and definitions: Gross Sales = amount earned (exact gross/net and refund treatment still to be specified); Page Visits = number of people who have visited a website page (unique-person/session counting, consent, and analytics source still to be specified); Total Orders = order count (counting rules still to be specified); Downloads Completed = number of downloads of files sold on the website (download event/source and retry counting still to be specified); Total Sales = number of sales made (counting rules still to be specified).
- Dashboard chart: daily net amount received, split into 3D Models, Finished Products, and Commissions. Attribute transactions by payment date; monthly view is the initial time range, with an annual option for longer-term comparison. Include sales only once accepted and paid. Provider breakdown is not needed on the initial Dashboard.
- Dashboard operational lists: show orders currently in process for a quick status check and incoming commissions awaiting review. If either queue has no entries, show a clear empty-state message for that queue; do not hide the other queue or any in-process orders. Once a commission is approved and paid, move it into the orders list (and out of the incoming-review queue).
- Backoffice navigation: persistent left-side menu listing the different backoffice pages. Preserve the color palette and visual aesthetic established by the existing public website. Proposed page inventory (2026-11-26) is listed above; responsive behavior and MVP prioritization remain to be designed.
- Detailed reporting is intended for a separate Statistics page, to be designed later. Candidate reporting there includes payment-provider breakdown (Stripe/PayPal) and product-type tables; scope and metric definitions remain open.
- Cancellation window for made-to-order/product-manufacturing orders (updated 2026-11-26): customer may cancel during the first two working days (Monday–Friday, Spain timezone) after payment; refund payment less the payment-provider fee. After the two-working-day window, no refund is allowed under the agreed business policy. Exact deadline calculation, public-holiday handling, legal wording, and provider behavior must be validated before implementation. This supersedes the earlier calendar-day formulation; storage/resale policy remains deferred.

#### Cross-workflow requirements to plan
- Lists should support search, filters, sorting, pagination, clear status/owner, and useful empty/loading/error states.
- Detail views should show chronological activity, internal notes, assignment, customer-visible communication, and linked records.
- Define notification triggers and recipients for customers and staff separately; internal-only transitions should not accidentally notify customers.
- Define audit-log access/retention and data masking. Do not store card details in the backoffice.
- Dashboard MVP (updated 2026-11-26): KPI cards (Gross Sales = amount earned, Page Visits = people visiting website pages, Total Orders, Downloads Completed = sold files downloaded, Total Sales = number of sales); daily net-received sales chart split by 3D Models, Finished Products, and Commissions, with monthly and annual views and payment-date attribution; in-process orders list; incoming commissions awaiting review list with independent empty states. Define precise KPI sources/counting and refund/cancellation behavior before implementation. Richer provider reporting is deferred to a separate Statistics page. Backoffice uses a persistent left-side page menu and the existing site's visual identity; page inventory/responsive behavior remain to be decided.
- Before implementation, map transitions and permissions to API contracts, validation/error cases, concurrency behavior, and test scenarios. Keep unresolved payment/legal/tax/refund policies explicit.

#### Planning checklist (complete before backend implementation)
- [x] Confirm initial actors/roles and high-level access boundaries: Admin, Manager, registered User, and Anonymous (2026-11-26). Action-level permissions, scopes, and workflow-specific approval requirements remain to be mapped before implementation.
- [x] Validate commission intake, feasibility decision, 14-day product quote, advance payment, production updates, and separate shipping quote at workflow level.
- [ ] Validate remaining workflows and operational exceptions/recovery paths, including exact cancellation/payment/shipping rules and deferred commission storage/resale policy. Core entity terminology and initial policy proposals were captured 2026-11-26; outstanding clarifications are listed above.
- [ ] Decide customer-visible vs internal fields, notes, notifications, and templates.
- [ ] Define KPI data sources/counting (unique visits, download events/retries, order/sale counts, refund treatment), monthly/annual comparison behavior, and separate Statistics page scope.
- [ ] Define backoffice page inventory and responsive behavior for the left navigation.
- [ ] Specify audit events, sensitive-data boundaries, and retention expectations.
- [ ] Derive API/data contract requirements and acceptance tests from approved workflows (documentation only until implementation is authorized).

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
- [x] **Define rule-based visibility rule for backend link (admin/manager only).** — Rule documented; UI implementation in User Profile and server-side RBAC enforcement remain pending.
- [x] Build Commissions multi-step UI form (no real submission yet).
  - _Bilingual `/en/commissions` and `/es/commissions` page with guided brief, project process, FAQ, and quote-before-payment explanation. Payment and request submission remain inactive pending Phase 4 integration._
- [x] **Define typed contracts for future commissions API** — Commission, Product, Cart, CartItem, Order, OrderItem added to `contracts.ts`; commerce contracts consolidated 2026-10-20 (see decisions below).
- [x] Build Shop catalog UI and domain models.
  - _Bilingual `/en/shop` and `/es/shop` catalog with category filters, sorting, progressive loading, product cards, and localStorage cart using the typed commerce contracts. The catalog/cart UI and cart/order domain boundaries belong to Phase 3; implementing the checkout flow, payment, order creation and server-side validation belongs to Phase 4. Product artwork remains placeholder until catalog images are supplied._
- [x] Build reusable product detail mockup (2026-11-22).
  - _Bilingual `/en/shop/[productId]` and `/es/shop/[productId]` routes use each catalog product's data. Reuses header, PageIntro hero, footer, fonts and colors. Includes gallery placeholders, a disabled configuration selector with no invented variants, quantity controls, shared localStorage cart, accessible detail tabs and related products chosen by universe/category. Mock detail routes remain noindex until the catalog is finalized. Verified with 102 unit tests, TypeScript and 6 Shop E2E tests including desktop/mobile screenshots and unknown-product 404._
  - _Pending: product photography, definitive materials/specifications, option types and variants, backend catalog/relationships, authoritative pricing and stock, shipping/tax rules, and checkout integration. Thumbnail areas are reserved placeholders until gallery images are supplied._
- [x] Build User Profile UI sections for editable personal data (demo UI).
  - _Bilingual `/es/profile` and `/en/profile` demo: editable in-memory contact details and shipping/billing address fields; billing-same-as-shipping checkbox; save feedback, security/password placeholder. The current tab is kept in `?tab=` so browser Back restores the selected section after visiting the shop. No account data is persisted; authentication and sensitive-change confirmation remain pending._
- [x] Build User Profile UI sections for payment method management (provider-agnostic placeholders).
  - _Card and PayPal placeholders explain that methods are not connected; no payment credentials are collected or stored. Provider integration and secure add/remove flows remain pending._
- [x] Build User Profile order status and commission status tracking UI (sample UI).
  - _The fourth tab now shows separate bilingual sample order/commission cards with IDs, current statuses and timelines based on the defined lifecycle states. Data is explicitly marked as demo; live order/commission history and updates remain Phase 4 backend work._
- [x] Build User Profile downloads-library UI (demo placeholder).
  - _Bilingual downloads tab has four compact downloadable-file cards in a two-column layout, with thumbnail, download action and expandable description. Files/actions are visual placeholders only and are not purchase entitlements; real purchase-linked downloads are deferred to Phase 4. The source/storage decision (database vs external object/file storage) remains open and must be made before integration._
- [x] Defer role-aware backoffice access until account registration/sign-in is implemented.
  - _For the current unauthenticated profile demo the Backoffice preview card remains visible and non-navigable. User registration/sign-in and account access to Profile are future work; once authentication and user roles exist, show the real admin/backoffice destination only to authorized roles (admin/manager) and enforce authorization server-side. This is an accepted deferral, not a Phase 3 blocker._
- [x] Validate recent User Profile UI changes.
  - _Profile unit tests (3), profile navigation E2E at desktop/mobile (2), TypeScript, ESLint, and `git diff --check` passed after the recent profile UI changes._
- [x] Audit Phase 3 scope and run the full automated validation gate (2026-11-22).
  - _Audit: commissions UI and API contracts, shop catalog/cart/order foundations, bilingual profile demo, status timelines, Stripe + PayPal decision, and hybrid-to-centralized checkout path are present. Checkout/payment, registration/sign-in, role-aware Backoffice access, and purchase-linked digital downloads are explicitly later-phase work; download asset storage (database vs external object/file storage) remains an architecture decision for Phase 4 integration._
  - _Validation from `uis/web`: 109 unit tests passed (13 files); `npx tsc --noEmit` passed; `npm run lint` completed with 0 errors and 5 warnings (unused symbols in `services-page-content.tsx`, `site-header.tsx`, `app/content.ts`, and `src/types/content.ts`); `npm run build` succeeded and generated 42 static pages; all 45 Playwright E2E tests passed. These UI tests do not imply real checkout, backend, authentication, or protected download flows._

- [x] Clarify project phase status: Phase 3 foundation/UI scope is complete; Phase 4 is next. This is not a claim of production commerce readiness.
- [x] Confirm payment decision consistency: Stripe (cards) + PayPal were selected in ADR-001 on 2026-08-29. Provider-agnostic adapter implementation, payment processing and compliance remain Phase 4 work.
- [x] Accessibility/structured-data view audit started 2026-11-23; automated unit tests pass (109/109). Findings and any remediation are recorded below before declaring audit complete.

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
  - Statuses: draft → pending_payment → paid → preparing / in_production → ready_to_ship → shipped → delivered → done (manual archive) | cancelled | refunded

3. **My Commissions**
   - Custom work tracking
  - Statuses: submitted → in_review → quoted → pending_payment → paid → standby → in_production → completed → ready_to_ship → shipped → done (manual archive)
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

### Cart/Order Boundaries (defined 2026-08-29; clarified 2026-10-20)

#### Storage
- **Current phase**: Cart saved in local storage (user's browser).
- **Future**: Migrate to server-side storage when backend is operational.

#### Cart → Order Flow

1. User adds catalog products to the cart (saved locally); displayed prices are indicative and must be revalidated server-side at checkout.
2. Checkout creates pending order(s), grouped by fulfillment type (physical, digital, commission), with item and price snapshots. A commission request itself is not a catalog purchase.
3. An order becomes `paid` only after the payment provider confirms successful payment. Clear the cart only after successful confirmation.
4. The profile tracks every order from payment through fulfillment. Guest checkout may remain possible, but profile tracking requires an account/ownership association.

#### Cart with Multiple Product Types

The cart/checkout can handle **3 fulfillment groups**, each visible with its own explanatory note. Commissions enter checkout only after the store accepts the request, sends a quote, and the customer accepts; they are not added as ordinary catalog products:

| List | Type | Note to user | Delivery |
|-------|------|-------------|---------|
| 📦 **Physical Products** | Figures, 3D prints | "Estimated shipping: 7-15 business days" | Shipping tracking |
| 💻 **Digital Products** | STLs, downloadable models | "Immediate download after payment" | Download link |
| 🎨 **Commissions** | Custom work | "Timeline will be agreed upon budget acceptance" | Production tracking |

Each fulfillment group generates an **independent order** at checkout, so physical, digital, and commission fulfillment can be tracked separately in the profile. A commission payment order is created only after the store accepts the request, sends a quote, and the customer accepts it.

#### Fulfillment and profile tracking (clarified 2026-10-20)
- **Digital products**: download entitlement/link becomes available only after successful payment confirmation.
- **Physical products**: track preparation/production, ready-to-ship, shipment, delivery, and manual archive completion.
- **Commissions**: customer submits a request; the store reviews and accepts it, sends a quote, and the customer accepts the quote. Then the checkout/payment link is generated. The quote payment is represented by a separate order linked to the commission request. The profile shows request/quote/payment and subsequent production/delivery progress.
- A commission is not directly purchasable from the catalog. Only an accepted quote can be paid through checkout.
- Order line items preserve a snapshot of catalog identity/title and unit price at order creation; checkout must revalidate prices server-side.
- Money is represented as integer minor units (e.g. cents) with an explicit currency.

#### Commissions: special payment flow

Commissions are **not purchased directly** like catalog products. They follow this flow:

```
Client submits request ──▶ Store reviews/accepts ──▶ Store sends quote ──▶ Client accepts
                                                                    │
                                                                    ▼
                          ┌──────────────────────────────────────────┘
                          ▼
              Client sees in "My Commissions"
              the accepted quote and checkout link
              with a payment deadline (if configured)
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

#### Commission Lifecycle (defined 2026-08-29; clarified 2026-10-20)

```
submitted ──▶ in_review ──▶ quoted ──▶ pending_payment ──▶ paid ──▶ standby ──▶ in_production ──▶ completed ──▶ ready_to_ship ──▶ shipped ──▶ done

cancelled (only from submitted / in_review / quoted — before payment)
```

- `done` is a manual archive/close state set by an admin or manager after fulfillment; it is not an automatic synonym for `shipped`.
- Orders also support `done` as an admin/manager-applied archive state after fulfillment.

### Implementation notes to carry forward (clarified 2026-11-22)
- Backoffice access rule is defined: after registration/sign-in and role support exist, show the destination only to `admin` and `manager`, hidden from support, customer, and anonymous users. Role-aware rendering and server-side RBAC are deferred until the account/authentication and backend phases; the current demo card remains visible but disabled.
- Cart/catalog UI and cart/order domain boundaries are Phase 3 foundations. Checkout UI/flow, payment processing, order creation and server-side price/stock validation are Phase 4 Full Commerce work.
- The Profile downloads cards and STL are visual placeholders only. Production downloads must be tied to confirmed purchase entitlements. Before integration, decide whether digital assets are stored/served from a database-backed system or external object/file storage; do not store large binary assets directly in a relational database without evaluating the storage design.
- The website remains partly mockup: Home carousel and Projects gallery use placeholder/mock content to validate behavior; Services is largely complete but can receive a final copy/concept review; legal pages remain mockups pending real business details and English translations. Phase 2 completion refers to its current UI/functionality scope, not final production content for all pages.
- This progress file was updated 2026-11-22 to record the current Profile demo scope and the accepted Phase 4/authentication deferrals.

### Exit Criteria
- Commissions UI is complete.
- Shop domain is ready for payment implementation.
- All Phase 3 checklist items are either completed or explicitly accepted as deferred, with validation evidence recorded.
- Full automated Phase 3 validation gate is recorded above; lint has warnings to clean up, but no errors.
- This exit criteria certifies the agreed foundation/UI scope only, not production commerce readiness.

### Remaining work to close Phase 3
- No unaccepted Phase 3 scope blockers remain after the 2026-11-22 audit; checkout, accounts/roles and production downloads are explicitly deferred to later phases.
- Optional cleanup: resolve the five existing ESLint unused-symbol warnings before enforcing a warning-free lint gate.
- Product photography and finalized product specifications/options remain content/catalog inputs; they do not block the current foundation/mockup scope but are needed before production catalog sign-off.
- If a manual visual/accessibility sign-off beyond automated coverage is required, record that review separately before declaring production readiness. Phase 3 completion means the agreed foundation/UI scope, not production commerce launch readiness.

---

## Phase 4 - Full Commerce and Services Integration
Goal: deliver customer commerce integrations and establish an early visual Backoffice prototype that helps discover and validate operational requirements. Prototype first with mock data; implement real behavior only when its workflow, permissions, contract, and acceptance cases are sufficiently defined. Deliver in vertical slices rather than waiting for every view or endpoint to be complete.

### Checklist
- [ ] Define Phase 4/5 boundaries and first vertical slices: Phase 4 owns customer-facing commerce/profile integrations and the visual-only Backoffice prototype; Phase 5 owns production operational backend capabilities and their production connections. Shared foundations/contracts are assigned once to the phase that implements them; avoid duplicate checklist ownership.
- [ ] Plan the Backoffice prototype scope from the agreed page inventory: prioritize views and journeys, record explicitly deferred views/actions, and map each view to its users and purpose.
- [ ] Build the Backoffice visual shell: responsive persistent navigation, page headers, consistent forms/tables/dialogs, status indicators, and the site's existing visual identity; support PC, tablet, and mobile layouts.
- [ ] Build prioritized Backoffice views as prototypes using clearly identified mock data only. Include representative list/detail and empty, loading, error, and populated states; keep unapproved or high-impact actions disabled/non-functional and label them as prototype behavior.
- [ ] Maintain a per-view traceability record: purpose, displayed data, actions, roles, states, filters/sorting/pagination, notifications, API/contract dependencies, edge cases, and unresolved decisions. Update it during prototype reviews so discoveries are not lost.
- [ ] Review the prototype against operational workflows and update the workflow drafts, page inventory, priorities, and acceptance scenarios; distinguish confirmed decisions from assumptions and open questions.
- [ ] For each Phase 4 customer-facing slice, approve the relevant workflow and derive endpoint/data contracts, authorization, validation/error behavior, concurrency/idempotency needs, and acceptance tests before enabling real actions.
- [ ] Implement only the backend/API endpoints required for approved Phase 4 customer-facing slices under services; do not treat this as completion of the Phase 5 operational backend.
- [ ] Connect commissions form to API.
- [ ] Implement checkout with selected payment gateway.
- [ ] Add order lifecycle handling and validation.
- [ ] Add integration tests for commerce flows.
- [ ] Connect User Profile personal data updates to backend.
- [ ] Connect User Profile password update flow to backend with secure validation.
- [ ] Connect User Profile payment method management to payment provider tokens/references.
- [ ] Connect User Profile order and commission status feeds to backend endpoints.
- [ ] Enforce customer account and role-based access for implemented Phase 4 routes/actions on both frontend and backend; backoffice prototype visibility is not an authorization mechanism.
- [ ] Validate prototype usability and responsive behavior, accessibility basics, and consistency between visible controls/states and documented workflow decisions; keep prototype-only behavior clearly separated from production functionality.

### Phase 4 Prototype Guardrails
- Backoffice prototype screens are planning/UX artifacts, not production operations. Use synthetic fixtures; never expose real customer, payment, or sensitive data in the prototype.
- Mock transitions must be clearly non-persistent and must not imply that a payment, refund, shipment, publication, deletion, or permission change actually occurred.
- Do not implement/enable real financial, destructive, publication, or personal-data actions until the relevant policy, action-level permission, endpoint contract, confirmation/safeguard, audit event, and tests are approved.
- Preserve an explicit status for every item: `prototype`, `specified`, `implemented`, `integrated`, or `deferred`; do not mark a Phase 5 operational capability complete merely because a visual screen exists.
- Reuse the prototype as the UX reference when Phase 5 implementation begins. Changes discovered then should update the traceability record and contracts, not create a second parallel set of views.

### Exit Criteria
- Agreed Phase 4 customer-facing commerce/profile flows work end-to-end with validation, error handling, observability, and integration tests.
- Prioritized Backoffice prototype views exist with responsive layouts, mock-state coverage, and documented assumptions/open decisions.
- A per-view traceability record links prototype requirements to approved workflows, contracts, permissions, and tests; non-approved actions remain inert.
- Phase 5 operational backend capabilities are explicitly tracked as pending and are not represented as completed by the prototype.

---

## Phase 5 - Backend Setup and Admin Operations
Goal: configure and implement production backend capabilities and operational Backoffice behavior required to run users, commissions, store, products, portfolio, and related operations. Use the Phase 4 prototype and traceability record as UX input; implement and connect capabilities incrementally as workflows/contracts are approved. Do not repeat Phase 4 prototype creation or customer-facing integration tasks here.

### Checklist
- [x] Define backend integration blueprint and shared API contracts for all views (pre-implementation).
- [ ] Configure backend project foundation and integration boundaries.
- [ ] Finalize production action-level RBAC, auditability, sensitive-data boundaries, and retention from the planning matrix before enabling operational actions.
- [ ] Implement production Backoffice authentication/authorization and server-side protection for Admin/Manager routes and APIs; reject unauthenticated/unauthorized direct access.
- [ ] Implement operational dashboard data and metrics against approved definitions and sources (prototype layout is Phase 4; production data/behavior is Phase 5).
- [ ] Implement production user-management operations (filters/details and approved disable/delete or other lifecycle actions) with permission checks and audit records.
- [ ] Implement production commission operations (intake/detail, approved transitions, internal notes, customer communications, and status tracking).
- [ ] Implement production sales/order operations (list/detail, shipping and approved status actions, reconciliation/refund paths where policies permit).
- [ ] Implement product catalog persistence and CRUD with review/publication safeguards; connect the customer shop to the production catalog.
- [ ] Implement portfolio/media persistence and CRUD with review/publication safeguards; connect the public Projects page to production content.
- [ ] Implement additional operational views (Asset Vault, Incidents, Calendar, Statistics, Profile) only according to the approved priority, workflows, contracts, and policies; keep deferred scope explicitly deferred.
- [ ] Add integration/authorization/audit tests for each production operational slice and verify it against the Phase 4 view traceability record.

### Exit Criteria
- Prioritized production Backoffice views and database operations are functional end-to-end with server-side authorization and auditability.
- Store and Projects content can be maintained from backend tools.
- Commission requests can be tracked operationally.
- Implemented production behavior matches the approved workflows/contracts and the Phase 4 prototype or has an explicitly reviewed UX change; prototype-only fixtures and inert controls are not mistaken for production capabilities.

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

