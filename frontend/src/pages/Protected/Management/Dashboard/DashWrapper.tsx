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
    <div className=" min-h-[100vh] flex flex-col md:flex-row p-[2vh]  bg-primary bg-opacity-15 gap-4">
      <div className=" relative bg-primary md:h-[96vh] w-full md:w-1/6 p-[2vh] rounded-md shadow-2xl  md:fixed  top-35 flex-wrap ">
        <div className=" flex md:flex-col items-center mx-auto md:items-start font-main  font-bold flex-wrap justify-evenly space-y-4">
          <Navicon
            footicon={true}
            className="mt-3"
            label="Dashboard"
            to="/private/r2/dashboard"
          />
          <Navicon
            footicon={true}
            label="Manage Appartment"
            to="/private/r2/manage-apartments"
          />
          <Navicon footicon={true} label="Bookings" to="/private/r2/bookings" />
          {userData?.role === "admin" && (
            <Navicon
              footicon={true}
              label="Manage Team"
              to="/private/r1/manage-team"
            />
          )}
          <Navicon
            footicon={true}
            className=" md:absolute bottom-2 left-2"
            label="Exit"
            to="/"
          />
        </div>
      </div>
      <div className="w-full md:ml-[17vw] flex justify-center  ">
        <main className=" min-h-[80vh] w-full">{children}</main>
      </div>
    </div>
  );
};

export default DashWrapper;
