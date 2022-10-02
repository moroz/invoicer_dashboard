export { default as InputField } from "./InputField";
export { default as RadioGroup } from "./RadioGroup";
export { default as RadioButton } from "./RadioButton";
export { default as FormWrapper } from "./FormWrapper";
export { default as Textarea } from "./Textarea";
export { default as InputGroup } from "./InputGroup";
export { default as Select } from "./Select";

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
  options: VAT_RATES,
  label: "Vat rate:"
});

export const LocaleSelect = makeSelectComponent({
  options: LOCALES,
  label: "Language:"
});

export const CurrencySelect = makeSelectComponent({
  options: CURRENCIES,
  label: "Currency:"
});
