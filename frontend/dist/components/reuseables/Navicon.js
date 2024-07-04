"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const Navicon = ({ to, label, active, className, footicon = false, onClickHandler, }) => {
    const location = (0, react_router_dom_2.useLocation)();
    if (location.pathname === to) {
        active = true;
    }
    else {
        active = false;
    }
    return (<react_router_dom_1.Link to={to ? to : ""} onClick={onClickHandler ? onClickHandler : (e) => { }} className={footicon
            ? ` transition-all text-white font-accent font-extrabold tracking-wider border-white lg:hover:border-b-2 p-2 text-sm md:text-lg`
            : `text-sm md:text-lg  transition-all  duration-100 font-accent p-2 hover:text-primary md:hover:border-b-2 border-primary  tracking-wider font-extrabold ${className} ${active ? "md:border-b-2 lg:border-b-2 text-primary" : ""}  `}>
      {label}
    </react_router_dom_1.Link>);
};
exports.default = Navicon;
