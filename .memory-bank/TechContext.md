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

## Open Technical Decisions
- Deployment platform (pending)
- Payment provider for full checkout (pending)
- CMS adoption vs repository-based content (pending)

