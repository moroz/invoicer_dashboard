import {
  VAT_RATES,
  INVOICE_TYPES,
  PAYMENT_METHODS,
  LOCALES,
  CURRENCIES
} from "@api/interfaces";
import makeSelectComponent from "./makeSelectComponent";

export const InvoiceTypeSelect = makeSelectComponent({
  options: INVOICE_TYPES,
  label: "Invoice type:"
});

export const PaymentMethodSelect = makeSelectComponent({
  options: PAYMENT_METHODS,
  label: "Payment method:"
});

export const VatRateSelect = makeSelectComponent({
  options: VAT_RATES
});

export const LocaleSelect = makeSelectComponent({
  options: LOCALES,
  label: "Language:"
});

export const CurrencySelect = makeSelectComponent({
  options: CURRENCIES,
  label: "Currency:"
});
