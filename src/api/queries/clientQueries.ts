import {
  CLIENT_DETAILS as CLIENT_DETAILS,
  PAGINATION_FIELDS
} from "@api/fragments";
import {
  Client,
  ClientFilterParams,
  ClientOptionItem,
  ClientTemplateType,
  PaginationPage
} from "@api/interfaces";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useCallback } from "react";

export const PAGINATE_CLIENTS = gql`
  ${PAGINATION_FIELDS}

  query PaginateClients($params: ClientFilterParams!) {
    result: paginateClients(params: $params) {
      pageInfo {
        ...PaginationFields
      }
      data {
        id
        name
        vatId
        templateType
        isDefaultTemplate
      }
    }
  }
`;

export interface PaginateClientsQueryResult {
  result: PaginationPage<Client>;
}

export interface PaginateClientsQueryVariables {
  params: ClientFilterParams;
}

export const usePaginateClientsQuery = (params: ClientFilterParams) =>
  useQuery<PaginateClientsQueryResult, PaginateClientsQueryVariables>(
    PAGINATE_CLIENTS,
    { variables: { params }, fetchPolicy: "cache-and-network" }
  );

export const GET_CLIENT = gql`
  ${CLIENT_DETAILS}

  query GetClient($id: ID!) {
    client(id: $id) {
      ...ClientDetails
    }
  }
`;

export interface GetClientQueryResult {
  client: Client | null;
}

export interface GetClientQueryVariables {
  id: string;
}

export const useGetClientQuery = (id: string | undefined) =>
  useQuery<GetClientQueryResult, GetClientQueryVariables>(GET_CLIENT, {
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "cache-and-network"
  });

export const GET_CLIENT_OPTIONS_QUERY = gql`
  query GetClientOptionsQuery($params: ClientFilterParams!) {
    clients: paginateClients(params: $params) {
      data {
        id
        value: id
        name
        vatId
        addressLine
        city
        postalCode
        isDefaultTemplate
        bicCode
        bankName
        accountNo
      }
    }
  }
`;

export interface GetClientOptionsQueryResult {
  clients: PaginationPage<ClientOptionItem>;
}

export const useGetClientOptionsQuery = (params: ClientFilterParams) =>
  useQuery<GetClientOptionsQueryResult, PaginateClientsQueryVariables>(
    GET_CLIENT_OPTIONS_QUERY,
    { variables: { params }, nextFetchPolicy: "cache-and-network" }
  );
