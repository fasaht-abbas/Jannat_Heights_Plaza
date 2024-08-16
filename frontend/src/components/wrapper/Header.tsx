import React, { useState } from "react";
import Navicon from "../reuseables/Navicon";
import Logo from "../reuseables/Logo";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoutButton from "../reuseables/LogoutButton";

const Header = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [open, setOpen] = useState(false);
  // some styling tailwind classes for the login and sign up buttons

  const loginClasses =
    " border-primary py-1 md:py-2 border-2 bg-primary hover:bg-opacity-10 bg-primary text-white rounded-sm px-4";
  const signupClasses =
    " border-primary py-1 md:py-2  border-2 bg-primary hover:bg-opacity-10 bg-primary text-white rounded-sm px-3";

  // toggle funstion for opening/clossing
  const NavToggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <nav
      className={` sticky top-0 left-0 right-0 z-50 bg-white shadow-md ${
        open ? "h-100 " : "h-16 "
      } md:h-24`}
    >
      <ul className="relative  md:static text-center space-y-4 md:space-y-0 md:flex lg:flex py-6 px-2 md:justify-around items-center ">
        <li className={`${open ? "sm:block" : "hidden md:block"}`}>
          <Navicon label="Home" to="/" />
        </li>
        <li className={`${open ? "sm:block" : "hidden md:block"}`}>
          <Navicon label="Apartment" to="/apartments" />
        </li>
        {userData ? (
          <li className={`${open ? "sm:block" : "hidden md:block"}`}>
            <Navicon
              label="Bookings"
              to={
                userData?.role === "customer"
                  ? "/private/bookings"
                  : "/private/r2/bookings"
              }
            />
          </li>
        ) : (
          <li className={`${open ? "sm:block" : "hidden md:block"}`}>
            <Navicon label="Help" to="/help" />
          </li>
        )}

        <li className=" absolute left-5 top-0 md:static sm:block">
          <Logo className="cursor-pointer" link={true} />
        </li>
        {(loggedIn && userData?.role === "admin") ||
        userData?.role === "manager" ? (
          <li className={`${open ? "sm:block" : "hidden md:block"}`}>
            <Navicon label="Dashboard" to="/private/r2/manage-apartments" />
          </li>
        ) : (
          <li className={`${open ? "sm:block" : "hidden md:block"}`}>
            <Navicon label="Contact" to="/contact" />
          </li>
        )}
        {loggedIn ? (
          <>
            <li
              className={`${
                open
                  ? "sm:block "
                  : "absolute top-1 right-32 ml-0 md:static md:block"
              }`}
            >
              <Navicon label="Profile" to="/private/profile" />
            </li>
            <li
              className={` ${
                open
                  ? "sm:block "
                  : " mr-0 absolute top-1 right-12 md:static md:block"
              }`}
            >
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li
              className={`${
                open
                  ? "sm:block "
                  : "absolute top-1 right-32 ml-0 md:static md:block"
              }`}
            >
              <Navicon
                label="LogIn"
                className={` transition-none ${open ? "" : loginClasses}`}
                to="/login"
              />
            </li>
            <li
              className={` ${
                open
                  ? "sm:block "
                  : " mr-0 absolute top-1 right-12 md:static md:block"
              }`}
            >
              <Navicon
                label="SignUp"
                className={`  transition-none ${open ? "" : signupClasses}`}
                to="/signup"
              />
            </li>
          </>
        )}

        <li
          onClick={() => NavToggle()}
          className=" cursor-pointer block md:hidden absolute right-5 top-2"
        >
          {open ? <MdOutlineClose /> : <RiMenu2Fill />}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
