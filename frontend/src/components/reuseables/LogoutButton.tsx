import React from "react";
import Button from "./Button";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { appDispatch } from "../../redux/store";
import Navicon from "./Navicon";
import { api, handleError } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch: appDispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const { data } = await api.post(
        "/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(logout());
      navigate("/login");
      toast.success("user Logged Out");
    } catch (error) {
      handleError(error);
    }
  };
  return <Navicon onClickHandler={handleLogout} label="Logout" />;
};

export default LogoutButton;
