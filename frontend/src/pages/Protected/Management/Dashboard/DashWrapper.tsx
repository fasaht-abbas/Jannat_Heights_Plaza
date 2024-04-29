import React from "react";
import LayoutWrapper from "../../../../components/wrapper/LayoutWrapper";
import Navicon from "../../../../components/reuseables/Navicon";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
interface DashProps {
  children: React.ReactNode;
}
const DashWrapper: React.FC<DashProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  return (
    <LayoutWrapper>
      <div className=" flex p-[2vh]  bg-accent  bg-opacity-20">
        <div className="w-1/6 p-[2vh] rounded-md shadow-2xl fixed  top-35 ">
          <ul className=" flex flex-col font-main  font-bold space-y-4">
            <Navicon label="Dashboard" to="/private/r2/dashboard" />
            <Navicon
              label="Manage Appartment"
              to="/private/r2/manage-apartments"
            />
            <Navicon label="Bookings" to="/private/r2/bookings" />
            {userData?.role === "admin" ? (
              <Navicon label="Manage Team" to="/private/r1/manage-team" />
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="w-5/6  ml-[17vW]  ">
          <main style={{ minHeight: "80vh" }}>{children}</main>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default DashWrapper;
