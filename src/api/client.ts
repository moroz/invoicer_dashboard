import { ApolloClient, InMemoryCache } from "@apollo/client/core";

export const VITE_GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/api";

export const API_BASE_URL = new URL(VITE_GRAPHQL_URL).origin;

const client = new ApolloClient({
  uri: VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
  credentials: "include"
});

export default client;
