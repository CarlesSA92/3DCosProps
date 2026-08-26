# API RBAC Matrix (Draft)

## Purpose
Define who can call each endpoint before implementation, so frontend visibility and backend authorization remain aligned.

## Roles
- admin
- manager
- support
- customer
- anonymous

Legend:
- allow: endpoint can be executed by role
- deny: endpoint is blocked for role
- own: only user-owned resources are accessible

## Public and Site Views
| Endpoint | admin | manager | support | customer | anonymous | Notes |
|---|---|---|---|---|---|---|
| GET /content/services | allow | allow | allow | allow | allow | Public content |
| GET /portfolio | allow | allow | allow | allow | allow | Public content |
| GET /portfolio/{portfolioId} | allow | allow | allow | allow | allow | Public content |
| GET /portfolio/featured | allow | allow | allow | allow | allow | Public content |
| GET /products | allow | allow | allow | allow | allow | Public content |
| GET /products/{productId} | allow | allow | allow | allow | allow | Public content |
| GET /products/featured | allow | allow | allow | allow | allow | Public content |

## Commissions
| Endpoint | admin | manager | support | customer | anonymous | Notes |
|---|---|---|---|---|---|---|
| POST /commissions | allow | allow | allow | allow | allow | Public intake allowed |
| GET /commissions/{commissionId} | allow | allow | allow | own | deny | Own commission only for customer |
| GET /commissions | allow | allow | allow | own | deny | Customer gets own list |
| PATCH /commissions/{commissionId}/status | allow | allow | allow | deny | deny | Staff operation |

## Shop and Orders
| Endpoint | admin | manager | support | customer | anonymous | Notes |
|---|---|---|---|---|---|---|
| POST /cart | allow | allow | allow | allow | allow | Session or user cart |
| GET /cart/{cartId} | allow | allow | allow | own | own | Owner validation required |
| PATCH /cart/{cartId} | allow | allow | allow | own | own | Owner validation required |
| POST /orders | allow | allow | allow | allow | allow | Guest checkout possible in hybrid |
| GET /orders/{orderId} | allow | allow | allow | own | deny | Own order only for customer |
| PATCH /orders/{orderId}/shipping | allow | allow | allow | deny | deny | Staff operation |
| PATCH /orders/{orderId}/status | allow | allow | allow | deny | deny | Staff operation |

## Users and Admin
| Endpoint | admin | manager | support | customer | anonymous | Notes |
|---|---|---|---|---|---|---|
| GET /users | allow | allow | allow | deny | deny | Filtered fields for support |
| GET /users/{userId} | allow | allow | allow | own | deny | Customer can read own user |
| PATCH /users/{userId} | allow | allow | deny | own | deny | Manager cannot elevate roles |
| DELETE /users/{userId} | allow | deny | deny | deny | deny | Hard/soft delete policy applies |

## Authenticated User Profile
| Endpoint | admin | manager | support | customer | anonymous | Notes |
|---|---|---|---|---|---|---|
| GET /me | allow | allow | allow | allow | deny | Auth required |
| PATCH /me/profile | allow | allow | allow | allow | deny | Auth required |
| PATCH /me/password | allow | allow | allow | allow | deny | Current password or verified reset token |
| GET /me/payment-methods | allow | allow | allow | allow | deny | Tokenized payment references only |
| POST /me/payment-methods | allow | allow | allow | allow | deny | Tokenized payment references only |
| DELETE /me/payment-methods/{paymentMethodId} | allow | allow | allow | allow | deny | Own payment method only |
| GET /me/orders | allow | allow | allow | allow | deny | Own orders only |
| GET /me/commissions | allow | allow | allow | allow | deny | Own commissions only |

## Metrics Dashboard
| Endpoint | admin | manager | support | customer | anonymous | Notes |
|---|---|---|---|---|---|---|
| GET /metrics/summary | allow | allow | deny | deny | deny | Admin panel access |
| GET /metrics/sales | allow | allow | deny | deny | deny | Admin panel access |
| GET /metrics/commissions | allow | allow | deny | deny | deny | Admin panel access |

## Frontend Visibility Rules
- Backend access link in User Profile:
  - Visible: admin, manager
  - Hidden: support, customer, anonymous
- Visibility is UX only. Backend authorization must still enforce access.

## Implementation Notes
- Enforce ownership checks server-side for all own resources.
- Enforce role checks server-side for all staff/admin endpoints.
- Log sensitive operations (status updates, user deletion, admin access).
- Re-evaluate this matrix when payment provider decision is finalized.
