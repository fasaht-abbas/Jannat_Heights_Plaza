import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NaviconProps {
  to?: string;
  label: string;
  active?: Boolean;
  className?: string;
  footicon?: Boolean;
  onClickHandler?: (e: React.MouseEvent) => void;
}
const Navicon: React.FC<NaviconProps> = ({
  to,
  label,
  active,
  className,
  footicon = false,
  onClickHandler,
}) => {
  const location = useLocation();
  if (location.pathname === to) {
    active = true;
  } else {
    active = false;
  }
  return (
    <Link
      to={to ? to : ""}
      onClick={onClickHandler ? onClickHandler : (e: React.MouseEvent) => {}}
      className={
        footicon
          ? ` transition-all text-white font-accent font-extrabold tracking-wider border-white lg:hover:border-b-2 p-2 text-sm md:text-lg`
          : `text-sm md:text-lg  transition-all  duration-100 font-accent p-2 hover:text-primary md:hover:border-b-2 border-primary  tracking-wider font-extrabold ${className} ${
              active ? "md:border-b-2 lg:border-b-2 text-primary" : ""
            }  `
      }
    >
      {label}
    </Link>
  );
};

export default Navicon;
