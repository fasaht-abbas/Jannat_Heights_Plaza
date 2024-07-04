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
const validate_1 = require("../utils/validate");
const regex_1 = require("../utils/regex");
const axios_1 = require("../utils/axios");
const GoogleLoginButton_1 = __importDefault(require("../components/reuseables/GoogleLoginButton"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const Loading_1 = __importDefault(require("../components/reuseables/Loading"));
const Login = () => {
    const isAuthenticated = (0, react_redux_1.useSelector)((state) => state.auth.isAuthenticated);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const emailref = (0, react_1.useRef)(null);
    const passRef = (0, react_1.useRef)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [validationErrors, setValidationErrors] = (0, react_1.useState)([""]);
    (0, react_1.useEffect)(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);
    const validation = () => {
        const errors = [];
        if (!(0, validate_1.validateInput)(emailref, regex_1.emailRegex)) {
            errors.push("invalid Email or Password");
        }
        if (!(0, validate_1.validateInput)(passRef, regex_1.passRegex)) {
            errors.push("invalid Email Or Password");
        }
        const isValidate = errors.length === 0;
        return {
            isValidate,
            errors,
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validate = validation();
        if (validate?.isValidate) {
            setValidationErrors([]);
            try {
                setLoading(true);
                const { data } = await axios_1.api.post("/api/v1/auth/login-email", {
                    email: emailref.current?.value,
                    password: passRef.current?.value,
                }, {
                    withCredentials: true,
                });
                if (data.success) {
                    setLoading(false);
                    const token = data?.accessToken;
                    navigate(`/authorization?secret=${token}`);
                }
                else {
                    setLoading(false);
                    throw new Error("Login failed");
                }
            }
            catch (error) {
                setLoading(false);
                (0, axios_1.handleError)(error);
                navigate("/login");
            }
        }
        else {
            setValidationErrors(validate.errors);
        }
    };
    (0, react_1.useEffect)(() => {
        emailref?.current?.focus();
    }, []);
    return (<LayoutWrapper_1.default>
      {loading ? (<Loading_1.default />) : (<div className="min-h-[80vh] flex justify-center items-center align-middle ">
          <Form_1.default name="Login Here" btnName="Login" className=" md:w-4/12  " onSubmit={handleSubmit}>
            <InputField_1.default ref={emailref} type="email" placeholder="Enter your email"/>
            <InputField_1.default ref={passRef} type="password" placeholder="Password"/>
            {/* error messages in case of the validation errors */}
            {validationErrors.length > 0 && (<ul className=" m-4 font-main text-sm  font-extralight text-danger">
                {validationErrors.map((error) => (<p key={error}>{error}</p>))}
              </ul>)}
            <Navicon_1.default label="forget password?" to="/reset-password" className="text-danger font-accent
 tracking-tight text-xs  hover:border-b-2 border-danger hover:text-danger"/>

            <p className="mt-4 font-main text-sm ">
              Don't have account?
              <Navicon_1.default label="SignUp" className="text-primary font-main tracking-tight text-xs hover:border-none" to="/signup"/>
            </p>
            <GoogleLoginButton_1.default />
          </Form_1.default>
        </div>)}
    </LayoutWrapper_1.default>);
};
exports.default = Login;
