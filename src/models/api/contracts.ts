export type LocaleCode = "es" | "en";

export type Role = "admin" | "manager" | "support" | "customer";

export type EntityStatus = "active" | "inactive" | "archived";

export type PaymentMethodType = "card" | "paypal";

export type CommissionStatus =
  | "submitted"
  | "in_review"
  | "quoted"
  | "pending_payment"
  | "paid"
  | "standby"
  | "in_production"
  | "completed"
  | "ready_to_ship"
  | "shipped"
  | "done"
  | "cancelled";

export type OrderStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "preparing"
  | "in_production"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "delivered"
  | "done"
  | "cancelled"
  | "refunded";

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

export interface PageRequest {
  page: number;
  pageSize: number;
  query?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface PageResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode: string;
  countryCode: string;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  provider: string;
  label: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  phone?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  role: Role;
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileUpdateInput {
  displayName?: string;
  email?: string;
  phone?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
}

export interface UserPasswordUpdateInput {
  currentPassword: string;
  newPassword: string;
}

export interface Commission {
  id: string;
  userId?: string;
  title: string;
  category: string;
  referenceUrls: string[];
  details: string;
  budgetRange?: string;
  dueDate?: string;
  quote?: CommissionQuote;
  /** Order created for the accepted quote; commissions are not ordinary catalog items. */
  paymentOrderId?: string;
  status: CommissionStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionQuote {
  amountCents: number;
  currency: string;
  expiresAt?: string;
  /** Short-lived checkout link, issued after the customer accepts the quote. */
  paymentUrl?: string;
}

// ─── Catalog ────────────────────────────────────────────────────────────────

export type ProductType = "physical" | "digital";

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ProductType;
  priceCents: number;
  currency: string;
  imageUrls: string[];
  tags: string[];
  isVisible: boolean;
  /** Relevant to physical products; omitted for digital products. */
  stock?: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Cart ───────────────────────────────────────────────────────────────────

export interface ProductCartItem {
  kind: "product";
  productId: string;
  productType: ProductType;
  quantity: number;
  /** Snapshot for display only; the server must revalidate price at checkout. */
  unitPriceCents: number;
}

/** Only a quoted commission can enter checkout, linked to its separate request. */
export interface CommissionCartItem {
  kind: "commission";
  commissionId: string;
  quantity: 1;
  unitPriceCents: number;
}

export type CartItem = ProductCartItem | CommissionCartItem;

export interface Cart {
  id?: string;
  currency: string;
  items: CartItem[];
  subtotalCents: number;
  updatedAt: string;
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export interface ProductOrderItem {
  kind: "product";
  productId: string;
  productType: ProductType;
  /** Product details and price are snapshotted when the order is created. */
  title: string;
  quantity: number;
  unitPriceCents: number;
  /** Present only for digital products and available only after payment succeeds. */
  downloads?: DownloadEntitlement[];
}

export interface DownloadEntitlement {
  id: string;
  fileName: string;
  availableAt: string;
  /** Short-lived, authorized URL; do not persist it as the permanent asset URL. */
  downloadUrl?: string;
}

export interface CommissionOrderItem {
  kind: "commission";
  commissionId: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
}

export type OrderItem = ProductOrderItem | CommissionOrderItem;

export type OrderFulfillmentType = "physical" | "digital" | "commission";

export interface Order {
  id: string;
  userId?: string;
  /** One fulfillment type per order; mixed carts are split into independent orders. */
  fulfillmentType: OrderFulfillmentType;
  items: OrderItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  status: OrderStatus;
  shippingAddress?: Address;
  trackingNumber?: string;
  paymentProvider?: string;
  paymentReference?: string;
  shippingProvider?: string;
  shippingReference?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrls: string[];
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetricsSummary {
  period: "day" | "week" | "month" | "quarter" | "year";
  totalSalesCents: number;
  totalOrders: number;
  totalCommissionRequests: number;
  totalActiveUsers: number;
}

export const ApiPaths = {
  servicesContent: "/api/v1/content/services",
  portfolioList: "/api/v1/portfolio",
  portfolioFeatured: "/api/v1/portfolio/featured",
  productsList: "/api/v1/products",
  productsFeatured: "/api/v1/products/featured",
  commissionsList: "/api/v1/commissions",
  ordersList: "/api/v1/orders",
  usersList: "/api/v1/users",
  me: "/api/v1/me",
  meProfile: "/api/v1/me/profile",
  mePassword: "/api/v1/me/password",
  mePaymentMethods: "/api/v1/me/payment-methods",
  meOrders: "/api/v1/me/orders",
  meCommissions: "/api/v1/me/commissions",
  metricsSummary: "/api/v1/metrics/summary",
} as const;
