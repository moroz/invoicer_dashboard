import { gql } from "@apollo/client";

export const INVOICE_DETAILS = gql`
  fragment InvoiceDetails on Invoice {
    id
    invoiceNo
    currency
  }
`;
