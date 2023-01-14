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

export const UPDATE_INVOICE = gql`
  ${INVOICE_DETAILS}

  mutation UpdateInvoice($id: ID!, $params: InvoiceParams!) {
    result: updateInvoice(id: $id, params: $params) {
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

export interface UpdateInvoiceMutationResult {
  result: MutationResult<Invoice>;
}

export interface UpdateInvoiceMutationVariables {
  id: string;
  params: InvoiceParams;
}

export const useUpdateInvoiceMutation = () =>
  useMutation<UpdateInvoiceMutationResult, UpdateInvoiceMutationVariables>(
    UPDATE_INVOICE
  );

export const DELETE_INVOICE = gql`
  mutation DeleteInvoice($id: ID!) {
    result: deleteInvoice(id: $id) {
      success
      errors {
        key
        message
      }
    }
  }
`;

export interface DeleteInvoiceMutationResult {
  result: MutationResult<null>;
}

export interface DeleteInvoiceMutationVariables {
  id: string;
}

export const useDeleteInvoiceMutation = (id: string) =>
  useMutation<DeleteInvoiceMutationResult, DeleteInvoiceMutationVariables>(
    DELETE_INVOICE,
    {
      variables: {
        id
      },
      refetchQueries: ["PaginateInvoices"],
      awaitRefetchQueries: true
    }
  );
