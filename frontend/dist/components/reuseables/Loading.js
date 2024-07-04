"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Loading = () => {
    return (<div>
      <div id="loader" className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 flex justify-center items-center gap-3">
        <p className="text-primary font-main text-lg"> Loading Please Wait </p>
        <span className="animate-spin h-8 w-8 text-primary   border-primary border-2  border-b-0 border-r-0 rounded-full text-3xl "></span>
      </div>
    </div>);
};
exports.default = Loading;
