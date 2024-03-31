import React from "react";

const Loading = () => {
  return (
    <div>
      <div
        id="loader"
        className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 z-50 flex justify-center items-center gap-3"
      >
        <p className="text-primary font-main text-lg"> Loading Please Wait </p>
        <span className="animate-spin h-8 w-8   border-primary rounded-full text-3xl ">
          .
        </span>
      </div>
    </div>
  );
};

export default Loading;
