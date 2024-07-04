"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Navicon_1 = __importDefault(require("../reuseables/Navicon"));
const Logo_1 = __importDefault(require("../reuseables/Logo"));
const fa_1 = require("react-icons/fa");
const react_redux_1 = require("react-redux");
const Footer = () => {
    const loggedIn = (0, react_redux_1.useSelector)((state) => state.auth.isAuthenticated);
    const socialIconClasses = "text-white text-lg cursor-pointer  md:text-2xl";
    return (<>
      <div className=" flex flex-col bg-primary py-6 px-4  ">
        <p className=" ml-4  text-sm font-thin tracking-wide text-center font-main  text-white">
          Soppose that this is the information that will be written about the
          plaza maybe its the special notice or some other special announcemnets
          of some timing boundaries or the special fustions etc{" "}
        </p>

        <ul className="flex list-none justify-center space-x-4 gap-4 mt-6  m-4 flex-wrap">
          <li>
            <Navicon_1.default footicon label="Home" to="/"/>
          </li>
          <li>
            <Navicon_1.default footicon label="Appartment" to="/apartments"/>
          </li>
          <li>
            <Navicon_1.default footicon label="Hall" to="/halls"/>
          </li>
          <li>
            <Navicon_1.default footicon label="Contact" to="/contact"/>
          </li>
          {loggedIn ? (<></>) : (<>
              <li>
                <Navicon_1.default footicon label="LogIn" to="/login"/>
              </li>
              <li>
                <Navicon_1.default footicon label="SignUp" to="/signup"/>
              </li>{" "}
            </>)}
        </ul>

        <div className="my-4 flex justify-center">
          <Logo_1.default className="text-white"/>
        </div>

        <ul className="flex list-none justify-center space-x-4 gap-4 mt-6  m-4 flex-wrap">
          <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
            <fa_1.FaFacebook className={socialIconClasses}/>
          </a>
          <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
            <fa_1.FaInstagram className={socialIconClasses}/>
          </a>
          <a href="https://www.whatsapp.com" rel="noreferrer" target="_blank">
            <fa_1.FaWhatsapp className={socialIconClasses}/>
          </a>
        </ul>

        <p className="text-center text-sm text-white font-main">
          Copyright © 2024 The jannat Heights. All Rights reserved.
        </p>
      </div>
    </>);
};
exports.default = Footer;
