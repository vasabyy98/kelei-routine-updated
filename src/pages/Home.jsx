import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// auth
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, db } from "../firebase-config";
// firebase crud
import { collection, getDocs, query } from "firebase/firestore";
// get greeting
import { getGreeting } from "../utils/getTime";
// css
import layout from "../css/layout.module.css";
import home from "../css/home.module.css";
import btnStyles from "../css/btns.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
// assets
import { ReactComponent as SignOut } from "../assets/signout.svg";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import { ReactComponent as Add } from "../assets/add.svg";
import { ReactComponent as Close } from "../assets/close.svg";

function Home() {
  const [greeting, setGreeting] = useState("Welcome back,");

  useLayoutEffect(() => {
    fadeInPageTransition();

    setGreeting(() => getGreeting());
  }, []);

  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/");
    } else {
      setUserName(user.displayName);

      const q = query(collection(db, `users/${user.uid}/habits`));

      (async () => {
        const data = await getDocs(q);

        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })();
    }
  }, [user, loading]);

  // POPUP NAV FUNCTIONALITY
  const [switchState, setSwitchState] = useState(false);

  const navSwitch = useRef();
  const navSwitchWrapper = useRef();
  const navbar = useRef();

  const navSwitchHandler = () => {
    if (!switchState) {
      setSwitchState(true);
      navSwitch.current.classList.add(nav.showSwitch);
      navSwitch.current.children[0].style.opacity = 0;
      navSwitch.current.children[1].style.opacity = 1;

      navbar.current.classList.add(nav.showNavbar);
    } else {
      setSwitchState(false);
      navSwitch.current.classList.remove(nav.showSwitch);
      navSwitch.current.children[0].style.opacity = 1;
      navSwitch.current.children[1].style.opacity = 0;

      navbar.current.classList.remove(nav.showNavbar);
    }
  };

  const [selectedLink, setSelectedLink] = useState("exercisesLink");

  const handleLink = (e) => {
    setSelectedLink(e.target.value);
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
        <div onClick={() => logout()} className={nav.nav__btn}>
          <SignOut className={nav.nav__svg} />
        </div>
        <div onClick={() => navigateOutFunction("/create-habit")} className={nav.nav__btn}>
          <Add className={nav.nav__svg} />
        </div>
      </nav>
      <div className={home.backgroundImage}></div>
      <section className={layout.content__wrapper}>
        <div className={layout.threeRow__grid__layout}>
          <header className={home.home__header}>
            <h2 className={`${header.heading__h2}`}>
              <span>{greeting}</span>
              <span style={{ textTransform: "capitalize" }}>{userName}</span>
            </h2>
          </header>
          <div className={home.home__nav}>
            <div className={`${home.nav__item} ${home.nav__item__active}`}>
              <input
                onClick={handleLink}
                id="exercises"
                type="radio"
                value="exercisesLink"
                name="nav"
                checked={selectedLink === "exercisesLink"}
                className={home.nav__item__radio}
              />
              <label className={home.nav__item__label} htmlFor="exercises">
                Exercises
              </label>
            </div>
            <div className={`${home.nav__item} `}>
              <input
                onClick={handleLink}
                id="exerciseSets"
                type="radio"
                value="exerciseSetsLink"
                name="nav"
                className={home.nav__item__radio}
              />
              <label className={home.nav__item__label} htmlFor="exerciseSets">
                Exercise sets
              </label>
            </div>
            <div className={home.nav__item}>
              <input
                onClick={handleLink}
                id="plans"
                type="radio"
                value="plansLink"
                name="nav"
                className={home.nav__item__radio}
              />
              <label className={home.nav__item__label} htmlFor="plans">
                Plans
              </label>
            </div>
          </div>
          <div className={home.home__main}></div>
          {/* <div className={btnStyles.btns__row}>
            <button onClick={() => logout()} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Log out</span>
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Home;
