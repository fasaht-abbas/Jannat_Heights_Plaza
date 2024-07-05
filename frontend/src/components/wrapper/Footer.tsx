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
  const socialIconClasses = "text-white text-lg cursor-pointer md:text-2xl";

  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-center text-sm font-thin tracking-wider font-main max-w-2xl mb-4">
            Welcome to Jannat Heights! Enjoy fully furnished bedrooms, equipped
            kitchens, modern amenities, and a convenient location for a
            hassle-free lifestyle.
          </p>
          <ul className="flex list-none justify-center space-x-4 gap-4 mt-6 flex-wrap mb-4">
            <li>
              <Navicon footicon label="Home" to="/" />
            </li>
            <li>
              <Navicon footicon label="Appartments" to="/apartments" />
            </li>
            <li>
              <Navicon footicon label="Contact" to="/contact" />
            </li>
            {!loggedIn && (
              <>
                <li>
                  <Navicon footicon label="LogIn" to="/login" />
                </li>
                <li>
                  <Navicon footicon label="SignUp" to="/signup" />
                </li>
              </>
            )}
          </ul>

          <div className="my-4">
            <Logo className="text-white mx-auto" />
          </div>

          <ul className="flex list-none justify-center space-x-4 gap-4 mt-6 flex-wrap mb-4">
            <li>
              <a
                href="https://www.facebook.com"
                rel="noreferrer"
                target="_blank"
              >
                <FaFacebook className={socialIconClasses} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                rel="noreferrer"
                target="_blank"
              >
                <FaInstagram className={socialIconClasses} />
              </a>
            </li>
            <li>
              <a
                href="https://www.whatsapp.com"
                rel="noreferrer"
                target="_blank"
              >
                <FaWhatsapp className={socialIconClasses} />
              </a>
            </li>
          </ul>

          <p className="text-center text-sm font-main mb-2">
            F Sector, Commercial # 13,
            <br />
            Bahria Town, Lahore
          </p>

          <p className="text-center text-sm font-main">
            Copyright © 2024 The Jannat Heights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
