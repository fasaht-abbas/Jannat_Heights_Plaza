import React, { useEffect, useRef, useState } from "react";
import LayoutWrapper from "../components/wrapper/LayoutWrapper";
import Form from "../components/reuseables/Form";
import InputField from "../components/reuseables/InputField";
import Button from "../components/reuseables/Button";
import Navicon from "../components/reuseables/Navicon";
import { api, handleError } from "../utils/axios";
import { env, validateInput, validateMatch } from "../utils/validate";
import { emailRegex, nameRegex, passRegex, phoneRegex } from "../utils/regex";
import GoogleLoginButton from "../components/reuseables/GoogleLoginButton";

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const cnfrmPassRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [validationErrors, setValidationErrors] = useState([""]);

  // overall validation function
  const validation = (): { isValidate: Boolean; errors: string[] } => {
    const errors: string[] = [];
    //Name Validation
    if (!validateInput(nameRef, nameRegex)) {
      errors.push("Enter valid Name(only Alphabets)");
    }
    // Phone validation
    if (!validateInput(phoneRef, phoneRegex)) {
      errors.push("Enter valid phone");
    }
    //Email validation
    if (!validateInput(emailRef, emailRegex)) {
      errors.push("Enter valid email");
    }
    // password validation
    if (!validateInput(passRef, passRegex)) {
      errors.push(
        "Enter valid password(make sure to include 1 alphabet and 1 digit) min length 8 "
      );
    }
    //password match validation
    if (!validateMatch(passRef, cnfrmPassRef)) {
      errors.push("Passwords don't match");
    }
    const isValidate = errors.length === 0;
    return {
      isValidate,
      errors,
    };
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = validation();
    if (validate.isValidate) {
      setValidationErrors([]);
      try {
        const { data } = await api.post("/api/v1/auth/register-email", {
          name: nameRef.current?.value,
          phone: phoneRef.current?.value,
          email: emailRef.current?.value,
          password: passRef.current?.value,
        });
        if (data?.success) {
          alert("Successfully created account");
        }
      } catch (error) {
        handleError(error);
      }
    } else {
      setValidationErrors(validate.errors);
    }
  };

  useEffect(() => {
    nameRef.current?.focus();
  }, []);
  return (
    <LayoutWrapper>
      <div className=" py-10 px-4 flex justify-center align-middle">
        <Form name="Sign Up Form" btnName="SignUp" onSubmit={handleSignUp}>
          <div className="md:flex  justify-between gap-4">
            <InputField ref={nameRef} placeholder="Enter full name" />
            <InputField ref={phoneRef} type="tel" placeholder="Enter phone" />
          </div>
          <InputField
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
          />
          <div className="md:flex  justify-between gap-4">
            <InputField
              ref={passRef}
              type="password"
              placeholder="Enter your password"
            />
            <InputField
              ref={cnfrmPassRef}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          {/* Error messages in case of validation errors */}
          {validationErrors.length > 0 && (
            <ul className=" m-4 font-main text-sm  font-extralight text-danger">
              {validationErrors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </ul>
          )}
          <p className="mt-6 font-main text-sm ">
            Already have account?
            <Navicon
              label="Login"
              className="text-primary font-main tracking-tight text-xs hover:border-none "
              to="/login"
            />
          </p>
          <GoogleLoginButton />
        </Form>
      </div>
    </LayoutWrapper>
  );
};

export default SignUp;
