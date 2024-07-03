import React, { useEffect, useRef, useState } from "react";
import LayoutWrapper from "../components/wrapper/LayoutWrapper";
import Form from "../components/reuseables/Form";
import InputField from "../components/reuseables/InputField";
import Navicon from "../components/reuseables/Navicon";
import { api, handleError } from "../utils/axios";
import { validateInput, validateMatch } from "../utils/validate";
import { emailRegex, nameRegex, passRegex, phoneRegex } from "../utils/regex";
import GoogleLoginButton from "../components/reuseables/GoogleLoginButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/reuseables/Loading";

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const cnfrmPassRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        setLoading(true);
        const { data } = await api.post("/api/v1/auth/register-email", {
          name: nameRef.current?.value,
          phone: phoneRef.current?.value,
          email: emailRef.current?.value,
          password: passRef.current?.value,
        });
        if (data?.success) {
          setLoading(false);
          toast.success("Successfully created account");
          navigate("/login");
        }
      } catch (error) {
        setLoading(false);
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
      {loading ? (
        <Loading />
      ) : (
        <div className=" min-h-[80vh] flex justify-center items-center align-middle">
          <Form
            name="Sign Up Form"
            btnName="Create account"
            onSubmit={handleSignUp}
          >
            <p className="ml-1 text-primary  font-main text-sm">
              Fill all fields and click create account
            </p>
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
      )}
    </LayoutWrapper>
  );
};

export default SignUp;
