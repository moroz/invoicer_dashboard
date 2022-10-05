import { MutationResult, SignUpParams, User } from "@api/interfaces";
import { gql, useMutation } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($params: SignUpParams!) {
    result: signUp(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        email
      }
    }
  }
`;

export interface SignUpMutationResult {
  result: MutationResult<User>;
}
export interface SignUpMutationVariables {
  params: SignUpParams;
}
export const useSignUpMutation = () =>
  useMutation<SignUpMutationResult, SignUpMutationVariables>(SIGN_UP);
