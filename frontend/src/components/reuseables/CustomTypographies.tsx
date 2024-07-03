import React from "react";

interface textTypo {
  text: string;
  className?: string;
}

export const HeadingText: React.FC<textTypo> = ({ text, className }) => {
  return (
    <p
      className={` ${className} font-bold font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl `}
    >
      {text}
    </p>
  );
};
export const SubHeadingText: React.FC<textTypo> = ({ text, className }) => {
  return (
    <p className={` ${className} font-main sm:text-md md:text-lg lg:text:xl `}>
      {text}
    </p>
  );
};
export const GenerealText: React.FC<textTypo> = ({ text, className }) => {
  return (
    <p
      className={` ${className} font-main text-xs sm:text-sm md:text-md lg:text:lg `}
    >
      {text}
    </p>
  );
};
