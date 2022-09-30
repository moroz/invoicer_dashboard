import ClientIndex from "@views/clients/ClientIndex";
import Dashboard from "@views/Dashboard";
import LoginPage from "@views/unauthenticated/LoginPage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "@views/NotFound";
import ClientDetails from "@views/clients/ClientDetails";
import NewClient from "@views/clients/NewClient";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/clients" element={<ClientIndex />} />
      <Route path="/clients/new" element={<NewClient />} />
      <Route path="/clients/:id" element={<ClientDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
