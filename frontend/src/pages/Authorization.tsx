import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appDispatch } from "../redux/store";
import { api, handleError } from "../utils/axios";
import { login } from "../redux/authSlice";
import Loading from "../components/reuseables/Loading";
import { useLocation } from "react-router-dom";

const Authorization = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const dispatch: appDispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const email = queryParams.get("email");
  const secret = queryParams.get("secret");

  const getUser = async () => {
    console.log("Fetching user with secret:", secret); // Add this line for logging
    setLoading(true);
    try {
      const { data } = await api.post("/api/v1/auth/get-user", { secret });

      if (data?.success) {
        dispatch(
          login({
            token: secret as string,
            userData: {
              name: data?.returnUser?.name,
              _id: data?.returnUser?._id,
              email: data?.returnUser?.email,
              googleId: data?.returnUser?.googleId,
              role: data?.returnUser?.role,
              profilePhoto: data?.returnUser?.profilePhoto,
              address: data?.returnUser?.address,
              phone: data?.returnUser?.phone,
              CNIC: data?.returnUser?.CNIC,
              verifiedEmail: data?.returnUser?.verifiedEmail,
            },
          })
        );
        if (!data?.returnUser?.verifiedEmail) {
          navigate("/private/verify-email");
        } else {
          navigate("/", { replace: true });
        }
        setAuthorized(true);
      }
    } catch (error) {
      handleError(error);
      setAuthorized(false);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return loading ? (
    <Loading />
  ) : authorized ? (
    <>USER AUTHORIZED</>
  ) : (
    <>UNAUTHORIZED USER</>
  );
};

export default Authorization;
