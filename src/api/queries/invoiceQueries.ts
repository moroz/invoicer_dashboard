import { INVOICE_DETAILS, PAGINATION_FIELDS } from "@api/fragments";
import {
  Invoice,
  PaginationPage,
  StandardPaginationParams
} from "@api/interfaces";
import { gql, useQuery } from "@apollo/client";

export const PAGINATE_INVOICES = gql`
  ${PAGINATION_FIELDS}

  query PaginateInvoices($params: InvoiceFilterParams!) {
    result: paginateInvoices(params: $params) {
      pageInfo {
        ...PaginationFields
      }
      data {
        id
        invoiceNo
        currency
        grossTotal
        buyer {
          id
          name
          vatId
        }
      }
    }
  }
`;

export interface InvoiceFilterParams extends StandardPaginationParams {}

export interface PaginateInvoicesQueryResult {
  result: PaginationPage<Invoice>;
}

export interface PaginateInvoicesQueryVariables {
  params: InvoiceFilterParams;
}

export const usePaginateInvoicesQuery = (params: InvoiceFilterParams) =>
  useQuery<PaginateInvoicesQueryResult, PaginateInvoicesQueryVariables>(
    PAGINATE_INVOICES,
    { variables: { params }, fetchPolicy: "cache-and-network" }
  );

export const GET_INVOICE = gql`
  ${INVOICE_DETAILS}

  query GetInvoice($id: ID!) {
    invoice(id: $id) {
      ...InvoiceDetails
    }
  }
`;

export interface GetInvoiceQueryResult {
  invoice: Invoice | null;
}

export interface GetInvoiceQueryVariables {
  id: string;
}

export const useGetInvoiceQuery = (id: string | undefined) =>
  useQuery<GetInvoiceQueryResult, GetInvoiceQueryVariables>(GET_INVOICE, {
    variables: { id: id! },
    skip: !id
  });
