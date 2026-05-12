import axios, { AxiosError } from "axios";
import {
  InitiatePaymentDto,
  VerifyPaymentDto,
  InstallmentPaymentDto,
  BillingHistoryQueryDto,
  AdminPaymentQueryDto,
  UpdatePaymentStatusDto,
  PaymentResponse,
  PaymentVerificationResponse,
  PaymentStatusResponse,
  PaginatedPaymentHistoryResponse,
  PaginatedAdminPaymentResponse,
  PaymentStatsResponse,
  Currency,
} from "../types/payment/payment.types";
import { authService } from "./authService";
import { ErrorResponse, ValidationError } from "../types/auth/auth.types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.lab.wale.university";

class PaymentService {
  private api = axios.create({
    baseURL: `${API_BASE_URL}/wl/api/v1`,
    timeout: 60000, // Increased timeout for payment processing
  });

  constructor() {
    // Add request interceptor to include auth token for protected endpoints
    this.api.interceptors.request.use(
      (config) => {
        const userInfo = authService.getUserInfo();
        if (userInfo?.token) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Add response interceptor to handle 401 errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          authService.logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  // ============================================
  // Error Handler
  // ============================================

  private handleError(error: AxiosError<ErrorResponse>): never {
    console.error("Payment API Error:", error);

    const responseData = error.response?.data;

    if (responseData) {
      if (responseData.response?.message) {
        throw new Error(responseData.response.message);
      }

      if (responseData.errors && Array.isArray(responseData.errors)) {
        const errorMessages = responseData.errors
          .map((err: ValidationError) => err.msg)
          .join(", ");
        throw new Error(errorMessages || "Validation failed");
      }

      if (responseData.message) {
        throw new Error(responseData.message);
      }
    }

    if (error.code === "NETWORK_ERROR" || error.code === "ECONNREFUSED") {
      throw new Error(
        "Unable to connect to server. Please check your connection.",
      );
    }

    if (error.response?.status === 401) {
      throw new Error("Unauthorized access. Please login again.");
    }

    if (error.response?.status === 403) {
      throw new Error("Access forbidden. Insufficient permissions.");
    }

    if (error.response?.status === 404) {
      throw new Error("Payment or enrollment not found.");
    }

    if (error.response?.status === 409) {
      throw new Error("Payment conflict. Already processed or duplicate.");
    }

    if (error.response?.status === 400) {
      throw new Error("Invalid payment request. Please check your input.");
    }

    throw new Error(error.message || "An unexpected error occurred");
  }

  // ============================================
  // User Payment Endpoints
  // ============================================

  /**
   * Initialize Paystack payment for course enrollment or research certificate
   */
  async initializePayment(dto: InitiatePaymentDto): Promise<PaymentResponse> {
    try {
      const response = await this.api.post<PaymentResponse>(
        "/payments/initialize",
        dto,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Verify Paystack payment and complete enrollment
   */
  async verifyPayment(
    dto: VerifyPaymentDto,
  ): Promise<PaymentVerificationResponse> {
    try {
      const response = await this.api.post<PaymentVerificationResponse>(
        "/payments/verify",
        dto,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Pay installment for course
   */
  async payInstallment(dto: InstallmentPaymentDto): Promise<PaymentResponse> {
    try {
      const response = await this.api.post<PaymentResponse>(
        "/payments/installment",
        dto,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Get user billing history with pagination
   */
  async getBillingHistory(
    query: BillingHistoryQueryDto = {},
  ): Promise<PaginatedPaymentHistoryResponse> {
    try {
      const params = new URLSearchParams();
      if (query.page) params.append("page", query.page.toString());
      if (query.limit) params.append("limit", query.limit.toString());
      if (query.status) params.append("status", query.status);
      if (query.entity_type) params.append("entity_type", query.entity_type);
      if (query.search) params.append("search", query.search);

      const response = await this.api.get<PaginatedPaymentHistoryResponse>(
        `/payments/history?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error in getBillingHistory:", error);
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Get single payment status by ID
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await this.api.get<PaymentStatusResponse>(
        `/payments/status/${paymentId}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  // ============================================
  // Admin Payment Endpoints
  // ============================================

  /**
   * Get all payments for admin management (Admin/Editor only)
   */
  async getAllPaymentsForAdmin(
    query: AdminPaymentQueryDto = {},
  ): Promise<PaginatedAdminPaymentResponse> {
    try {
      const params = new URLSearchParams();
      if (query.page) params.append("page", query.page.toString());
      if (query.limit) params.append("limit", query.limit.toString());
      if (query.status) params.append("status", query.status);
      if (query.entity_type) params.append("entity_type", query.entity_type);
      if (query.search) params.append("search", query.search);

      const response = await this.api.get<PaginatedAdminPaymentResponse>(
        `/payments/admin/all?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error in getAllPaymentsForAdmin:", error);
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Update payment status by admin (Admin/Editor only)
   */
  async updatePaymentStatus(
    paymentId: string,
    dto: UpdatePaymentStatusDto,
  ): Promise<PaymentStatusResponse> {
    try {
      const response = await this.api.patch<PaymentStatusResponse>(
        `/payments/admin/${paymentId}/status`,
        dto,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Get payment statistics for admin dashboard (Admin/Editor only)
   * @param currency - Optional currency filter (NGN or USD)
   */
  async getPaymentStats(
    currency: Currency = Currency.NGN,
  ): Promise<PaymentStatsResponse> {
    try {
      const params = new URLSearchParams();
      params.append("currency", currency);

      const response = await this.api.get<{ data: PaymentStatsResponse }>(
        `/payments/admin/stats?${params.toString()}`,
      );
      // The API returns data wrapped in a data property
      return response.data.data;
    } catch (error) {
      console.error("Error in getPaymentStats:", error);
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  // ============================================
  // Helper Methods for Frontend
  // ============================================

  /**
   * Redirect to Paystack payment page
   */
  redirectToPaystack(authorizationUrl: string): void {
    if (authorizationUrl) {
      window.location.href = authorizationUrl;
    } else {
      throw new Error("Invalid payment URL");
    }
  }

  /**
   * Handle Paystack callback after payment
   * This should be called on your payment callback page
   */
  async handlePaymentCallback(
    reference: string,
  ): Promise<PaymentVerificationResponse> {
    if (!reference) {
      throw new Error("Payment reference not found");
    }
    return this.verifyPayment({ reference });
  }

  /**
   * Format currency based on the currency code
   */
  formatCurrency(amount: number, currency: Currency = Currency.NGN): string {
    return new Intl.NumberFormat(
      currency === Currency.NGN ? "en-NG" : "en-US",
      {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
      },
    ).format(amount);
  }

  /**
   * Get currency symbol
   */
  getCurrencySymbol(currency: Currency): string {
    return currency === Currency.NGN ? "₦" : "$";
  }
}

export const paymentService = new PaymentService();
