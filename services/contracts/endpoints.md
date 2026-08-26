# API Endpoints Draft (v1)

Base path: /api/v1

## Public and Site Views
- GET /content/services
- GET /portfolio
- GET /portfolio/{portfolioId}
- GET /portfolio/featured
- GET /products
- GET /products/{productId}
- GET /products/featured

## Commissions
- POST /commissions
- GET /commissions/{commissionId}
- GET /commissions
- PATCH /commissions/{commissionId}/status

## Shop and Orders
- POST /cart
- GET /cart/{cartId}
- PATCH /cart/{cartId}
- POST /orders
- GET /orders/{orderId}
- PATCH /orders/{orderId}/shipping
- PATCH /orders/{orderId}/status

## Users and Admin
- GET /users
- GET /users/{userId}
- PATCH /users/{userId}
- DELETE /users/{userId}

## Authenticated User Profile
- GET /me
- PATCH /me/profile
- PATCH /me/password
- GET /me/payment-methods
- POST /me/payment-methods
- DELETE /me/payment-methods/{paymentMethodId}
- GET /me/orders
- GET /me/commissions

## Metrics Dashboard
- GET /metrics/summary
- GET /metrics/sales
- GET /metrics/commissions

## Notes
- All list endpoints should support pagination, search, and filter where relevant.
- Admin routes require role-based authorization.
- Hybrid checkout mode can expose: POST /checkout/external-session.
- Centralized mode can expose: POST /checkout/payment-intent.
- Payment methods must be tokenized by provider; no raw card data should be stored.
- Role and ownership enforcement matrix:
	- docs/API_RBAC_MATRIX.md
