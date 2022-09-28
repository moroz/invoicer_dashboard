import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { User } from "../interfaces/users";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;

export interface CurrentUserQueryResult {
  currentUser: User | null;
}

export const useCurrentUserQuery = () =>
  useQuery<CurrentUserQueryResult>(CURRENT_USER);
