import React from "react";
import ReactDOM from "react-dom/client";
import client from "./api/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import "./css/app.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
