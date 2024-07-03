import React, { useState } from "react";
import LayoutWrapper from "../../../components/wrapper/LayoutWrapper";
import Form from "../../../components/reuseables/Form";
import InputField from "../../../components/reuseables/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { handleError, protectedApi } from "../../../utils/axios";
import toast from "react-hot-toast";
import Loading from "../../../components/reuseables/Loading";
import { useNavigate } from "react-router-dom";
import { refreshing } from "../../../utils/refreshTokens";

const VerifyEmail = () => {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const sendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await protectedApi.post("/api/v1/user/send-otp", {
        email: userData?.email,
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
      const { data } = await protectedApi.post("/api/v1/user/verify-otp", {
        email: userData?.email,
        OTP: OTP,
      });
      if (data?.success) {
        toast.success("Email verified");
        setLoading(false);
        navigate("/private/profile");
        await refreshing();
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  return (
    <LayoutWrapper>
      <div className="py-10 px-4 flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <Form
            name="Verify Email"
            btnName={generated ? "Verify now" : "Request OTP"}
            onSubmit={generated ? verifyOTP : sendOtp}
          >
            <p className="mt-4 text-lg font-main text-accent">
              {generated
                ? "OTP has been Sent to Your Email Address"
                : "OTP will be sent to your email Address"}
            </p>

            <InputField value={userData?.email} disabled={true} />
            {generated ? (
              <InputField
                placeholder="Enter Six Digit OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
            ) : (
              ""
            )}
          </Form>
        )}
      </div>
    </LayoutWrapper>
  );
};

export default VerifyEmail;
