import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  REACT_APP_API_BASE_URL: str(),
  REACT_APP_GOOGLE_CLIENT_ID: str(),
});

const ErrorBottom = "2px solid red";
// validation of any input
export const validateInput = (
  ref: React.RefObject<HTMLInputElement>,
  regex: RegExp
): boolean => {
  if (ref.current) {
    const isValid = regex.test(ref.current.value);
    if (ref.current.value === null || !isValid) {
      ref.current.style.borderBottom = ErrorBottom;
      ref.current.focus();
      return false;
    } else {
      ref.current.style.borderBottom = "";
      return true;
    }
  }
  return false;
};

// validate pass match
export const validateMatch = (
  ref1: React.RefObject<HTMLInputElement>,
  ref2: React.RefObject<HTMLInputElement>
): Boolean => {
  if (ref1.current && ref2.current) {
    if (ref1.current.value === ref2.current.value) {
      ref2.current.style.borderBottom = "";
      return true;
    } else {
      ref2.current.style.borderBottom = ErrorBottom;
      ref2.current.focus();
      return false;
    }
  }
  return false;
};
