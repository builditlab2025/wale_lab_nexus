//PDF GEN - Single page receipt with centered badge and footer
import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";
import {
  PaymentHistoryItem,
  PaymentStatus,
  PaymentEntityType,
} from "../../types/payment/payment.types";

const LOGO_URL =
  "https://staging-wu.s3.eu-north-1.amazonaws.com/public/1777106264559-29619064.png";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
  }
}

interface TableRow {
  label: string;
  value: string;
}

interface ColorScheme {
  primary: {
    deep: string;
    light: string;
    dark: string;
    bg: string;
  };
  orange: {
    main: string;
    dark: string;
    light: string;
  };
  gray: {
    light: string;
    medium: string;
    dark: string;
    darker: string;
    border: string;
  };
}

export class ReceiptGenerator {
  private doc: jsPDF;
  private currentY: number = 15;
  private readonly pageWidth: number;
  private readonly margin: number = 15;
  private readonly pageHeight: number;

  private readonly colors: ColorScheme = {
    primary: {
      deep: "#018c01",
      light: "#73d45c",
      dark: "#003c00",
      bg: "#f2ffea",
    },
    orange: {
      main: "#f1b22e",
      dark: "#b06b16",
      light: "#fcc45c",
    },
    gray: {
      light: "#f9fafb",
      medium: "#9ca3af",
      dark: "#374151",
      darker: "#1f2937",
      border: "#e5e7eb",
    },
  };

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  async generateReceipt(payment: PaymentHistoryItem): Promise<void> {
    try {
      this.doc = new jsPDF();
      this.currentY = 15;

      await this.addHeader();
      this.addReceiptTitle();
      this.addReceiptInfo(payment);
      this.addPaymentDetails(payment);
      this.addTransactionDetails(payment);
      this.addSchoolFooter();

      const fileName = `wale_lab_${payment.entity_type?.toLowerCase()}_receipt_${payment.id.substring(0, 8)}.pdf`;
      this.doc.save(fileName);
    } catch (error) {
      console.error("Error generating receipt:", error);
      throw error;
    }
  }

  private async addHeader(): Promise<void> {
    const logoSize = 28;
    const logoX = this.margin;
    const logoY = this.currentY;

    try {
      const imgResponse = await fetch(LOGO_URL);
      const imgBlob = await imgResponse.blob();
      const reader = new FileReader();

      const logoPromise = new Promise<void>((resolve) => {
        reader.onloadend = () => {
          const imgData = reader.result as string;
          this.doc.addImage(imgData, "PNG", logoX, logoY, logoSize, logoSize);
          resolve();
        };
      });

      reader.readAsDataURL(imgBlob);
      await logoPromise;
    } catch {
      this.doc.setFontSize(16);
      this.doc.setTextColor(this.colors.primary.deep);
      this.doc.setFont("helvetica", "bold");
      this.doc.text("WALE LAB", this.margin, this.currentY + 10);
      this.doc.setFontSize(9);
      this.doc.setTextColor(this.colors.gray.dark);
      this.doc.text("University", this.margin, this.currentY + 18);
    }

    const companyInfoStartY = this.currentY + 3;
    const rightX = this.pageWidth - this.margin;

    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(this.colors.primary.dark);
    this.doc.text("Wale Lab University", rightX, companyInfoStartY, {
      align: "right",
    });

    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(this.colors.gray.dark);

    const companyDetails: string[] = [
      "123 Education Street, Lagos, Nigeria",
      "Tel: +234 (0) 808 881 8372",
      "Email: walelab@wale.university",
    ];

    companyDetails.forEach((info: string, index: number) => {
      this.doc.text(info, rightX, companyInfoStartY + 5 + index * 4, {
        align: "right",
      });
    });

    const maxY = Math.max(
      logoY + logoSize,
      companyInfoStartY + 5 + companyDetails.length * 4,
    );
    this.currentY = maxY + 6;

    this.doc.setDrawColor(this.colors.primary.deep);
    this.doc.setLineWidth(1);
    this.doc.line(
      this.margin,
      this.currentY,
      this.pageWidth - this.margin,
      this.currentY,
    );

    this.doc.setDrawColor(this.colors.orange.main);
    this.doc.setLineWidth(0.3);
    this.doc.line(
      this.margin,
      this.currentY + 0.8,
      this.pageWidth - this.margin,
      this.currentY + 0.8,
    );

    this.currentY += 8; // Reduced from 10
  }

  private addReceiptTitle(): void {
    const centerX = this.pageWidth / 2;

    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    const titleText = "OFFICIAL RECEIPT";
    const textWidth = this.doc.getTextWidth(titleText);
    const boxWidth = textWidth + 16;
    const boxX = centerX - boxWidth / 2;

    this.doc.setFillColor(this.colors.primary.bg);
    this.doc.roundedRect(boxX, this.currentY - 3, boxWidth, 9, 2, 2, "F");

    this.doc.setTextColor(this.colors.primary.dark);
    this.doc.text(titleText, centerX, this.currentY + 3, {
      align: "center",
    });

    this.currentY += 10; // Reduced from 12
  }

  private addReceiptInfo(payment: PaymentHistoryItem): void {
    const receiptNumber = `RCPT-${payment.id.substring(0, 8).toUpperCase()}`;
    const date = new Date(payment.paid_at || payment.created_at || new Date());
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const boxHeight = 35; // Reduced from 38
    this.doc.setDrawColor(this.colors.gray.medium);
    this.doc.setFillColor(this.colors.gray.light);
    this.doc.roundedRect(
      this.margin,
      this.currentY,
      this.pageWidth - this.margin * 2,
      boxHeight,
      3,
      3,
      "FD",
    );

    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(this.colors.gray.darker);
    this.doc.text("RECEIPT NO:", this.margin + 8, this.currentY + 9);
    this.doc.text("DATE:", this.margin + 8, this.currentY + 18);
    this.doc.text("TIME:", this.margin + 8, this.currentY + 27);

    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(this.colors.gray.dark);
    this.doc.text(receiptNumber, this.margin + 45, this.currentY + 9);
    this.doc.text(formattedDate, this.margin + 45, this.currentY + 18);
    this.doc.text(formattedTime, this.margin + 45, this.currentY + 27);

    // Fixed: Centered status badge with proper sizing and margin from border
    const statusColor = this.getStatusColor(payment.status);
    const statusText = this.getStatusText(payment.status);

    // Calculate exact text width and badge size
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "bold");
    const textWidth = this.doc.getTextWidth(statusText);
    const padding = 10; // Reduced padding for smaller badge
    const badgeWidth = textWidth + padding;
    const badgeHeight = 9; // Reduced from 10

    // Position badge on the right side with margin from border
    const badgeMargin = 5; // Margin from right border
    const badgeX = this.pageWidth - this.margin - badgeWidth - badgeMargin;
    const badgeY = this.currentY + 6;

    // Draw badge background
    this.doc.setFillColor(statusColor);
    this.doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 2, 2, "F");

    // Draw text exactly centered in badge
    this.doc.setTextColor("#ffffff");
    this.doc.text(
      statusText,
      badgeX + badgeWidth / 2,
      badgeY + badgeHeight / 2 + 1.5,
      { align: "center" },
    );

    this.currentY += boxHeight + 8; // Reduced from 10
  }

  private addPaymentDetails(payment: PaymentHistoryItem): void {
    this.doc.setDrawColor(this.colors.primary.deep);
    this.doc.setLineWidth(1.5);
    this.doc.line(
      this.margin,
      this.currentY + 3,
      this.pageWidth - this.margin,
      this.currentY + 3,
    );

    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(this.colors.primary.dark);

    const textStr = "PAYMENT DETAILS";
    const textWidth = this.doc.getTextWidth(textStr);
    const textX = this.margin + 5;
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(textX - 2, this.currentY, textWidth + 4, 5.5, "F");

    this.doc.text(textStr, textX, this.currentY + 3.5);
    this.currentY += 10;

    const tableRows: TableRow[] = this.buildPaymentDetailsRows(payment);

    autoTable(this.doc, {
      startY: this.currentY,
      body: tableRows.map((row) => [row.label, row.value]),
      theme: "plain",
      styles: {
        fontSize: 8.5, // Reduced from 9
        cellPadding: 3.5, // Reduced from 4
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
      columnStyles: {
        0: {
          fontStyle: "bold",
          cellWidth: 48, // Reduced from 50
          textColor: [55, 65, 81],
          cellPadding: { left: 5, top: 3, bottom: 3, right: 3 },
        },
        1: {
          cellWidth: "auto",
          textColor: [31, 41, 55],
          cellPadding: { left: 3, top: 3, bottom: 3, right: 5 },
        },
      },
      margin: { left: this.margin, right: this.margin },
    } as UserOptions);

    if (this.doc.lastAutoTable) {
      this.currentY = this.doc.lastAutoTable.finalY + 8; // Reduced from 10
    }
  }

  private buildPaymentDetailsRows(payment: PaymentHistoryItem): TableRow[] {
    const rows: TableRow[] = [
      {
        label: "Payment For:",
        value: this.getPaymentTypeLabel(payment.entity_type),
      },
      {
        label: "Item:",
        value: payment.entity_title || "N/A",
      },
      {
        label: "Payment Type:",
        value: payment.payment_type || "TUITION",
      },
    ];

    if (payment.installment_number && payment.total_installments) {
      rows.push({
        label: "Installment:",
        value: `${payment.installment_number} of ${payment.total_installments}`,
      });
    }

    if (payment.subtotal && payment.subtotal > 0) {
      rows.push({
        label: "Subtotal:",
        value: this.formatCurrency(payment.subtotal, payment.currency),
      });
    }

    if (payment.discount_applied && payment.discount_applied > 0) {
      rows.push({
        label: "Discount Applied:",
        value: `-${this.formatCurrency(payment.discount_applied, payment.currency)}`,
      });
    }

    if (payment.coupon_applied) {
      rows.push({
        label: "Coupon Code:",
        value: payment.coupon_applied,
      });
    }

    if (payment.vat_rate && payment.vat_rate > 0) {
      const vatAmount =
        payment.vat_amount || (payment.amount * payment.vat_rate) / 100;
      rows.push({
        label: `${payment.tax_name || "VAT"} (${payment.vat_rate}%):`,
        value: this.formatCurrency(vatAmount, payment.currency),
      });
    }

    rows.push({
      label: "Total Amount:",
      value: this.formatCurrency(payment.amount, payment.currency),
    });

    if (
      payment.amount_paid &&
      payment.amount_paid > 0 &&
      payment.amount_paid !== payment.amount
    ) {
      rows.push({
        label: "Amount Paid:",
        value: this.formatCurrency(payment.amount_paid, payment.currency),
      });

      const remainingAmount = payment.amount - payment.amount_paid;
      rows.push({
        label: "Remaining Balance:",
        value: this.formatCurrency(remainingAmount, payment.currency),
      });
    }

    return rows;
  }

  private addTransactionDetails(payment: PaymentHistoryItem): void {
    if (!payment.payment_reference && payment.status !== PaymentStatus.PAID) {
      return;
    }

    this.doc.setDrawColor(this.colors.primary.deep);
    this.doc.setLineWidth(1.5);
    this.doc.line(
      this.margin,
      this.currentY + 3,
      this.pageWidth - this.margin,
      this.currentY + 3,
    );

    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(this.colors.primary.dark);

    const textStr = "TRANSACTION DETAILS";
    const textWidth = this.doc.getTextWidth(textStr);
    const textX = this.margin + 5;
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(textX - 2, this.currentY, textWidth + 4, 5.5, "F");

    this.doc.text(textStr, textX, this.currentY + 3.5);
    this.currentY += 10;

    const tableRows: TableRow[] = [];

    if (payment.payment_reference) {
      tableRows.push({
        label: "Transaction Reference:",
        value: payment.payment_reference,
      });
    }

    tableRows.push({
      label: "Transaction Date:",
      value: this.formatDate(payment.paid_at || payment.created_at),
    });

    tableRows.push({
      label: "Payment Status:",
      value: this.getStatusText(payment.status),
    });

    if (payment.due_date && payment.status !== PaymentStatus.PAID) {
      tableRows.push({
        label: "Due Date:",
        value: this.formatDate(payment.due_date),
      });
    }

    if (tableRows.length > 0) {
      autoTable(this.doc, {
        startY: this.currentY,
        body: tableRows.map((row) => [row.label, row.value]),
        theme: "plain",
        styles: {
          fontSize: 8.5,
          cellPadding: 3.5,
          lineColor: [220, 220, 220],
          lineWidth: 0.1,
        },
        alternateRowStyles: {
          fillColor: [249, 250, 251],
        },
        columnStyles: {
          0: {
            fontStyle: "bold",
            cellWidth: 48,
            textColor: [55, 65, 81],
            cellPadding: { left: 5, top: 3, bottom: 3, right: 3 },
          },
          1: {
            cellWidth: "auto",
            textColor: [31, 41, 55],
            cellPadding: { left: 3, top: 3, bottom: 3, right: 5 },
          },
        },
        margin: { left: this.margin, right: this.margin },
      } as UserOptions);

      if (this.doc.lastAutoTable) {
        this.currentY = this.doc.lastAutoTable.finalY + 8;
      }
    }
  }

  private addSchoolFooter(): void {
    const footerY = this.pageHeight - 18;

    // Add decorative lines
    this.doc.setDrawColor(this.colors.orange.main);
    this.doc.setLineWidth(0.3);
    this.doc.line(
      this.margin,
      footerY - 3,
      this.pageWidth - this.margin,
      footerY - 3,
    );

    this.doc.setDrawColor(this.colors.primary.deep);
    this.doc.setLineWidth(0.8);
    this.doc.line(
      this.margin,
      footerY - 2,
      this.pageWidth - this.margin,
      footerY - 2,
    );

    // Main footer message
    this.doc.setFontSize(7.5);
    this.doc.setFont("helvetica", "italic");
    this.doc.setTextColor(this.colors.gray.dark);
    this.doc.text(
      "Thank you for your payment! This is an official receipt issued by Wale Lab University.",
      this.pageWidth / 2,
      footerY + 4,
      { align: "center" },
    );

    // Additional footer info
    this.doc.setFontSize(6);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(this.colors.gray.medium);
    this.doc.text(
      "This is a computer-generated receipt and requires no signature. Please retain for your records.",
      this.pageWidth / 2,
      footerY + 8.5,
      { align: "center" },
    );
  }

  private getStatusColor(status: PaymentStatus): string {
    const colorMap: Record<PaymentStatus, string> = {
      [PaymentStatus.PAID]: this.colors.primary.deep,
      [PaymentStatus.PENDING]: this.colors.orange.main,
      [PaymentStatus.FAILED]: this.colors.gray.medium,
      [PaymentStatus.OVERDUE]: this.colors.orange.dark,
      [PaymentStatus.PARTIAL]: this.colors.orange.light,
      [PaymentStatus.REFUNDED]: this.colors.gray.medium, // Add refunded color
    };
    return colorMap[status] || this.colors.gray.medium;
  }

  private getStatusText(status: PaymentStatus): string {
    const statusMap: Record<PaymentStatus, string> = {
      [PaymentStatus.PAID]: "PAID",
      [PaymentStatus.PENDING]: "PENDING",
      [PaymentStatus.FAILED]: "FAILED",
      [PaymentStatus.OVERDUE]: "OVERDUE",
      [PaymentStatus.PARTIAL]: "PARTIAL",
      [PaymentStatus.REFUNDED]: "REFUNDED", // Add refunded text
    };
    return statusMap[status] || "UNKNOWN";
  }

  private getPaymentTypeLabel(type?: PaymentEntityType): string {
    const typeMap: Record<PaymentEntityType, string> = {
      [PaymentEntityType.COURSE]: "Course Enrollment",
      [PaymentEntityType.RESEARCH]: "Research Certificate",
    };
    return type ? typeMap[type] : "Payment";
  }

  private formatDate(date?: Date | string | null): string {
    if (!date) return "N/A";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private formatCurrency(amount: number, currency: string = "NGN"): string {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }
}

export async function generatePaymentReceipt(
  payment: PaymentHistoryItem,
): Promise<void> {
  const generator = new ReceiptGenerator();
  await generator.generateReceipt(payment);
}
