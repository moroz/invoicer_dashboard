import { gql } from "@apollo/client";

export const CLIENT_DETAILS = gql`
  fragment ClientDetails on Client {
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
