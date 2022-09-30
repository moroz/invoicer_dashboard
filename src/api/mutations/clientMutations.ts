import { MutationResult } from "@api/interfaces/common";
import { Client, ClientParams } from "@api/interfaces/clients";
import { gql, useMutation } from "@apollo/client";

export const CREATE_CLIENT = gql`
  mutation CreateClient($params: ClientParams!) {
    result: createClient(params: $params) {
      success
      errors {
        key
        message
        validation
      }
      data {
        id
      }
    }
  }
`;

export interface CreateClientMutationResult {
  result: MutationResult<Client>;
}

export interface CreateClientMutationVariables {
  params: ClientParams;
}

export const useCreateClientMutation = () =>
  useMutation<CreateClientMutationResult, CreateClientMutationVariables>(
    CREATE_CLIENT
  );
