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
const Loading_1 = __importDefault(require("./Loading"));
const Button_1 = __importDefault(require("./Button"));
const UnAuthorizedPage = () => {
    const [count, setCount] = (0, react_1.useState)(6);
    (0, react_1.useEffect)(() => {
        if (count > 0) {
            setInterval(() => {
                setCount((prevCount) => prevCount - 1);
            }, 1000);
        }
    }, [count]);
    const goBack = () => {
        window.history.back();
    };
    return count > 0 ? (<Loading_1.default />) : (<>
      <div className=" flex gap-6  flex-wrap text-3xl m-1 p-0  md:m-4  md:p-6 md:mt-12">
        <p>Page Not Found OR Access Denied</p>
        <Button_1.default type="button" className=" hover:bg-opacity-5 bg-opacity-5" onClick={goBack}>
          Go Back
        </Button_1.default>
      </div>
    </>);
};
exports.default = UnAuthorizedPage;
