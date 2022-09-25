import React from "react";
import ReactDOM from "react-dom/client";
import client from "./api/client";
import { ApolloProvider } from "@apollo/client";
import "./css/app.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "@views/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
