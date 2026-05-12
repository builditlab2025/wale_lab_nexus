// Format numbers with commas (e.g., 2,300,454)
export const formatNumberWithCommas = (num: number): string => {
  const validNumber = isNaN(num) || num === null || num === undefined ? 0 : num;
  return validNumber.toLocaleString();
};

// Format date with time
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format currency
export const formatCurrency = (amount: number, currency?: string) => {
  // Use the appropriate locale based on currency
  const locale = currency === "USD" ? "en-US" : "en-NG";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency || "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};
