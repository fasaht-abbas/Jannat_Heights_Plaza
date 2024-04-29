import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Button from "./Button";

const UnAuthorizedPage = () => {
  const [count, setCount] = useState(6);

  useEffect(() => {
    if (count > 0) {
      setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
  }, [count]);
  const goBack = () => {
    window.history.back();
  };
  return count > 0 ? (
    <Loading />
  ) : (
    <>
      <div className=" flex gap-6  flex-wrap text-3xl m-1 p-0  md:m-4  md:p-6 md:mt-12">
        <p>Page Not Found OR Access Denied</p>
        <Button
          type="button"
          className=" hover:bg-opacity-5 bg-opacity-5"
          onClick={goBack}
        >
          Go Back
        </Button>
      </div>
    </>
  );
};

export default UnAuthorizedPage;
