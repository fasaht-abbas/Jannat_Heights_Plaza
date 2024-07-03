import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";
import UnAuthorizedPage from "../components/reuseables/UnAuthorizedPage";

const AdminRoute = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  return userData?.role === "admin" ? <Outlet /> : <UnAuthorizedPage />;
};

export default AdminRoute;
