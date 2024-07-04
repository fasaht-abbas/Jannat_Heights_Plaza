"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("./Button"));
const fa_1 = require("react-icons/fa");
const validate_1 = require("../../utils/validate");
const axios_1 = require("../../utils/axios");
const GoogleLoginButton = () => {
    const handleGoogleSignUp = async () => {
        try {
            window.open(validate_1.env.REACT_APP_API_BASE_URL + "/api/v1/auth/google", "_self");
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    return (<Button_1.default onClick={handleGoogleSignUp} type="button" className="  mt-6 w-full hover:bg-primary hover:bg-opacity-10 bg-white text-secondary border-2 rounded-sm">
      <fa_1.FaGoogle size={20}/> OR continue with Google
    </Button_1.default>);
};
exports.default = GoogleLoginButton;
