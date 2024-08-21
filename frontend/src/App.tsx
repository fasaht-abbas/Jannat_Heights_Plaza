import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Authorization from "./pages/Authorization";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { refreshing } from "./utils/refreshTokens";
import { useDispatch } from "react-redux";
import { appDispatch } from "./redux/store";
import { logout } from "./redux/authSlice";
import Private from "./Routes/Private";
import Profile from "./pages/Protected/Profile";
import VerifyEmail from "./pages/Protected/verification/VerifyEmail";
import ChangeInformation from "./pages/Protected/ChangeInformation";
import AdminRoute from "./Routes/AdminRoute";
import ManagementRoute from "./Routes/ManagementRoute";
import UnAuthorizedPage from "./components/reuseables/UnAuthorizedPage";
import PasswordReset from "./pages/Protected/verification/PasswordReset";
import ManageTeam from "./pages/Protected/Management/Dashboard/ManageTeam";
import ManageApartment from "./pages/Protected/Management/Dashboard/ManageApartment";
import ManageBookings from "./pages/Protected/Management/Dashboard/ManageBookings";
import Apartments from "./pages/Apartments";
import MyBookings from "./pages/Protected/MyBookings";
import SessionExpiredModal from "./components/SessionExpiredModal";
import { hideModal } from "./redux/Session.Expire";
import Help from "./pages/Help";
import { io } from "socket.io-client";
import { env } from "./utils/validate";

function App() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch: appDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // just make sure that any change also needs to be made in the authorization page and if found a way shift this logic on that page
  const refresh = async () => {
    if (isAuthenticated) {
      refreshing();
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleLoginAgain = () => {
    dispatch(logout());
    dispatch(hideModal());
    window.location.href = "/login";
  };

  // this is for the real time connectivity soket io

  // const socket = io(env.REACT_APP_API_BASE_URL);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to the server");
  //   });
  // }, []);

  return (
    <>
      <SessionExpiredModal
        isOpen={isModalOpen}
        onLoginAgain={handleLoginAgain}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<UnAuthorizedPage />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/help" element={<Help />} />
        <Route path="/authorization" element={<Authorization />} />

        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/private" element={<Private />}>
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-information" element={<ChangeInformation />} />
          <Route path="bookings" element={<MyBookings />} />

          <Route path="r1" element={<AdminRoute />}>
            <Route path="manage-team" element={<ManageTeam />} />
          </Route>

          <Route path="r2" element={<ManagementRoute />}>
            <Route path="manage-apartments" element={<ManageApartment />} />
            <Route path="bookings" element={<ManageBookings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
