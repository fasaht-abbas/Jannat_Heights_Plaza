import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const UnAuthorizedPage = () => {
  const [count, setCount] = useState(6);

  useEffect(() => {
    if (count > 0) {
      setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
  }, [count]);

  return count > 0 ? <Loading /> : <>Unauthorized</>;
};

export default UnAuthorizedPage;
