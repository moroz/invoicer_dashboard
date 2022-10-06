export const VAT_RATES = {
  NP: "np.",
  ZW: "zw.",
  OO: "o.o.",
  ZERO: "0%",
  FIVE: "5%",
  SEVEN: "7%",
  EIGHT: "8%",
  TWENTY_THREE: "23%"
};

export type VatRate = keyof typeof VAT_RATES;

export const VAT_RATE_NUMBERS: Record<VatRate, number> = {
  NP: 0,
  ZW: 0,
  OO: 0,
  ZERO: 0,
  FIVE: 0.05,
  SEVEN: 0.07,
  EIGHT: 0.08,
  TWENTY_THREE: 0.23
};

export interface LineItemParams {
  quantity: number;
  description: string;
  unit?: string | null;
  unitNetPrice: string | number;
  vatRate: VatRate;
}

export interface LineItem extends LineItemParams {
  id: string;
}
