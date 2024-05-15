import LayoutWrapper from "../../components/wrapper/LayoutWrapper";
import InputField from "../../components/reuseables/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaFile } from "react-icons/fa";
import Button from "../../components/reuseables/Button";
import toast from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import { handleError, protectedApi } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { refreshing } from "../../utils/refreshTokens";
import Loading from "../../components/reuseables/Loading";
import { FaImage } from "react-icons/fa";
const ChangeInformation = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [address, setAddress] = useState(userData?.address);
  const [phone, setPhone] = useState(userData?.phone);
  const [CNIC, setCNIC] = useState(userData?.CNIC);
  const [photo, setPhoto] = useState<File | null>(null);
  const Person = "/person.png";
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updateForm = new FormData();
      updateForm.append("id", userData?._id ? userData._id : "");
      updateForm.append("phone", phone ? phone : "");
      updateForm.append("address", address ? address : "");
      updateForm.append("photo", photo ? photo : "");
      updateForm.append("name", name ? name : "");
      updateForm.append("CNIC", CNIC ? CNIC : "");

      const { data } = await protectedApi.post(
        "/api/v1/user/update-user",
        updateForm
      );
      if (data?.success) {
        toast.success("Profile Update Successfully");
        await refreshing();
        setLoading(false);
        navigate("/private/profile");
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
      navigate("/private/profile");
    }
  };
  useEffect(() => {
    nameRef.current?.focus();
  }, []);
  return (
    <LayoutWrapper>
      {loading ? (
        <Loading />
      ) : (
        <div className=" mx-[2vw] md:mx-[4vw] border-secondary m-1 p-0  md:m-4  md:p-6  shadow-2xl md:mt-12 w-auto ">
          <p className=" text-center  font-main text-primary font-bold text-2xl">
            Change Information
          </p>

          <div className=" md:grid md:grid-cols-12 gap-8 mt-3 p-6 flex-col-reverse flex ">
            <div className="col-span-8 grid grid-cols-1  ">
              <InputField
                label="Name"
                ref={nameRef}
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <InputField
                label="Email"
                disabled={true}
                value={userData?.email}
              />
              <p className=" text-danger text-xs">Email can not be changed</p>

              <InputField
                label="Phone"
                type="string"
                value={phone}
                placeholder="no phone added (add here)"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhone(e.target.value)
                }
              />

              <InputField
                label="Address"
                value={address}
                placeholder="Add Address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
            </div>

            <div className="col-span-4 mx-auto mt-2">
              <div className="flex flex-col items-center  justify-center gap-4 align-middle">
                <div className="rounded-full size-40 overflow-hidden shadow-2xl">
                  <img
                    className="object-cover size-full "
                    src={
                      photo === null
                        ? userData?.profilePhoto
                          ? userData?.profilePhoto
                          : Person
                        : URL.createObjectURL(photo)
                    }
                    alt={name}
                    width={100}
                    height={100}
                  />
                </div>
                {photo ? (
                  <div className=" flex flex-col gap-2 w-full justify-center">
                    <p>{photo?.name}</p>
                    <Button
                      onClick={() =>
                        document.getElementById("upload-Photo")?.click()
                      }
                      variant="success"
                      className=" flex   gap-2 justify-center items-center "
                    >
                      <FaImage /> <p> change photo</p>
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() =>
                      document.getElementById("upload-Photo")?.click()
                    }
                    variant="accent"
                    className=" flex gap-2 justify-center items-center bg-opacity-50 "
                  >
                    <FaImage /> <p> upload new photo</p>
                  </Button>
                )}
                <input
                  id="upload-Photo"
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target?.files && e.target?.files[0]) {
                      setPhoto(e.target?.files[0]);
                    }
                  }}
                  className=" hidden  "
                />

                <InputField
                  label="CNIC"
                  placeholder="Add CNIC here"
                  value={CNIC}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCNIC(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 flex justify-end mr-2 gap-2 items-center ">
            <Button
              variant="success"
              onClick={handleSubmit}
              className=" items-center  border-none hover:bg-opacity-5 font-bold"
            >
              <FaFile />
              <p className="  font-main">Save Changes</p>
            </Button>
          </div>
        </div>
      )}
    </LayoutWrapper>
  );
};

export default ChangeInformation;
