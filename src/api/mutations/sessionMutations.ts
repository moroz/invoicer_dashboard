import gql from "graphql-tag";
import { mutation } from "svelte-apollo";
import { useNavigate } from "svelte-navigator";
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

export const signInMutation = () =>
  mutation<SignInMutationResult, SignInMutationVariables>(SIGN_IN, {
    refetchQueries: ["CurrentUser"],
    awaitRefetchQueries: true
  });

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const signOutMutation = () => {
  return mutation(SIGN_OUT, {
    refetchQueries: ["CurrentUser"],
    awaitRefetchQueries: true
  });
};
