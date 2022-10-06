import { gql } from "@apollo/client";
import { CLIENT_DETAILS } from "./clientFragments";

export const LINE_ITEM_DETAILS = gql`
  fragment LineItemDetails on LineItem {
    id
    description
    unitNetPrice
    unit
    vatRate
    quantity
  }
`;

export const INVOICE_DETAILS = gql`
  ${CLIENT_DETAILS}
  ${LINE_ITEM_DETAILS}

  fragment InvoiceDetails on Invoice {
    id
    invoiceNo
    currency
    dateOfSale
    dateOfIssue
    placeOfIssue
    invoiceType
    locale
    buyer {
      ...ClientDetails
    }
    seller {
      ...ClientDetails
      accountNo
      bicCode
      bankName
    }
    lineItems {
      ...LineItemDetails
    }
  }
`;
