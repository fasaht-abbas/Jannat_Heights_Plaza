"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const LayoutWrapper_1 = __importDefault(require("../components/wrapper/LayoutWrapper"));
const Form_1 = __importDefault(require("../components/reuseables/Form"));
const InputField_1 = __importDefault(require("../components/reuseables/InputField"));
const Navicon_1 = __importDefault(require("../components/reuseables/Navicon"));
const axios_1 = require("../utils/axios");
const validate_1 = require("../utils/validate");
const regex_1 = require("../utils/regex");
const GoogleLoginButton_1 = __importDefault(require("../components/reuseables/GoogleLoginButton"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_router_dom_1 = require("react-router-dom");
const Loading_1 = __importDefault(require("../components/reuseables/Loading"));
const SignUp = () => {
    const emailRef = (0, react_1.useRef)(null);
    const passRef = (0, react_1.useRef)(null);
    const cnfrmPassRef = (0, react_1.useRef)(null);
    const phoneRef = (0, react_1.useRef)(null);
    const nameRef = (0, react_1.useRef)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [validationErrors, setValidationErrors] = (0, react_1.useState)([""]);
    // overall validation function
    const validation = () => {
        const errors = [];
        //Name Validation
        if (!(0, validate_1.validateInput)(nameRef, regex_1.nameRegex)) {
            errors.push("Enter valid Name(only Alphabets)");
        }
        // Phone validation
        if (!(0, validate_1.validateInput)(phoneRef, regex_1.phoneRegex)) {
            errors.push("Enter valid phone");
        }
        //Email validation
        if (!(0, validate_1.validateInput)(emailRef, regex_1.emailRegex)) {
            errors.push("Enter valid email");
        }
        // password validation
        if (!(0, validate_1.validateInput)(passRef, regex_1.passRegex)) {
            errors.push("Enter valid password(make sure to include 1 alphabet and 1 digit) min length 8 ");
        }
        //password match validation
        if (!(0, validate_1.validateMatch)(passRef, cnfrmPassRef)) {
            errors.push("Passwords don't match");
        }
        const isValidate = errors.length === 0;
        return {
            isValidate,
            errors,
        };
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        const validate = validation();
        if (validate.isValidate) {
            setValidationErrors([]);
            try {
                setLoading(true);
                const { data } = await axios_1.api.post("/api/v1/auth/register-email", {
                    name: nameRef.current?.value,
                    phone: phoneRef.current?.value,
                    email: emailRef.current?.value,
                    password: passRef.current?.value,
                });
                if (data?.success) {
                    setLoading(false);
                    react_hot_toast_1.default.success("Successfully created account");
                    navigate("/login");
                }
            }
            catch (error) {
                setLoading(false);
                (0, axios_1.handleError)(error);
            }
        }
        else {
            setValidationErrors(validate.errors);
        }
    };
    (0, react_1.useEffect)(() => {
        nameRef.current?.focus();
    }, []);
    return (<LayoutWrapper_1.default>
      {loading ? (<Loading_1.default />) : (<div className=" min-h-[80vh] flex justify-center items-center align-middle">
          <Form_1.default name="Sign Up Form" btnName="Create account" onSubmit={handleSignUp}>
            <p className="ml-1 text-primary  font-main text-sm">
              Fill all fields and click create account
            </p>
            <div className="md:flex  justify-between gap-4">
              <InputField_1.default ref={nameRef} placeholder="Enter full name"/>
              <InputField_1.default ref={phoneRef} type="tel" placeholder="Enter phone"/>
            </div>
            <InputField_1.default ref={emailRef} type="email" placeholder="Enter your email"/>
            <div className="md:flex  justify-between gap-4">
              <InputField_1.default ref={passRef} type="password" placeholder="Enter your password"/>
              <InputField_1.default ref={cnfrmPassRef} type="password" placeholder="Confirm Password"/>
            </div>
            {/* Error messages in case of validation errors */}
            {validationErrors.length > 0 && (<ul className=" m-4 font-main text-sm  font-extralight text-danger">
                {validationErrors.map((error) => (<p key={error}>{error}</p>))}
              </ul>)}
            <p className="mt-6 font-main text-sm ">
              Already have account?
              <Navicon_1.default label="Login" className="text-primary font-main tracking-tight text-xs hover:border-none " to="/login"/>
            </p>
            <GoogleLoginButton_1.default />
          </Form_1.default>
        </div>)}
    </LayoutWrapper_1.default>);
};
exports.default = SignUp;
