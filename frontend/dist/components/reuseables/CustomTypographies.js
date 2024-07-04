"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerealText = exports.SubHeadingText = exports.HeadingText = void 0;
const react_1 = __importDefault(require("react"));
const HeadingText = ({ text, className }) => {
    return (<p className={` ${className} font-bold font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl `}>
      {text}
    </p>);
};
exports.HeadingText = HeadingText;
const SubHeadingText = ({ text, className }) => {
    return (<p className={` ${className} font-main sm:text-md md:text-lg lg:text:xl `}>
      {text}
    </p>);
};
exports.SubHeadingText = SubHeadingText;
const GenerealText = ({ text, className }) => {
    return (<p className={` ${className} font-main text-xs sm:text-sm md:text-md lg:text:lg `}>
      {text}
    </p>);
};
exports.GenerealText = GenerealText;
