import Dashboard from "@views/Dashboard";
import LoginPage from "@views/unauthenticated/LoginPage";
import React from "react";
import { Routes, Route } from "react-router-dom";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
