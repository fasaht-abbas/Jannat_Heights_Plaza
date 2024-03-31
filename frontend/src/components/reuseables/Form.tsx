import React from "react";
import Button from "./Button";

interface FormType {
  name: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  btnName?: string;
}

const Form: React.FC<FormType> = ({
  name,
  onSubmit,
  children,
  className,
  btnName,
}) => {
  return (
    <form
      className={`${className}  w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 p-4 shadow-xl`}
      onSubmit={onSubmit}
    >
      <div className="w-full mb-2  text-center align-middle ">
        {" "}
        <p className="  font-main text-primary font-bold text-2xl">{name}</p>
      </div>
      {children}
      <div className="my-2 mt-6 flex justify-center align-bottom">
        <Button
          className=" hover:bg-opacity-80 w-full rounded-sm text-white"
          variant="primary"
          type="submit"
        >
          {btnName ? btnName : name}
        </Button>
      </div>
    </form>
  );
};

export default Form;
