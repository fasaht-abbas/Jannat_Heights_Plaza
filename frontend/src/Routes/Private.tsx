import React, { useEffect, useState } from "react";
import { handleError, protectedApi } from "../utils/axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";
import Loading from "../components/reuseables/Loading";
import UnAuthorizedPage from "../components/reuseables/UnAuthorizedPage";
const Private = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const checkUser = async () => {
    try {
      const { data } = await protectedApi.get("/api/v1/auth/protected");
      if (data?.success) {
        setLoading(false);
        setAuthorized(true);
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
      setAuthorized(false);
    }
  };

  useEffect(() => {
    const cleanup = () => {};
    if (token) {
      checkUser();
    }
    return cleanup;
  }, [token]);

  return loading ? <Loading /> : authorized ? <Outlet /> : <UnAuthorizedPage />;
};

export default Private;
