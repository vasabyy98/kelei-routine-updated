import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import {
  fadeInPageTransition,
  fadeOutPageTransition,
  fadeOutTransition,
  fadeInTransition,
} from "../utils/animations/pageTransition";
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
// components
import Nav from "../components/Nav";

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

      const q = query(collection(db, `users/${user.uid}/exercises`));

      (async () => {
        const data = await getDocs(q);

        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })();
    }
  }, [user, loading]);

  // HOME CONTAINER MAX HEIGHT
  const headerContainer = useRef();
  const homeContainer = useRef();

  useEffect(() => {
    const homeContainerOffsetTop = homeContainer.current.offsetTop;
    const headerContainerOffsetTop = headerContainer.current.offsetTop;
    const value = window.innerHeight - homeContainerOffsetTop - headerContainerOffsetTop * 2;

    homeContainer.current.style.maxHeight = `${value}px`;
  }, [homeContainer]);

  // NAV FUNCTIONALITY
  const [selectedLink, setSelectedLink] = useState("exercisesLink");

  const handleLink = (e) => {
    setSelectedLink(e.target.value);
  };

  const exercisesWrapper = useRef();
  // const timeTrackRef = useRef();

  useEffect(() => {
    if (selectedLink === "exercisesLink") {
      fadeInTransition(exercisesWrapper.current);
    } else {
      fadeOutTransition(exercisesWrapper.current);
    }
  }, [selectedLink]);

  // SMOOTH PAGE TRANSITION
  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  return (
    <>
      <Nav signoutBtn={true} addBtn={true} />
      <div className={home.backgroundImage}></div>
      <section className={layout.content__wrapper}>
        <div className={layout.threeRow__grid__layout}>
          <header ref={headerContainer} className={home.home__header}>
            <h2 className={`${header.heading__h2}`}>
              <span>{greeting}</span>
              <span style={{ textTransform: "capitalize" }}>{userName}</span>
            </h2>
          </header>
          <div className={home.home__nav}>
            <div className={`${home.nav__item} ${home.nav__item__active}`}>
              <input
                onChange={handleLink}
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
                onChange={handleLink}
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
                onChange={handleLink}
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
          <div ref={homeContainer} className={home.home__main}>
            {selectedLink === "exercisesLink" && (
              <div ref={exercisesWrapper} className={btnStyles.entry__wrapper}>
                {data.map((exercise) => (
                  <div className={btnStyles.entry__btn} key={exercise.id}>
                    <span className={btnStyles.entry__btn__name}>{exercise.data.exerciseName}</span>
                    <span className={btnStyles.entry__btn__details}>
                      ({exercise.data.rm + "rm, " + exercise.data.weight + "kg"})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
