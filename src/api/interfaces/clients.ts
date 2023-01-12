import { StandardPaginationParams } from "./common";

enum TemplateType {
  Buyer = "BUYER",
  Seller = "SELLER"
}

export type ClientTemplateType = TemplateType | `${TemplateType}`;

export interface Client {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  vatId: string;
  postalCode: string;
  bankName: string | null;
  bicCode: string | null;
  accountNo: string | null;
  templateType: ClientTemplateType;
  isDefaultTemplate: boolean;
  insertedAt: string;
  updatedAt: string;
}

export interface ClientOptionItem extends Client {
  value: string;
}

export interface ClientParams {
  name: string;
  addressLine: string;
  city: string;
  vatId: string;
  postalCode: string;
  bankName?: string | null;
  bicCode?: string | null;
  accountNo?: string | null;
  templateType: ClientTemplateType;
  isDefaultTemplate: boolean;
}

export interface ClientFilterParams extends StandardPaginationParams {
  templateType?: ClientTemplateType | null;
}
