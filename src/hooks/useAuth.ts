import { useSignOutMutation } from "@api/mutations/sessionMutations";
import { useCurrentUserQuery } from "@api/queries/sessionQueries";
import { useCallback } from "react";

const useAuth = () => {
  const { data, loading } = useCurrentUserQuery();
  const user = data?.currentUser;
  const [signOutMutation] = useSignOutMutation();

  const signOut = useCallback(() => {
    return signOutMutation();
  }, [signOutMutation]);

  return {
    user,
    loading,
    signOut
  };
};

export default useAuth;
