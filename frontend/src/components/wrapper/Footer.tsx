import React from "react";
import Navicon from "../reuseables/Navicon";
import Logo from "../reuseables/Logo";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Footer = () => {
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const socialIconClasses = "text-white text-lg cursor-pointer  md:text-2xl";

  return (
    <>
      <div className=" flex flex-col bg-primary py-6 px-4  ">
        <p className=" ml-4  text-sm font-thin tracking-wide text-center font-main  text-white">
          Soppose that this is the information that will be written about the
          plaza maybe its the special notice or some other special announcemnets
          of some timing boundaries or the special fustions etc{" "}
        </p>

        <ul className="flex list-none justify-center space-x-4 gap-4 mt-6  m-4 flex-wrap">
          <li>
            <Navicon footicon label="Home" to="/" />
          </li>
          <li>
            <Navicon footicon label="Appartment" to="/appartments" />
          </li>
          <li>
            <Navicon footicon label="Hall" to="/halls" />
          </li>
          <li>
            <Navicon footicon label="Contact" to="/contact" />
          </li>
          {loggedIn ? (
            <></>
          ) : (
            <>
              <li>
                <Navicon footicon label="LogIn" to="/login" />
              </li>
              <li>
                <Navicon footicon label="SignUp" to="/signup" />
              </li>{" "}
            </>
          )}
        </ul>

        <div className="my-4 flex justify-center">
          <Logo className="text-white" />
        </div>

        <ul className="flex list-none justify-center space-x-4 gap-4 mt-6  m-4 flex-wrap">
          <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
            <FaFacebook className={socialIconClasses} />
          </a>
          <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
            <FaInstagram className={socialIconClasses} />
          </a>
          <a href="https://www.whatsapp.com" rel="noreferrer" target="_blank">
            <FaWhatsapp className={socialIconClasses} />
          </a>
        </ul>

        <p className="text-center text-sm text-white font-main">
          Copyright © 2024 The jannat Heights. All Rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
