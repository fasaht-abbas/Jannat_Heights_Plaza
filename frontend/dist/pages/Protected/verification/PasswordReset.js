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
const LayoutWrapper_1 = __importDefault(require("../../../components/wrapper/LayoutWrapper"));
const Form_1 = __importDefault(require("../../../components/reuseables/Form"));
const InputField_1 = __importDefault(require("../../../components/reuseables/InputField"));
const react_redux_1 = require("react-redux");
const axios_1 = require("../../../utils/axios");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const axios_2 = require("../../../utils/axios");
const Loading_1 = __importDefault(require("../../../components/reuseables/Loading"));
const react_router_dom_1 = require("react-router-dom");
const PasswordReset = () => {
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [verified, setVerified] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [foundUser, setFoundUser] = (0, react_1.useState)(false);
    const [email, setEmail] = (0, react_1.useState)(userData?.email ? userData.email : undefined);
    const [OTP, setOTP] = (0, react_1.useState)("");
    const [generated, setGenerated] = (0, react_1.useState)(false);
    const [pass1, setPass1] = (0, react_1.useState)("");
    const [pass2, setPass2] = (0, react_1.useState)("");
    const ref1 = (0, react_1.useRef)(null);
    const match = pass1 === pass2;
    const findUser = async (e) => {
        e.preventDefault();
        if (email === undefined || "") {
            (0, react_hot_toast_1.default)("enter a valid email");
        }
        try {
            const { data } = await axios_1.api.post("/api/v1/user/find-user", {
                email: email,
            });
            if (data?.success) {
                if (data?.account === "gUser") {
                    (0, react_hot_toast_1.default)("Please Login using your google account");
                    navigate("/login");
                }
                else {
                    setFoundUser(true);
                }
            }
        }
        catch (error) {
            (0, axios_2.handleError)(error);
        }
    };
    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (email === undefined || null) {
            react_hot_toast_1.default.error("Enter a vallid email");
            setLoading(false);
        }
        else
            try {
                const { data } = await axios_1.api.post("/api/v1/user/send-otp", {
                    email: email,
                });
                if (data?.success) {
                    setLoading(false);
                    react_hot_toast_1.default.success("OTP genrated Please Check your mail");
                    setGenerated(true);
                }
            }
            catch (error) {
                (0, axios_2.handleError)(error);
                setLoading(false);
            }
    };
    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios_1.api.post("/api/v1/user/verify-otp", {
                email: email,
                OTP: OTP,
            });
            if (data?.success) {
                react_hot_toast_1.default.success("Email verified");
                setLoading(false);
                setVerified(true);
            }
        }
        catch (error) {
            setLoading(false);
            (0, axios_2.handleError)(error);
        }
    };
    const ChangePassword = async (e) => {
        e.preventDefault();
        if (!match) {
            ref1.current?.focus();
        }
        else
            try {
                setLoading(true);
                const { data } = await axios_1.api.put("/api/v1/user/update-password", {
                    email: email,
                    newPassword: pass1,
                });
                if (data?.success) {
                    setLoading(false);
                    react_hot_toast_1.default.success(userData?._id
                        ? "password reset successfully"
                        : "password reset... please Login now ");
                    navigate(userData?._id ? "/" : "/login");
                }
                else {
                    setLoading(false);
                    react_hot_toast_1.default.error("something went wrong");
                }
            }
            catch (error) {
                console.log(error);
            }
    };
    (0, react_1.useEffect)(() => {
        if (userData?.googleId !== undefined || "") {
            window.history.back();
        }
        if (userData?._id) {
            setFoundUser(true);
        }
    }, []);
    return (<LayoutWrapper_1.default>
      <div className="flex items-center justify-center  align-middle min-h-240">
        {loading ? (<Loading_1.default />) : (<Form_1.default name="Forget Password" btnName={foundUser
                ? generated
                    ? verified
                        ? "set password"
                        : "Verify OTP"
                    : "Send OTP"
                : "Find account"} onSubmit={foundUser
                ? generated
                    ? verified
                        ? ChangePassword
                        : verifyOTP
                    : sendOtp
                : findUser}>
            <div className=" flex-col gap-2">
              <InputField_1.default placeholder="Enter your recovery email here" value={email} disabled={userData?.email !== undefined} onChange={(e) => setEmail(e.target.value)}/>

              {generated && !verified ? (<div className=" flex-col gap-2 ">
                  <InputField_1.default placeholder=" Enter OTP send to you" value={OTP} onChange={(e) => setOTP(e.target.value)}/>
                </div>) : ("")}
              {generated && verified ? (<div className="flex-col gap-2">
                  <InputField_1.default value={pass1} ref={ref1} onChange={(e) => setPass1(e.target.value)} placeholder="Enter new password"/>
                  <InputField_1.default value={pass2} onChange={(e) => setPass2(e.target.value)} placeholder="Enter new password"/>
                </div>) : ("")}
            </div>
          </Form_1.default>)}
      </div>
    </LayoutWrapper_1.default>);
};
exports.default = PasswordReset;
