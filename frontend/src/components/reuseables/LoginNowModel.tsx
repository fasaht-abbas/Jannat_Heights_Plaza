import { SubHeadingText } from "./CustomTypographies";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import PopIn from "../Animations/PopIn";

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginNowModel: React.FC<props> = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  return isOpen ? (
    <div className=" z-50 backdrop-blur-sm  fixed top-0 left-0  h-screen flex  justify-center align-middle items-center w-full">
      <PopIn delay={0} className="  w-full ">
        <div
          className="mx-auto w-5/6  md:w-1/2 bg-white  shadow-2xl border-opacity-20 border-accent border-2 rounded-md  p-4 md:p-8 gap-4 flex
         flex-col"
        >
          <SubHeadingText
            className="primary"
            text="Not logged in... SignIn to continue"
          />

          <div className=" flex justify-end gap-4">
            <Button
              variant="primary"
              onClick={onClose}
              className=" bg-opacity-10 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className=" text-white"
              onClick={() => {
                navigate("/login");
              }}
            >
              login Now
            </Button>
          </div>
        </div>
      </PopIn>
    </div>
  ) : null;
};

export default LoginNowModel;
