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
const Navicon_1 = __importDefault(require("../reuseables/Navicon"));
const Logo_1 = __importDefault(require("../reuseables/Logo"));
const ri_1 = require("react-icons/ri");
const md_1 = require("react-icons/md");
const react_redux_1 = require("react-redux");
const LogoutButton_1 = __importDefault(require("../reuseables/LogoutButton"));
const Header = () => {
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    const loggedIn = (0, react_redux_1.useSelector)((state) => state.auth.isAuthenticated);
    const [open, setOpen] = (0, react_1.useState)(false);
    // some styling tailwind classes for the login and sign up buttons
    const loginClasses = " border-primary py-1 md:py-2 border-2 bg-primary hover:bg-opacity-10 bg-primary text-white rounded-sm px-4";
    const signupClasses = " border-primary py-1 md:py-2  border-2 bg-primary hover:bg-opacity-10 bg-primary text-white rounded-sm px-3";
    // toggle funstion for opening/clossing
    const NavToggle = () => {
        if (open) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }
    };
    return (<nav className={` sticky top-0 left-0 right-0 z-50 bg-white shadow-md ${open ? "h-100 " : "h-16 "} md:h-24`}>
      <ul className="relative  md:static text-center space-y-4 md:space-y-0 md:flex lg:flex py-6 px-2 md:justify-around items-center ">
        <li className={`${open ? "sm:block" : "hidden md:block"}`}>
          <Navicon_1.default label="Home" to="/"/>
        </li>
        <li className={`${open ? "sm:block" : "hidden md:block"}`}>
          <Navicon_1.default label="Apartment" to="/apartments"/>
        </li>
        <li className={`${open ? "sm:block" : "hidden md:block"}`}>
          <Navicon_1.default label="Bookings" to={userData?.role === "customer"
            ? "/private/bookings"
            : "/private/r2/bookings"}/>
        </li>
        <li className=" absolute left-5 top-0 md:static sm:block">
          <Logo_1.default className="cursor-pointer" link={true}/>
        </li>
        {(loggedIn && userData?.role === "admin") ||
            userData?.role === "manager" ? (<li className={`${open ? "sm:block" : "hidden md:block"}`}>
            <Navicon_1.default label="Dashboard" to="/private/r2/manage-apartments"/>
          </li>) : (<li className={`${open ? "sm:block" : "hidden md:block"}`}>
            <Navicon_1.default label="Contact" to="/contact"/>
          </li>)}
        {loggedIn ? (<>
            <li className={`${open
                ? "sm:block "
                : "absolute top-1 right-32 ml-0 md:static md:block"}`}>
              <Navicon_1.default label="Profile" to="/private/profile"/>
            </li>
            <li className={` ${open
                ? "sm:block "
                : " mr-0 absolute top-1 right-12 md:static md:block"}`}>
              <LogoutButton_1.default />
            </li>
          </>) : (<>
            <li className={`${open
                ? "sm:block "
                : "absolute top-1 right-32 ml-0 md:static md:block"}`}>
              <Navicon_1.default label="LogIn" className={` transition-none ${open ? "" : loginClasses}`} to="/login"/>
            </li>
            <li className={` ${open
                ? "sm:block "
                : " mr-0 absolute top-1 right-12 md:static md:block"}`}>
              <Navicon_1.default label="SignUp" className={`  transition-none ${open ? "" : signupClasses}`} to="/signup"/>
            </li>
          </>)}

        <li onClick={() => NavToggle()} className=" cursor-pointer block md:hidden absolute right-5 top-2">
          {open ? <md_1.MdOutlineClose /> : <ri_1.RiMenu2Fill />}
        </li>
      </ul>
    </nav>);
};
exports.default = Header;
