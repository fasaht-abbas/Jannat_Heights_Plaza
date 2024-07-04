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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const react_2 = require("react");
const framer_motion_2 = require("framer-motion");
const framer_motion_3 = require("framer-motion");
const RevealBottom = ({ children, className, delay, duration, ...rest }) => {
    const revealRef = (0, react_2.useRef)(null);
    const animation = (0, framer_motion_3.useAnimation)();
    const isInView = (0, framer_motion_2.useInView)(revealRef, { once: true });
    (0, react_1.useEffect)(() => {
        if (isInView) {
            animation.start("reveal");
        }
    }, [isInView]);
    return (<div ref={revealRef} className={`relative w-[100%] ${className}`}>
      <framer_motion_1.motion.div variants={{
            hidden: { opacity: 0, y: -75 },
            reveal: { opacity: 1, y: 0 },
        }} initial="hidden" animate={animation} transition={{
            duration: duration ? duration : 0.5,
            delay: delay ? delay : 0.25,
        }}>
        {children}
      </framer_motion_1.motion.div>
    </div>);
};
exports.default = RevealBottom;
