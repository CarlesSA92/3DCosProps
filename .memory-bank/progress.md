# 3D CosProps - Project Progress

## Global Status
- Current phase: Phase 0 (Planning and Foundations)
- Last update: 2026-08-26
- Scope decision: Phase 1 delivers Home only

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
- [ ] Define Definition of Done per phase.
- [ ] Create architecture decision record document.

### Exit Criteria
- Architecture, i18n, and phase scope are approved.
- Quality criteria for accessibility, SEO, performance, and testing are documented.

### Blockers
- Payment gateway not decided yet (future phases).
- Deployment target not decided yet.

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

### Exit Criteria
- End-to-end purchase flow works reliably.
- Error handling and observability are in place.

---

## Phase 5 - Launch Readiness
Goal: prepare release, documentation, and post-launch operations.

### Checklist
- [ ] Final QA pass (functional, accessibility, performance, SEO).
- [ ] Production build and deployment pipeline verified.
- [ ] Update README with setup, scripts, structure, and run guide.
- [ ] Prepare release notes and launch checklist.
- [ ] Define post-launch maintenance tasks.

### Exit Criteria
- Project is documented, tested, and deployable.

