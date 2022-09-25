import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import type { MutationResult } from "../interfaces/common";
import type { User } from "../interfaces/users";

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      data {
        id
        email
      }
    }
  }
`;

export interface SignInMutationResult {
  signIn: MutationResult<User>;
}

export interface SignInMutationVariables {
  email: string;
  password: string;
}

export const useSignInMutation = () =>
  useMutation<SignInMutationResult, SignInMutationVariables>(SIGN_IN, {
    refetchQueries: ["CurrentUser"],
    awaitRefetchQueries: true
  });

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const useSignOutMutation = () => {
  return useMutation(SIGN_OUT, {
    refetchQueries: ["CurrentUser"],
    awaitRefetchQueries: true
  });
};
