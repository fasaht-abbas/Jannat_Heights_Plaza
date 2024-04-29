import React, { useEffect, useRef, useState } from "react";
import LayoutWrapper from "../components/wrapper/LayoutWrapper";
import Form from "../components/reuseables/Form";
import InputField from "../components/reuseables/InputField";
import Navicon from "../components/reuseables/Navicon";
import { validateInput } from "../utils/validate";
import { emailRegex, passRegex } from "../utils/regex";
import { api, handleError } from "../utils/axios";
import GoogleLoginButton from "../components/reuseables/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Login = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const emailref = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [validationErrors, setValidationErrors] = useState([""]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const validation = (): { isValidate: Boolean; errors: string[] } => {
    const errors: string[] = [];
    if (!validateInput(emailref, emailRegex)) {
      errors.push("invalid Email or Password");
    }
    if (!validateInput(passRef, passRegex)) {
      errors.push("invalid Email Or Password");
    }
    const isValidate = errors.length === 0;
    return {
      isValidate,
      errors,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = validation();
    if (validate?.isValidate) {
      setValidationErrors([]);
      try {
        const { data } = await api.post(
          "/api/v1/auth/login-email",
          {
            email: emailref.current?.value,
            password: passRef.current?.value,
          },
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          const token = data?.accessToken;
          navigate(`/authorization?secret=${token}`);
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        handleError(error);
        navigate("/login");
      }
    } else {
      setValidationErrors(validate.errors);
    }
  };
  useEffect(() => {
    emailref?.current?.focus();
  }, []);
  return (
    <LayoutWrapper>
      <div className="py-10  px-4 flex justify-center ">
        <Form
          name="Login Here"
          btnName="Login"
          className=" md:w-4/12  "
          onSubmit={handleSubmit}
        >
          <InputField
            ref={emailref}
            type="email"
            placeholder="Enter your email"
          />
          <InputField ref={passRef} type="password" placeholder="Password" />
          {/* error messages in case of the validation errors */}
          {validationErrors.length > 0 && (
            <ul className=" m-4 font-main text-sm  font-extralight text-danger">
              {validationErrors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </ul>
          )}
          <Navicon
            label="forget password?"
            to="/reset-password"
            className="text-danger font-accent
 tracking-tight text-xs  hover:border-b-2 border-danger hover:text-danger"
          />

          <p className="mt-4 font-main text-sm ">
            Don't have account?
            <Navicon
              label="SignUp"
              className="text-primary font-main tracking-tight text-xs hover:border-none"
              to="/signup"
            />
          </p>
          <GoogleLoginButton />
        </Form>
      </div>
    </LayoutWrapper>
  );
};

export default Login;
