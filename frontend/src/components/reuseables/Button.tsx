import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "success" | "accent";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  title?: string;
}
const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size = "md",
  onClick,
  children,
  type = "button",
  title,
}) => {
  return (
    <button
      title={title}
      type={type} // Use the provided type prop
      className={`bg-${variant} focus:ring-0  font-main  transition flex justify-center text-middle gap-2 hover:bg-opacity-60  bg-none  font-medium rounded-md text-sm px-4 py-2 ${size}  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
