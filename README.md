# 3D CosProps

Website redesign and product platform for a 3D modeling and 3D printing studio.

Current status: planning and architecture are complete, and implementation starts in Phase 1 (Home MVP).

## Project Goals

- Deliver a premium, cinematic web experience aligned with the Forge & Fidelity design system.
- Support bilingual navigation (es/en) from the beginning.
- Build a scalable platform that can evolve from hybrid checkout to centralized e-commerce.
- Prepare backend operations for users, commissions, orders, products, portfolio content, and admin workflows.

## Planned Stack

- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- Package manager: npm
- Deployment target: Vercel + owned domain (ADR-001)
- Backend/API (planned): versioned REST under /api/v1 with shared TS contracts

## Monorepo Structure

The repository follows a domain-first monorepo layout where each top-level folder has a clear responsibility:

```text
.
|- .agents/        # Agent rules and operational guidance
|- .memory-bank/   # Planning memory, progress tracking, and technical context
|- docs/           # Product/design/backend architecture documentation
|- media/          # Images and assets used by the web experience
|- references/     # Visual references for final UI direction
|- scripts/        # Automation and repository scripts
|- services/       # API layer and backend contracts/implementations
|- skills/         # Agent skills and callable utilities
|- src/            # Shared TypeScript models/contracts used across layers
|- uis/            # Frontend applications (planned app location: uis/web)
```

## Key Documentation

- Project brief: [docs/3d_cosprops_project_brief.md](docs/3d_cosprops_project_brief.md)
- Design system: [docs/DESIGN.md](docs/DESIGN.md)
- Backend integration blueprint: [docs/BACKEND_INTEGRATION_BLUEPRINT.md](docs/BACKEND_INTEGRATION_BLUEPRINT.md)
- API RBAC matrix: [docs/API_RBAC_MATRIX.md](docs/API_RBAC_MATRIX.md)
- Endpoint draft: [services/contracts/endpoints.md](services/contracts/endpoints.md)
- Shared API contracts: [src/models/api/contracts.ts](src/models/api/contracts.ts)
- Progress and phase plan: [.memory-bank/progress.md](.memory-bank/progress.md)
- Technical context: [.memory-bank/TechContext.md](.memory-bank/TechContext.md)

## Delivery Phases (Summary)

- Phase 1: Home MVP (responsive, bilingual, SEO/accessibility/performance baseline)
- Phase 2: Services + Projects and User Profile IA definition
- Phase 3: Commissions + Shop domain + User Profile UI
- Phase 4: Full integration (payments, orders, profile actions, tracking)
- Phase 5: Backend/admin operations (metrics, users, commissions, shop ops, CRUD)
- Phase 6: Launch readiness (QA, docs, deployment hardening)

See the complete checklist and DoD in [.memory-bank/progress.md](.memory-bank/progress.md).

## User Profile and Access Rules (Planned)

- Users can edit profile data, manage payment methods, and track orders/commissions.
- Backend access link from profile is role-gated:
	- Visible for admin and manager
	- Hidden for support, customer, anonymous
- Authorization must be enforced server-side regardless of UI visibility.

## Current Repository State

- Planning artifacts are in place.
- Frontend app scaffold is not created yet.
- Backend endpoints are drafted but not implemented.

## How to Start Implementation

When implementation begins (Phase 1), bootstrap the web app inside uis/web with Next.js + TypeScript + Tailwind and align with docs listed above.

Suggested first milestones:

1. Create uis/web app scaffold and base layout.
2. Add bilingual route structure (/es and /en).
3. Implement design tokens and shared UI primitives.
4. Build Home MVP sections and quality baseline checks.

