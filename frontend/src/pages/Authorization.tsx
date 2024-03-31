import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appDispatch } from "../redux/store";
import { api, handleError } from "../utils/axios";
import { login } from "../redux/authSlice";
import Loading from "../components/reuseables/Loading";
import toast from "react-hot-toast";
const Authorization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const dispatch: appDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const secret = searchParams.get("secret");

  // now we  need to use the library called react persist to persist the state of the redux

  const getUser = async () => {
    try {
      const { data } = await api.post("/api/v1/auth/get-user", {
        secret,
      });
      // jsut make sure that any change also needs to be made in the app.tsx page and
      if (data?.success) {
        dispatch(
          login({
            token: secret,
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
              verifiedPhone: data?.returnUser?.verifiedPhone,
            },
          })
        );
        if (!data?.returnUser?.verified) {
          navigate("/private/verify-email");
        } else {
          navigate("/", { replace: true });
        }
        setAuthorized(true);
        setLoading(false);
      }
    } catch (error) {
      handleError(error);
      setAuthorized(false);
      setLoading(false);
      navigate("/login");
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
