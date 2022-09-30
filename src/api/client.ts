import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/api",
  cache: new InMemoryCache(),
  credentials: "include"
});

export default client;
