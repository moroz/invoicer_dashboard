import { NBPRate } from "@api/nbpClient";
import { Client, ClientParams } from "./clients";
import { LineItem, LineItemParams } from "./lineItems";

export const PAYMENT_METHODS = {
  TRANSFER: "Bank transfer",
  CASH: "Cash",
  CREDIT_CARD: "Credit card",
  PAYMENT_CARD: "Debit card"
};

export type PaymentMethod = keyof typeof PAYMENT_METHODS;

export const INVOICE_TYPES = {
  INVOICE: "Invoice",
  INVOICE_RC: "Invoice (reverse charge)",
  VAT_INVOICE: "VAT Invoice"
};

export type InvoiceType = keyof typeof INVOICE_TYPES;

export const LOCALES = {
  PL: "Polish",
  EN: "English",
  DE: "German"
};

export type Locale = keyof typeof LOCALES;
export type LocaleTuple = [Locale] | [Locale, Locale];

export const CURRENCIES = {
  PLN: "Polish zloty",
  EUR: "Euro",
  USD: "US dollar",
  TWD: "New Taiwan Dollar",
  GBP: "Pound sterling"
};

export type Currency = keyof typeof CURRENCIES;

export interface Invoice {
  __typename?: "Invoice";
  id: string;
  invoiceNo: string;
  dateOfIssue: string;
  dateOfSale: string;
  placeOfIssue: string;
  grossTotal: string;
  buyer: Client;
  seller: Client;
  locale: LocaleTuple;
  currency: Currency;
  paymentMethod: PaymentMethod;
  invoiceType: InvoiceType;
  insertedAt: string;
  updatedAt: string;
  lineItems: LineItem[];
  calculateExchangeRate?: boolean;
  bankRate?: NBPRate;
}

export interface InvoiceParams {
  invoiceNo: string;
  dateOfIssue: string;
  dateOfSale: string;
  placeOfIssue: string;
  paymentMethod: PaymentMethod;
  invoiceType: InvoiceType;
  locale: LocaleTuple;
  currency: Currency;
  exchangeRateEffectiveDate?: string;
  calculateExchangeRate?: boolean;
  bankRate?: NBPRate;

  seller?: ClientParams | null;
  buyer?: ClientParams | null;

  buyerId?: string | null;
  sellerId?: string | null;

  lineItems: LineItemParams[];
}
