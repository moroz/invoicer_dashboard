import { StandardPaginationParams } from "./common";

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
  insertedAt: string;
  updatedAt: string;
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
}

export interface ClientFilterParams extends StandardPaginationParams {}
