import LayoutWrapper from "../../components/wrapper/LayoutWrapper";
import InputField from "../../components/reuseables/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaFile } from "react-icons/fa";
import Button from "../../components/reuseables/Button";
import toast from "react-hot-toast";
import React, { useRef, useState } from "react";

const ChangeInformation = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [name, setName] = useState(userData?.name);
  const [address, setAddress] = useState(userData?.address);
  const [phone, setPhone] = useState(userData?.phone);
  const [CNIC, setCNIC] = useState(userData?.CNIC);
  const [photo, setPhoto] = useState<File | null>(null);

  const photoRef = useRef<HTMLInputElement>(null);
  const [validationErrors, setValidationErrors] = useState([""]);

  const handleSubmit = () => {};

  return (
    <LayoutWrapper>
      {" "}
      <div className="m-4 p-2 md:p-6  shadow-xl  ">
        <p className=" text-center  font-main text-primary font-bold text-2xl">
          Change Information
        </p>

        <div className=" md:grid md:grid-cols-12 gap-8 mt-3 p-6 flex-col-reverse flex ">
          <div className="col-span-8 grid grid-cols-1  ">
            <InputField
              label="Name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />

            <InputField label="Email" disabled={true} value={userData?.email} />

            <InputField
              label="Phone"
              type="string"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />

            <InputField
              label="Address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>

          <div className="col-span-4 mx-auto mt-2">
            <div className="flex flex-col items-center ">
              <div className=" rounded-full  size-30">
                <img
                  className=" rounded-full border-2 border-secondary object-fit"
                  src={
                    photo === null
                      ? userData?.profilePhoto
                      : URL.createObjectURL(photo)
                  }
                  alt={name}
                  width={100}
                  height={100}
                />
              </div>
              <InputField
                type="file"
                ref={photoRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target?.files && e.target?.files[0]) {
                    setPhoto(e.target?.files[0]);
                  }
                }}
                className="mb-0"
              />
              <InputField
                label="CNIC"
                value={CNIC}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCNIC(e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-span-12 flex justify-end mr-2 gap-2 items-center ">
            <Button
              onClick={() => handleSubmit}
              className="  text-success bg-opacity-0 border-none hover:bg-opacity-5 font-bold"
            >
              <FaFile />
              <p className=" font-bold font-main">Save Changes</p>
            </Button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default ChangeInformation;
