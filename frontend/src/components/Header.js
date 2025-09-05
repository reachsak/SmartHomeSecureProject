import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import "./NavBar.css";
import "./logo.png";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import "react-awesome-button/dist/styles.css";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from "react-awesome-button";

function Header({ isConnected, connectToMetamask }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const handleClickk = () => {
    connectToMetamask();
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span className="icon">
              <img src={require("./logo.png")} alt="Logo" />
            </span>
            <span className="text">SmartHomeSecure Chatbot</span>
            {/* <i className="fas fa-code"></i> */}
            <span className="icon">
              <CodeIcon />
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/aillm"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                AI Assistant
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
