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
      <div className="mx-auto max-w-4xl border border-secondary p-6 shadow-2xl rounded-lg mt-12">
        <p className="text-center font-main text-primary font-bold text-2xl mb-4">
          Profile Information
        </p>

        <div className="md:grid md:grid-cols-12 gap-8 mt-3 p-6 flex flex-col-reverse">
          <div className="col-span-8 grid grid-cols-1 gap-4">
            <InputField label="Name" disabled={true} value={userData?.name} />
            <InputField
              label="Email"
              disabled={true}
              value={userData?.email}
              button={
                <div className="mt-4 flex items-center">
                  {userData?.verifiedEmail ? (
                    <p className="text-success">Verified</p>
                  ) : (
                    <Link to={"/private/verify-email"}>
                      <p className="text-danger">Verify now</p>
                    </Link>
                  )}
                </div>
              }
            />
            <InputField
              label="Phone"
              disabled={true}
              value={userData?.phone}
              placeholder="No phone added"
            />
            <InputField
              label="Address"
              placeholder="No Address given"
              disabled={true}
              value={userData?.address}
            />
          </div>

          <div className="col-span-4 flex flex-col items-center mt-4 md:mt-0">
            <div className="rounded-full w-40 h-40 overflow-hidden shadow-2xl mb-4">
              <img
                className="object-cover w-full h-full"
                alt="Profile"
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

        <div className="flex justify-end mt-4 gap-2">
          <Button
            onClick={() => navigate("/private/change-information")}
            className="flex items-center text-primary bg-opacity-0 border-none hover:bg-opacity-5 font-bold"
          >
            <FaPen />
            <p className="font-bold font-main ml-2">Change Information</p>
          </Button>
          {!userData?.googleId && (
            <Button
              onClick={() => navigate("/reset-password")}
              className="flex items-center text-danger bg-opacity-0 border-none hover:bg-opacity-5 font-bold"
            >
              <FaPen className="text-danger" />
              <p className="text-danger font-bold font-main ml-2">
                Reset Password
              </p>
            </Button>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Profile;
