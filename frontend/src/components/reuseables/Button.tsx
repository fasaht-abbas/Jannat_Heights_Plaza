import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  onClick,
  children,
  type = "button",
}) => {
  return (
    <button
      type={type} // Use the provided type prop
      className={`bg-${variant} ${className} font-main text-${variant} transition flex justify-center text-middle gap-2 hover:bg-${variant} focus:ring-4 focus:ring-${variant} font-medium rounded-md text-sm px-4 py-2 ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
