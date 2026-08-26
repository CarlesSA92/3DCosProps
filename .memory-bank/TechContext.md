# 3D CosProps - Tech Context

## Core Stack
- Framework: Next.js (App Router)
- UI Library: React
- Language: TypeScript
- Styling: Tailwind CSS
- Package Manager: npm

## Frontend Architecture
- App location: uis/web
- Routing strategy: locale routes (/es, /en)
- Rendering strategy:
	- Static and hybrid rendering for marketing/content pages
	- Client components only where interaction requires it
- Component model:
	- Reusable UI primitives (buttons, cards, chips, inputs, layout blocks)
	- Feature-oriented sections for each page

## Design System Integration
- Source docs:
	- docs/3d_cosprops_project_brief.md
	- docs/DESIGN.md
- Visual direction:
	- Dark-first premium aesthetic
	- Metallic gold highlights for CTA and active states
	- Technical typography hierarchy
- Tokenization in code:
	- Colors, typography, spacing, radius, elevation/layers

## Content Strategy (Current)
- Initial source: local mock data
- Text baseline: references folder inspiration + project docs
- Future assets: media folder
- Future backend content: services layer and/or CMS (to be decided later)

## Quality and Engineering Standards
- Accessibility:
	- WCAG AA baseline
	- Keyboard navigation
	- Focus visibility and semantic landmarks
- Performance:
	- Core Web Vitals focus (LCP, CLS)
	- Responsive image strategy and lazy loading
- SEO:
	- Metadata per page and locale
	- Sitemap, robots, canonical strategy
- Testing:
	- Unit tests for critical utilities/components
	- Smoke E2E for key page flows and locale switching

## Internationalization
- Languages: Spanish and English from start
- URL strategy: route-based locales (/es, /en)
- Translation storage:
	- Local dictionaries in repository during early phases
	- Structured keys for scalable page expansion

## Future Integration Points
- services/: API contracts and implementations for commissions and commerce
- src/: shared types/models used across UI and services
- scripts/: build, validation, or migration scripts as project matures

## Backend Preparation (Pre-Implementation)
- Integration blueprint document:
	- docs/BACKEND_INTEGRATION_BLUEPRINT.md
- RBAC matrix by endpoint:
	- docs/API_RBAC_MATRIX.md
- Endpoint draft by domain:
	- services/contracts/endpoints.md
- Shared TypeScript contracts for frontend/backend connection:
	- src/models/api/contracts.ts

### Backend Integration Conventions
- Versioned API base path: /api/v1
- Shared DTO contracts must be defined first in src/models/api before endpoint implementation.
- Views must connect through domain endpoints (products, portfolio, commissions, orders, users, metrics) to avoid cross-domain coupling.
- Checkout must remain provider-agnostic through an adapter approach until final payment decision.
- Admin operations require role-based access control (admin, manager, support, customer).
- User Profile view must support: profile editing, payment method management, order tracking, commission tracking, and role-gated backend access link.
- Backend access link visibility from profile:
	- Visible: admin, manager
	- Hidden: support, customer, anonymous
- Visibility is UX-only. Server-side authorization is mandatory for all privileged endpoints.

## User Profile Integration Scope (Planned)
- Account data:
	- display name, email, password update flow, shipping/billing address
- Payment methods:
	- provider-tokenized references only (no raw card storage)
- Tracking:
	- user order status timeline
	- user commission status timeline
- Security:
	- ownership checks for user data
	- RBAC enforcement for backend/admin access

## Open Technical Decisions
- Deployment platform: Vercel with owned domain (decided in ADR-001)
- Payment provider for full checkout (pending)
- CMS adoption vs repository-based content (pending)

