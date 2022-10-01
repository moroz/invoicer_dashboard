import ClientIndex from "@views/clients/ClientIndex";
import Dashboard from "@views/Dashboard";
import LoginPage from "@views/unauthenticated/LoginPage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "@views/NotFound";
import ClientDetails from "@views/clients/ClientDetails";
import NewClient from "@views/clients/NewClient";
import InvoiceIndex from "@views/invoices/InvoiceIndex";
import NewInvoice from "@views/invoices/NewInvoice";
import InvoiceDetails from "@views/invoices/InvoiceDetails";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/clients" element={<ClientIndex />} />
      <Route path="/clients/new" element={<NewClient />} />
      <Route path="/clients/:id" element={<ClientDetails />} />
      <Route path="/invoices" element={<InvoiceIndex />} />
      <Route path="/invoices/:id" element={<InvoiceDetails />} />
      <Route path="/invoices/new" element={<NewInvoice />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
