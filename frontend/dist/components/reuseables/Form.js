"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = __importDefault(require("./Button"));
const Form = ({ name, onSubmit, children, className, btnName, }) => {
    return (<form className={`${className} m-1  md:m-4  w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 p-4 shadow-2xl`} onSubmit={onSubmit}>
      <div className="w-full mb-2  text-center align-middle ">
        {" "}
        <p className="  font-main text-primary font-bold text-2xl">{name}</p>
      </div>
      {children}
      <div className="my-2 mt-6 flex justify-center align-bottom">
        <Button_1.default className=" hover:bg-opacity-80 w-full rounded-sm text-white" variant="primary" type="submit">
          {btnName ? btnName : name}
        </Button_1.default>
      </div>
    </form>);
};
exports.default = Form;
