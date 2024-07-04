"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomTypographies_1 = require("./CustomTypographies");
const Button_1 = __importDefault(require("./Button"));
const react_router_dom_1 = require("react-router-dom");
const PopIn_1 = __importDefault(require("../Animations/PopIn"));
const LoginNowModel = ({ onClose, isOpen }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return isOpen ? (<div className=" z-50 backdrop-blur-sm  fixed top-0 left-0  h-screen flex  justify-center align-middle items-center w-full">
      <PopIn_1.default delay={0} className="  w-full ">
        <div className="mx-auto w-5/6  md:w-1/2 bg-white  shadow-2xl border-opacity-20 border-accent border-2 rounded-md  p-4 md:p-8 gap-4 flex
         flex-col">
          <CustomTypographies_1.SubHeadingText className="primary" text="Not logged in... SignIn to continue"/>

          <div className=" flex justify-end gap-4">
            <Button_1.default variant="primary" onClick={onClose} className=" bg-opacity-10 hover:text-white">
              Cancel
            </Button_1.default>
            <Button_1.default variant="primary" className=" text-white" onClick={() => {
            navigate("/login");
        }}>
              login Now
            </Button_1.default>
          </div>
        </div>
      </PopIn_1.default>
    </div>) : null;
};
exports.default = LoginNowModel;
