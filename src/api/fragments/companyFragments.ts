import { gql } from "@apollo/client";

export const COMPANY_DETAILS = gql`
  fragment CompanyDetails on Company {
    id
    name
    vatId
    addressLine
    city
    postalCode
    insertedAt
    updatedAt
  }
`;
