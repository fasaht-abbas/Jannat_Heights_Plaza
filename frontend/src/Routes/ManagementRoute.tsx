import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UnAuthorizedPage from "../components/reuseables/UnAuthorizedPage";
import { RootState } from "../redux/store";

const ManagementRoute = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  return userData?.role === "manager" || userData?.role === "admin" ? (
    <Outlet />
  ) : (
    <UnAuthorizedPage />
  );
};

export default ManagementRoute;
