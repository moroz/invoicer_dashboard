export interface LineItemParams {
  quantity: number;
  description: string;
  unit?: string | null;
  unitNetPrice: string | number;
}
