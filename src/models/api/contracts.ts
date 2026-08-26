export type LocaleCode = "es" | "en";

export type Role = "admin" | "manager" | "support" | "customer";

export type EntityStatus = "active" | "inactive" | "archived";

export type PaymentMethodType = "card" | "paypal";

export type CommissionStatus =
  | "submitted"
  | "in_review"
  | "quoted"
  | "approved"
  | "in_production"
  | "shipped"
  | "completed"
  | "cancelled";

export type OrderStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "delivered"
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
  status: CommissionStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  stock: number;
  isVisible: boolean;
  featured: boolean;
  tags: string[];
  imageUrls: string[];
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

export interface Order {
  id: string;
  userId?: string;
  productIds: string[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  status: OrderStatus;
  paymentProvider?: string;
  paymentReference?: string;
  shippingProvider?: string;
  shippingReference?: string;
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
