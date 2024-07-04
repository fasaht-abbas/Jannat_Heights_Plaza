"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Navicon_1 = __importDefault(require("../../../../components/reuseables/Navicon"));
const react_redux_1 = require("react-redux");
const DashWrapper = ({ children }) => {
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    return (<div className=" min-h-[100vh] flex flex-col md:flex-row p-[2vh]  bg-primary bg-opacity-15 gap-4">
      <div className=" relative bg-primary md:h-[96vh] w-full md:w-1/6 p-[2vh] rounded-md shadow-2xl  md:fixed  top-35 flex-wrap ">
        <div className=" flex md:flex-col items-center mx-auto md:items-start font-main  font-bold flex-wrap justify-evenly space-y-4">
          <Navicon_1.default footicon={true} label="Manage Appartment" to="/private/r2/manage-apartments"/>
          <Navicon_1.default footicon={true} label="Bookings" to="/private/r2/bookings"/>
          {userData?.role === "admin" && (<Navicon_1.default footicon={true} label="Manage Team" to="/private/r1/manage-team"/>)}
          <Navicon_1.default footicon={true} className=" md:absolute bottom-2 left-2" label="Exit" to="/"/>
        </div>
      </div>
      <div className="w-full md:ml-[17vw] flex justify-center  ">
        <main className=" min-h-[80vh] w-full">{children}</main>
      </div>
    </div>);
};
exports.default = DashWrapper;
