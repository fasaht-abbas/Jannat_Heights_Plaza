import React, { useState } from "react";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { appDispatch } from "../../redux/store";
import Navicon from "./Navicon";
import { api, handleError } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
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
      if (data?.success) {
        dispatch(logout());
        navigate("/login");
        toast.success("User Logged Out");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const confirmLogout = () => {
    setShowModal(false);
    handleLogout();
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navicon onClickHandler={() => setShowModal(true)} label="Logout" />

      {/* Modal Component */}
      {showModal && (
        <div className="  fixed inset-0 flex items-center justify-center z-50 bg-secondary bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-fit h-fit ">
            <h2 className="text-xl mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end space-x-2">
              <button
                className="px-1 py-2 bg-gray-300 rounded  hover:bg-gray-400"
                onClick={cancelLogout}
              >
                No
              </button>
              <button
                className="px-1 py-2 bg-red-500 text-danger rounded hover:bg-red-600"
                onClick={confirmLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
