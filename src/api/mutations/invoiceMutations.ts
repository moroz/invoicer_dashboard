import { INVOICE_DETAILS } from "@api/fragments";
import { Invoice, InvoiceParams, MutationResult } from "@api/interfaces";
import { gql, useMutation } from "@apollo/client";

export const CREATE_INVOICE = gql`
  ${INVOICE_DETAILS}

  mutation CreateInvoice($params: InvoiceParams!) {
    result: createInvoice(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        ...InvoiceDetails
      }
    }
  }
`;

export interface CreateInvoiceMutationResult {
  result: MutationResult<Invoice>;
}

export interface CreateInvoiceMutationVariables {
  params: InvoiceParams;
}

export const useCreateInvoiceMutation = () =>
  useMutation<CreateInvoiceMutationResult, CreateInvoiceMutationVariables>(
    CREATE_INVOICE
  );
