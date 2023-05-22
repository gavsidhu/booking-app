import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = () => {
  const { user } = useUser();

  return user != null ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
