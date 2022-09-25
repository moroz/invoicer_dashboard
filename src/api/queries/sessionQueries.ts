import { signOutMutation } from "@api/mutations/sessionMutations";
import gql from "graphql-tag";
import { query } from "svelte-apollo";
import { writable } from "svelte/store";
import type { User } from "../interfaces/users";

export const CURRENT_USER = gql`
  {
    currentUser {
      id
      email
    }
  }
`;

export interface CurrentUserQueryResult {
  currentUser: User | null;
}

export const currentUserQuery = () =>
  query<CurrentUserQueryResult>(CURRENT_USER);

const _authStore = () => {
  let doSignOut;

  const { set, subscribe } = writable(null, () => {
    const store = currentUserQuery();
    doSignOut = signOutMutation();

    store.subscribe((value) => {
      const user = value?.data?.currentUser ?? null;
      set({
        loading: value.loading,
        user
      });
    });
  });

  const signOut = async () => {
    await doSignOut({});
    set({ loading: false, user: null });
  };

  return {
    subscribe,
    signOut
  };
};

export const authStore = _authStore();
