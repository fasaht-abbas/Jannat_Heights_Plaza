"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Button_1 = __importDefault(require("./Button"));
const InputField = (0, react_2.forwardRef)(({ type = "text", disabled = false, accept, placeholder, className, containerClass, value, onChange, button, width, label, labelClass, ...rest }, ref) => {
    return (<div className={`${containerClass} mt-4 grid grid-cols-12 items-center justify-start gap-0 `}>
        <p className={`${labelClass} text-secondary  col-span-4 font-bold  text-sm  md:text-lg`}>
          {label}
        </p>
        <div className={`${label ? "col-span-8" : "col-span-12"}  flex justify-start gap-2`}>
          <input disabled={disabled ? true : false} ref={ref} accept={accept} type={type} placeholder={placeholder} value={value} onChange={onChange} className={` text-sm  md:text-lg bg-opacity-0 disabled:bg-opacity-0  bg-accent border-b my-1 border-secondary p-1 text-primary focus:outline-none ${className} ${width ? width : "w-full"} `} {...rest}/>
          {button ? (<Button_1.default className=" col-span-2  p-0 m-0 border-primary border-1  bg-opacity-0 text-primary hover:bg-opacity-5 text-xs " variant="primary" type="button">
              {button}
            </Button_1.default>) : ("")}
        </div>
      </div>);
});
exports.default = InputField;
