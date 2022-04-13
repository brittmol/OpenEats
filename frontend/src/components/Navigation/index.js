import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../Auth/LoginFormModal";
import SignupFormModal from "../Auth/SignupFormModal";
import logo from "../../images/open_table_icon.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal btnName={"Log In"} />
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav>
      <div className="nav-bar">
        <div className="left-bar">
          <NavLink exact to="/">
            <div className="logo">
              <img src={logo} alt="logo" />
              <p>OpenEats</p>
            </div>
          </NavLink>
        </div>
        <div className="right-bar">{isLoaded && sessionLinks}</div>
      </div>
    </nav>
  );
}

export default Navigation;
