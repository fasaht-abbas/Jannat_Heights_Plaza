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
const Loading_1 = __importDefault(require("../../../components/reuseables/Loading"));
const react_router_dom_1 = require("react-router-dom");
const refreshTokens_1 = require("../../../utils/refreshTokens");
const VerifyEmail = () => {
    const [generated, setGenerated] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [OTP, setOTP] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios_1.protectedApi.post("/api/v1/user/send-otp", {
                email: userData?.email,
            });
            if (data?.success) {
                setLoading(false);
                react_hot_toast_1.default.success("OTP genrated Please Check your mail");
                setGenerated(true);
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
            setLoading(false);
        }
    };
    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios_1.protectedApi.post("/api/v1/user/verify-otp", {
                email: userData?.email,
                OTP: OTP,
            });
            if (data?.success) {
                react_hot_toast_1.default.success("Email verified");
                setLoading(false);
                navigate("/private/profile");
                await (0, refreshTokens_1.refreshing)();
            }
        }
        catch (error) {
            setLoading(false);
            (0, axios_1.handleError)(error);
        }
    };
    return (<LayoutWrapper_1.default>
      <div className="py-10 px-4 flex justify-center">
        {loading ? (<Loading_1.default />) : (<Form_1.default name="Verify Email" btnName={generated ? "Verify now" : "Request OTP"} onSubmit={generated ? verifyOTP : sendOtp}>
            <p className="mt-4 text-lg font-main text-accent">
              {generated
                ? "OTP has been Sent to Your Email Address"
                : "OTP will be sent to your email Address"}
            </p>

            <InputField_1.default value={userData?.email} disabled={true}/>
            {generated ? (<InputField_1.default placeholder="Enter Six Digit OTP" value={OTP} onChange={(e) => setOTP(e.target.value)}/>) : ("")}
          </Form_1.default>)}
      </div>
    </LayoutWrapper_1.default>);
};
exports.default = VerifyEmail;
