import React from "react";
import LayoutWrapper from "../../../components/wrapper/LayoutWrapper";
import Form from "../../../components/reuseables/Form";
import InputField from "../../../components/reuseables/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const VerifyEmail = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <LayoutWrapper>
      <div className="py-10 px-4 flex justify-center">
        <Form name="Verify Email" btnName="Send OTP" onSubmit={submitHandler}>
          <p className="mt-4 text-lg font-main text-accent">
            an OTP will be sent to your email address
          </p>

          <InputField value={userData?.email} disabled={true} />
        </Form>
      </div>
    </LayoutWrapper>
  );
};

export default VerifyEmail;
