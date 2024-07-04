"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMatch = exports.validateInput = exports.env = void 0;
const envalid_1 = require("envalid");
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    REACT_APP_API_BASE_URL: (0, envalid_1.str)(),
    REACT_APP_GOOGLE_CLIENT_ID: (0, envalid_1.str)(),
});
const ErrorBottom = "2px solid red";
// validation of any input
const validateInput = (ref, regex) => {
    if (ref.current) {
        const isValid = regex.test(ref.current.value);
        if (ref.current.value === null || !isValid) {
            ref.current.style.borderBottom = ErrorBottom;
            ref.current.focus();
            return false;
        }
        else {
            ref.current.style.borderBottom = "";
            return true;
        }
    }
    return false;
};
exports.validateInput = validateInput;
// validate pass match
const validateMatch = (ref1, ref2) => {
    if (ref1.current && ref2.current) {
        if (ref1.current.value === ref2.current.value) {
            ref2.current.style.borderBottom = "";
            return true;
        }
        else {
            ref2.current.style.borderBottom = ErrorBottom;
            ref2.current.focus();
            return false;
        }
    }
    return false;
};
exports.validateMatch = validateMatch;
