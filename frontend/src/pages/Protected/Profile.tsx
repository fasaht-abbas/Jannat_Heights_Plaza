import React from "react";
import LayoutWrapper from "../../components/wrapper/LayoutWrapper";
import InputField from "../../components/reuseables/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/reuseables/Button";

const Profile = () => {
  const Person = "/person.png";
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);
  return (
    <LayoutWrapper>
      <div className=" mx-[2vw] md:mx-[4vw] border-secondary m-1 p-0  md:m-4  md:p-6  shadow-2xl md:mt-12 w-auto  ">
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
              placeholder="no phone added"
            />

            <InputField
              label="Address"
              placeholder="No Address given"
              disabled={true}
              value={userData?.address}
            />
          </div>

          <div className="col-span-4 mx-auto mt-2">
            <div className="flex flex-col items-center ">
              <div className=" rounded-full size-40 overflow-hidden  shadow-2xl">
                <img
                  className=" object-cover size-full  "
                  alt="nothing here"
                  src={userData?.profilePhoto ? userData?.profilePhoto : Person}
                />
              </div>
              <InputField
                placeholder="No CNIC added"
                label="CNIC"
                value={userData?.CNIC}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className=" col-span-12 flex justify-end mr-2 gap-2 items-center ">
          <Button
            onClick={() => navigate("/private/change-information")}
            className=" text-primary bg-opacity-0 border-none hover:bg-opacity-5 font-bold"
          >
            <FaPen className="" />
            <p className="font-bold font-main">Change Information</p>
          </Button>
          {userData?.googleId === null || undefined || "" ? (
            <Button
              onClick={() => navigate("/reset-password")}
              className=" text-primary bg-opacity-0 border-none hover:bg-opacity-5 font-bold"
            >
              <FaPen className="text-danger" />
              <p className="text-danger font-bold font-main">Reset Password</p>
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Profile;
