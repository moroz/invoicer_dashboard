import { VatRate, VAT_RATE_NUMBERS } from "@api/interfaces";
import Big from "big.js";

function normalizeNumber(raw: string | number) {
  if (typeof raw === "number") {
    return Big(raw);
  }
  if (typeof raw === "string" && raw) {
    return Big(raw.replace(",", "."));
  }
  return Big(0);
}

export function calculateVatValue(
  unitPrice: string,
  rawQuantity: string,
  vatRate: VatRate
) {
  const unitNetPrice = normalizeNumber(unitPrice);
  const quantity = normalizeNumber(rawQuantity);
  const vatDecimal = normalizeNumber(VAT_RATE_NUMBERS[vatRate]);

  return unitNetPrice.times(quantity).times(vatDecimal);
}

export function calculateGross(
  unitPrice: string,
  rawQuantity: string,
  vatRate: VatRate
) {
  const unitNetPrice = normalizeNumber(unitPrice);
  const quantity = normalizeNumber(rawQuantity);
  const netSubtotal = unitNetPrice.times(quantity);
  return netSubtotal.plus(calculateVatValue(unitPrice, rawQuantity, vatRate));
}

export const sanitizeNumericValue = (value: string) => {
  if (typeof value === "number" && !isNaN(value)) return value;
  return value.replace(",", ".").replace(/[^0-9.]/g, "");
};
