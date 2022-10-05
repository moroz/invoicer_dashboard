import { useSignOutMutation } from "@api/mutations/sessionMutations";
import { useCurrentUserQuery } from "@api/queries/sessionQueries";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

const useAuth = () => {
  const { data, loading } = useCurrentUserQuery();
  const user = data?.currentUser;
  const [signOutMutation] = useSignOutMutation();
  const client = useApolloClient();

  const signOut = useCallback(async () => {
    const result = await signOutMutation();
    client.clearStore();
    return result;
  }, [signOutMutation]);

  return {
    user,
    loading,
    signOut
  };
};

export default useAuth;
