import { gql } from "@apollo/client";

export const PAGINATION_FIELDS = gql`
  fragment PaginationFields on PageInfo {
    page
    pageSize
    totalPages
    totalEntries
  }
`;
