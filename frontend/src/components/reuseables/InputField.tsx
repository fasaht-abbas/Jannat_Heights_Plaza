import React from "react";
import { ChangeEvent } from "react";
import { forwardRef } from "react";
import Button from "./Button";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  button?: React.ReactNode;
  containerClass?: string;
  className?: string;
  disabled?: Boolean;
  label?: string;
  width?: string;
}
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = "text",
      disabled = false,
      placeholder,
      className,
      containerClass,
      value,
      onChange,
      button,
      width,
      label,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={`${containerClass} mt-4 grid grid-cols-12 items-center justify-start gap-0 `}
      >
        <p className="text-secondary  col-span-2 font-bold  text-sm  md:text-lg">
          {label}
        </p>
        <div
          className={`${
            label ? "col-span-8" : "col-span-12"
          }  flex justify-start gap-2`}
        >
          <input
            disabled={disabled ? true : false}
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={` text-sm  md:text-lg bg-opacity-0 disabled:bg-opacity-0  bg-accent border-b my-1 border-secondary p-1 text-primary focus:outline-none ${className} ${
              width ? width : "w-full"
            } `}
            {...rest}
          />
          {button ? (
            <Button
              className=" col-span-2  p-0 m-0 border-primary border-1  bg-opacity-0 text-primary hover:bg-opacity-5 text-xs "
              variant="primary"
              type="button"
            >
              {button}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);

export default InputField;
