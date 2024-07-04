"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Logo = ({ className, link = false }) => {
    const handleClick = () => {
        if (link) {
            navigate("/");
        }
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<p onClick={handleClick} className={` ${className}  tracking-tight font-heading font-extrabold text-3xl md:text-5xl text-primary`}>
      JH
    </p>);
};
exports.default = Logo;
