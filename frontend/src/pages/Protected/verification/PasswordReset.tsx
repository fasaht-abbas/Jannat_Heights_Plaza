import React, { useEffect, useRef, useState } from "react";
import LayoutWrapper from "../../../components/wrapper/LayoutWrapper";
import Form from "../../../components/reuseables/Form";
import InputField from "../../../components/reuseables/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { api } from "../../../utils/axios";
import toast from "react-hot-toast";
import { handleError } from "../../../utils/axios";
import Loading from "../../../components/reuseables/Loading";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(false);

  const [email, setEmail] = useState(
    userData?.email ? userData.email : undefined
  );
  const [OTP, setOTP] = useState("");
  const [generated, setGenerated] = useState(false);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const ref1 = useRef<HTMLInputElement>(null);
  const match = pass1 === pass2;

  const findUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === undefined || "") {
      toast("enter a valid email");
    }
    try {
      const { data } = await api.post("/api/v1/user/find-user", {
        email: email,
      });
      if (data?.success) {
        if (data?.account === "gUser") {
          toast("Please Login using your google account");
          navigate("/login");
        } else {
          setFoundUser(true);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };
  const sendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (email === undefined || null) {
      toast.error("Enter a vallid email");
      setLoading(false);
    } else
      try {
        const { data } = await api.post("/api/v1/user/send-otp", {
          email: email,
        });
        if (data?.success) {
          setLoading(false);
          toast.success("OTP genrated Please Check your mail");
          setGenerated(true);
        }
      } catch (error) {
        handleError(error);
        setLoading(false);
      }
  };
  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/api/v1/user/verify-otp", {
        email: email,
        OTP: OTP,
      });
      if (data?.success) {
        toast.success("Email verified");
        setLoading(false);
        setVerified(true);
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const ChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!match) {
      ref1.current?.focus();
    } else
      try {
        setLoading(true);
        const { data } = await api.put("/api/v1/user/update-password", {
          email: email,
          newPassword: pass1,
        });
        if (data?.success) {
          setLoading(false);
          toast.success(
            userData?._id
              ? "password reset successfully"
              : "password reset... please Login now "
          );
          navigate(userData?._id ? "/" : "/login");
        } else {
          setLoading(false);
          toast.error("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    if (userData?.googleId !== undefined || "") {
      window.history.back();
    }
    if (userData?._id) {
      setFoundUser(true);
    }
  }, []);
  return (
    <LayoutWrapper>
      <div className="flex items-center justify-center  align-middle min-h-240">
        {loading ? (
          <Loading />
        ) : (
          <Form
            name="Forget Password"
            btnName={
              foundUser
                ? generated
                  ? verified
                    ? "set password"
                    : "Verify OTP"
                  : "Send OTP"
                : "Find account"
            }
            onSubmit={
              foundUser
                ? generated
                  ? verified
                    ? ChangePassword
                    : verifyOTP
                  : sendOtp
                : findUser
            }
          >
            <div className=" flex-col gap-2">
              <InputField
                placeholder="Enter your recovery email here"
                value={email}
                disabled={userData?.email !== undefined}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              {generated && !verified ? (
                <div className=" flex-col gap-2 ">
                  <InputField
                    placeholder=" Enter OTP send to you"
                    value={OTP}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setOTP(e.target.value)
                    }
                  />
                </div>
              ) : (
                ""
              )}
              {generated && verified ? (
                <div className="flex-col gap-2">
                  <InputField
                    value={pass1}
                    ref={ref1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPass1(e.target.value)
                    }
                    placeholder="Enter new password"
                  />
                  <InputField
                    value={pass2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPass2(e.target.value)
                    }
                    placeholder="Enter new password"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </Form>
        )}
      </div>
    </LayoutWrapper>
  );
};

export default PasswordReset;
