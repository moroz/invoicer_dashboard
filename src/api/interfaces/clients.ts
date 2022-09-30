import { StandardPaginationParams } from "./common";

export interface Client {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  vatId: string;
  postalCode: string;
  insertedAt: string;
  updatedAt: string;
}

export interface ClientParams {
  name: string;
  addressLine: string;
  city: string;
  vatId: string;
  postalCode: string;
}

export interface ClientFilterParams extends StandardPaginationParams {}
