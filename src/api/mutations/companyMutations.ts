import { MutationResult } from "@api/interfaces/common";
import { Company, CompanyParams } from "@api/interfaces/companies";
import { gql, useMutation } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany($params: CompanyParams!) {
    result: createCompany(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
      }
    }
  }
`;

export interface CreateCompanyMutationResult {
  result: MutationResult<Company>;
}

export interface CreateCompanyMutationVariables {
  params: CompanyParams;
}

export const useCreateCompanyMutation = () =>
  useMutation<CreateCompanyMutationResult, CreateCompanyMutationVariables>(
    CREATE_COMPANY
  );
