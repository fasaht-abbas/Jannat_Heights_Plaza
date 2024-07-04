"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button = ({ className, variant, size = "md", onClick, children, type = "button", title, }) => {
    return (<button title={title} type={type} // Use the provided type prop
     className={`bg-${variant} focus:ring-0  font-main  transition flex justify-center text-middle gap-2 hover:bg-opacity-60  bg-none  font-medium rounded-md text-sm px-4 py-2 ${size}  ${className}`} onClick={onClick}>
      {children}
    </button>);
};
exports.default = Button;
