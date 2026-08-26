# 3D CosProps Backend Integration Blueprint

## Purpose
Prepare backend integration so every website view can connect to stable contracts without redesigning data models later.

## Scope
- Define backend modules and ownership.
- Define API surface by business domain.
- Define view-to-endpoint mapping.
- Define role model and admin access boundaries.
- Define migration path from hybrid commerce to centralized checkout.

## Backend Modules
1. Auth and Access
2. Users Management
3. Commissions Management
4. Shop Operations
5. Products Catalog
6. Portfolio Content
7. Metrics and Reporting

## Integration Strategy
- Frontend app consumes a versioned API namespace: /api/v1.
- Contracts are shared in TypeScript under src/models/api.
- External systems (for temporary checkout) are abstracted through a provider adapter.
- Route-level data fetching should remain domain-separated to avoid coupling between views.

## View Connection Map
1. Home
- Reads featured products and featured portfolio entries.
- Optional reads for top-level stats (only if metrics are public-safe).

2. Services
- Reads static or semi-static service offerings from backend-configurable content.

3. Projects
- Reads portfolio list with filters and pagination.

4. Shop
- Reads products, stock state, and pricing metadata.
- Writes cart and order draft states.
- Writes checkout intents (centralized mode) or redirect session (hybrid mode).

5. Commissions
- Writes new commission requests.
- Reads request status timeline for authenticated users or admin staff.

6. Admin Dashboards
- Metrics panel reads KPI and sales summary.
- Users panel reads/searches users and performs moderation actions.
- Commissions panel reads and updates commission lifecycle status.
- Shop operations panel reads/updates shipping and order statuses.

7. User Profile
- Reads authenticated user profile data.
- Writes profile updates (name, email, address, password through secure flow).
- Reads and updates payment method references (provider-tokenized, no raw card data).
- Reads order status timeline and commission status timeline for the authenticated user.
- Shows backend access link only for admin and manager roles.

## RBAC Baseline
Roles:
- admin
- manager
- support
- customer

Permission examples:
- users.read: admin, manager, support
- users.delete: admin
- commissions.update_status: admin, manager, support
- products.write: admin, manager
- portfolio.write: admin, manager
- orders.update_shipping: admin, manager, support
- admin.panel.access: admin, manager

Authorization source of truth:
- docs/API_RBAC_MATRIX.md

## Data Ownership
- users: identity, profile, account state
- payment_methods: tokenized references, provider metadata, default flag
- commissions: request details, references, status, notes
- products: catalog, stock, pricing, visibility
- orders: lifecycle, payment reference, shipping reference
- portfolio: project metadata, media links, tags
- metrics: aggregated analytics only (no raw PII in dashboard payloads)

## API Design Rules
- Use stable IDs (uuid).
- Use ISO-8601 timestamps.
- Use soft-delete where business history matters.
- Return typed error envelopes with code/message/details.
- Add pagination to list endpoints from day one.
- Never store raw card PAN/CVV data in project databases.

## Hybrid to Centralized Checkout Path
1. Phase 3: keep adapter supporting external checkout provider.
2. Phase 4: add centralized checkout endpoints and payment intents.
3. Phase 5: unify order lifecycle and operations dashboard.
4. Switch by feature flag at route level.

## Pending Decisions
- Final payment provider stack (Stripe, PayPal, card acquiring path, or combination).
- Fiscal/compliance requirements by target market.
- Data retention policies for user and commission records.
