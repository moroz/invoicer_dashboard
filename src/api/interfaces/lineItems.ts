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

export interface LineItemParams {
  quantity: number;
  description: string;
  unit?: string | null;
  unitNetPrice: string | number;
  vatRate: VatRate;
}
