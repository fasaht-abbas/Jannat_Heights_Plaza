import Button from "./Button";
import { FaGoogle } from "react-icons/fa";
import { env } from "../../utils/validate";
import { handleError } from "../../utils/axios";
const GoogleLoginButton = () => {
  const handleGoogleSignUp = async () => {
    try {
      window.open(env.REACT_APP_API_BASE_URL + "/api/v1/auth/google", "_self");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Button
      onClick={handleGoogleSignUp}
      type="button"
      className="  mt-6 w-full hover:bg-primary hover:bg-opacity-10 bg-white text-secondary border-2 rounded-sm"
    >
      <FaGoogle size={20} /> Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
