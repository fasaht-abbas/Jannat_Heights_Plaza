import React from "react";
import LayoutWrapper from "../../components/wrapper/LayoutWrapper";
import InputField from "../../components/reuseables/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/reuseables/Button";
const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);
  return (
    <LayoutWrapper>
      <div className="m-4 p-2 md:p-6  shadow-xl  ">
        <p className=" text-center  font-main text-primary font-bold text-2xl">
          Profile Information
        </p>

        <div className=" md:grid md:grid-cols-12 gap-8 mt-3 p-6 flex-col-reverse flex ">
          <div className="col-span-8 grid grid-cols-1  ">
            <InputField label="Name" disabled={true} value={userData?.name} />

            <InputField
              label="Email"
              disabled={true}
              value={userData?.email}
              button={
                <div className=" mt-4 flex items-center">
                  {userData?.verifiedEmail ? (
                    <p className="text-success ">verified </p>
                  ) : (
                    <Link to={"/private/verify-email"}>
                      <p className=" decoration-danger text-danger">
                        verify now
                      </p>
                    </Link>
                  )}
                </div>
              }
            />

            <InputField
              label="Phone"
              disabled={true}
              value={userData?.phone}
              button={
                userData?.verifiedPhone ? (
                  <p className=" text-success ">verified </p>
                ) : userData?.phone?.length ? (
                  <Link to={"/private/verify-email"}>
                    <p className=" decoration-danger text-danger">verify now</p>
                  </Link>
                ) : (
                  <p className=" decoration-danger text-secondary">add phone</p>
                )
              }
            />

            <InputField
              label="Address"
              disabled={true}
              value={userData?.address}
            />
          </div>

          <div className="col-span-4 mx-auto mt-2">
            <div className="flex flex-col items-center ">
              <div className=" rounded-full ">
                <img
                  className=" rounded-full border-2 border-secondary object-cover  "
                  src={userData?.profilePhoto}
                  alt={userData?.name}
                />
              </div>
              <InputField label="CNIC" value={userData?.CNIC} disabled={true} />
            </div>
          </div>
          <div className=" col-span-12 flex justify-end mr-2 gap-2 items-center ">
            <Button
              onClick={() => navigate("/private/change-information")}
              className=" text-primary bg-opacity-0 border-none hover:bg-opacity-5 font-bold"
            >
              <FaPen />
              <p className=" font-bold font-main">Change Information</p>
            </Button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Profile;
