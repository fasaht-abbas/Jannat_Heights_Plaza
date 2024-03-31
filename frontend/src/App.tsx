import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Appartments from "./pages/Appartments";
import Halls from "./pages/Halls";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Authorization from "./pages/Authorization";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { refreshing } from "./utils/refreshTokens";
import { useDispatch } from "react-redux";
import { appDispatch } from "./redux/store";
import { login, logout } from "./redux/authSlice";
import { handleError } from "./utils/axios";
import Private from "./Routes/Private";
import Profile from "./pages/Protected/Profile";
import VerifyEmail from "./pages/Protected/verification/VerifyEmail";
import ChangeInformation from "./pages/Protected/ChangeInformation";

function App() {
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
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appartments" element={<Appartments />} />
        <Route path="/halls" element={<Halls />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/private" element={<Private />}>
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-information" element={<ChangeInformation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
