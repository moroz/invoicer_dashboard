import { Client, ClientParams } from "./clients";
import { LineItemParams } from "./lineItems";

export interface Invoice {
  id: string;
  invoiceNo: string;
  grossTotal: string;
  currency: string;
  buyer: Client;
  seller: Client;
  insertedAt: string;
  updatedAt: string;
}

export interface InvoiceParams {
  invoiceNo: string;
  dateOfIssue: string;
  dateOfSale: string;
  placeOfIssue: string;

  seller: ClientParams | null;
  buyer: ClientParams | null;

  buyerId: string | null;
  sellerId: string | null;

  lineItems: LineItemParams[];
}
