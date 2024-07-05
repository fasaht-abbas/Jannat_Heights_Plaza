import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UnAuthorizedPage = () => {
  const [count, setCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer); // Clean up the interval on component unmount
    }
  }, [count]);

  const goBack = () => {
    window.history.back();
  };

  return count > 0 ? (
    <Loading />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full max-w-md text-center">
        <h1 className="text-4xl font-semibold text-red-600 mb-6">
          Access Denied
        </h1>
        <p className="text-lg text-gray-700 mb-6">Login Now to Continue</p>
        <div className="flex flex-wrap justify-evenly">
          <Button
            type="button"
            className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary-dark transition duration-200"
            onClick={goBack}
          >
            Go Back
          </Button>
          <Button
            type="button"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-200"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorizedPage;
