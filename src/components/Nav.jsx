import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// utils
import {
  fadeInPageTransition,
  fadeOutPageTransition,
  fadeOutTransition,
  fadeInTransition,
} from "../utils/animations/pageTransition";
// auth
import { logout } from "../firebase-config";
// assets
// assets
import { ReactComponent as SignOut } from "../assets/signout.svg";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import { ReactComponent as Add } from "../assets/add.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { ReactComponent as Back } from "../assets/backArrow.svg";
// css
import nav from "../css/nav.module.css";

function Nav({ homebtn, signoutBtn, backBtn, backBtnUrl, addBtn }) {
  const navigate = useNavigate();

  // POPUP NAV FUNCTIONALITY
  const [switchState, setSwitchState] = useState(false);

  const navSwitch = useRef();
  const navSwitchWrapper = useRef();
  const navbar = useRef();

  const navSwitchHandler = () => {
    if (!switchState) {
      setSwitchState(true);
      navSwitchWrapper.current.classList.add(nav.showSwitch);
      navSwitch.current.children[0].style.opacity = 0;
      navSwitch.current.children[1].style.opacity = 1;

      navbar.current.classList.add(nav.showNavbar);
    } else {
      setSwitchState(false);
      navSwitchWrapper.current.classList.remove(nav.showSwitch);
      navSwitch.current.children[0].style.opacity = 1;
      navSwitch.current.children[1].style.opacity = 0;

      navbar.current.classList.remove(nav.showNavbar);
    }
  };
  // SMOOTH PAGE TRANSITION
  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  return (
    <>
      <div onClick={navSwitchHandler} ref={navSwitchWrapper} className={nav.nav__switch__wrapper}>
        <div ref={navSwitch} className={nav.nav__switch}>
          <Hamburger className={nav.nav__svg} />
          <Close className={`${nav.nav__svg} ${nav.nav__svg__close}`} />
        </div>
      </div>
      <nav ref={navbar} className={nav.fixed__nav}>
        {signoutBtn && (
          <div onClick={() => logout()} className={nav.nav__btn}>
            <SignOut className={nav.nav__svg} />
          </div>
        )}
        {addBtn && (
          <div onClick={() => navigateOutFunction("/create-exercise")} className={nav.nav__btn}>
            <Add className={nav.nav__svg} />
          </div>
        )}
        {homebtn && (
          <div onClick={() => navigateOutFunction("/home")} className={nav.nav__btn}>
            <Home className={nav.nav__svg} />
          </div>
        )}
        {backBtn && (
          <div onClick={() => navigateOutFunction(backBtnUrl)} className={nav.nav__btn}>
            <Back className={nav.nav__svg} />
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;
