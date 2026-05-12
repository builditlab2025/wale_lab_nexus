// ============================================
// Enums
// ============================================

export enum Currency {
  NGN = "NGN",
  USD = "USD",
}

export enum PaymentEntityType {
  COURSE = "COURSE",
  RESEARCH = "RESEARCH",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  OVERDUE = "OVERDUE",
  PARTIAL = "PARTIAL",
  REFUNDED = "REFUNDED",
}

// ============================================
// Base Types
// ============================================

export interface PaymentResponse {
  payment_id: string;
  authorization_url: string;
  reference: string;
  amount: number;
  payment_type: string;
  entity_type: PaymentEntityType;
  entity_id: string;
  installment_number?: number;
  total_installments?: number;
  due_date?: Date;
  original_amount?: number;
  discount_applied?: number;
  coupon_applied?: string;
  vat_rate?: number;
  vat_amount?: number;
  subtotal?: number;
  total_with_vat?: number;
  currency?: Currency;
}

export interface PaymentVerificationResponse {
  message: string;
  enrollment: {
    id: string;
    entity_id: string;
    entity_type: string;
    completed_at: Date;
  };
  payment: {
    id: string;
    amount: number;
    paid_at: Date;
  };
}

export interface PaymentHistoryItem {
  id: string;
  status: PaymentStatus;
  amount: number;
  amount_paid: number;
  installment_number?: number;
  total_installments?: number;
  due_date?: Date;
  paid_at?: Date;
  entity_title?: string;
  entity_type?: PaymentEntityType;
  payment_type?: string;
  payment_reference?: string;
  created_at?: Date;
  vat_rate?: number;
  vat_amount?: number;
  subtotal?: number;
  discount_applied?: number;
  coupon_applied?: string;
  currency?: Currency;
  tax_name?: string;
  country_code?: string;
}

export interface PaymentStatusResponse {
  id: string;
  status: PaymentStatus;
  amount: number;
  amount_paid: number;
  installment_number?: number;
  total_installments?: number;
  due_date?: Date;
  paid_at?: Date;
  entity_title?: string;
  entity_type?: PaymentEntityType;
  vat_rate?: number;
  vat_amount?: number;
  subtotal?: number;
  discount_applied?: number;
  coupon_applied?: string;
  country_code?: string;
  tax_name?: string;
  currency?: Currency;
}

// ============================================
// Admin Types
// ============================================

export interface AdminPaymentItem {
  id: string;
  status: PaymentStatus;
  amount: number;
  amount_paid: number;
  installment_number?: number;
  total_installments?: number;
  due_date?: Date;
  paid_at?: Date;
  payment_reference?: string;
  payment_type?: string;
  created_at?: Date;
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
  entity: {
    id: string;
    title: string;
    type: string;
  };
  vat_rate?: number;
  vat_amount?: number;
  subtotal?: number;
  discount_applied?: number;
  coupon_applied?: string;
  currency?: Currency;
}

export interface AdminPaymentQueryDto {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
  entity_type?: PaymentEntityType;
  search?: string;
}

export interface UpdatePaymentStatusDto {
  status: PaymentStatus;
  admin_notes?: string;
}

export interface PaymentStatsQueryDto {
  currency?: Currency;
}

export interface PaymentStatsResponse {
  currency: Currency;
  total_payments: number;
  paid_payments: number;
  pending_payments: number;
  failed_payments: number;
  partial_payments: number;
  total_revenue: number;
  average_transaction_value: number;
  total_unique_customers: number;
  payment_type_breakdown: {
    type: string;
    count: number;
    total_amount: number;
  }[];
  installment_breakdown: {
    total_installment_payments: number;
    total_installment_amount: number;
    completed_installments: number;
  };
  monthly_revenue: {
    month: string;
    month_display: string;
    revenue: number;
    count: number;
  }[];
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

export interface InitiatePaymentDto {
  entity_type: PaymentEntityType;
  entity_id: string;
  coupon_code?: string;
  installment_number?: number;
  country_code?: string;
  currency?: Currency;
}

export interface VerifyPaymentDto {
  reference: string;
}

export interface InstallmentPaymentDto {
  enrollment_id: string;
  installment_number: number;
}

export interface BillingHistoryQueryDto {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
  entity_type?: PaymentEntityType;
  search?: string;
}

// ============================================
// Response Types
// ============================================

export interface PaginatedPaymentHistoryResponse {
  data: PaymentHistoryItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginatedAdminPaymentResponse {
  data: AdminPaymentItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
