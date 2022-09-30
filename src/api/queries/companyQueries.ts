import { PAGINATION_FIELDS } from "@api/fragments";
import { Company, CompanyFilterParams, PaginationPage } from "@api/interfaces";
import { gql, useQuery } from "@apollo/client";

export const PAGINATE_COMPANIES = gql`
  ${PAGINATION_FIELDS}

  query PaginateCompanies($params: CompanyFilterParams!) {
    result: paginateCompanies(params: $params) {
      pageInfo {
        ...PaginationFields
      }
      data {
        id
        name
        vatId
      }
    }
  }
`;

export interface PaginateCompaniesQueryResult {
  result: PaginationPage<Company>;
}

export interface PaginateCompaniesQueryVariables {
  params: CompanyFilterParams;
}

export const usePaginateCompaniesQuery = (params: CompanyFilterParams) =>
  useQuery<PaginateCompaniesQueryResult, PaginateCompaniesQueryVariables>(
    PAGINATE_COMPANIES,
    { variables: { params } }
  );
