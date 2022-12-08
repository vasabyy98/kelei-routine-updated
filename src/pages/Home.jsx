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
import { useUserAuth } from "../hooks/UserAuthContext";
// firebase crud
import { getData } from "../firebase-config";
// get greeting
import { getGreeting } from "../utils/getTime";
// css
import layout from "../css/layout.module.css";
import home from "../css/home.module.css";
import btnStyles from "../css/btns.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
// components
import Nav from "../components/Nav";
// redux
import { useDispatch } from "react-redux";
import { setSelectedExercise } from "../features/selectedExerciseSlice";
import { setSelectedExerciseSet } from "../features/selectedExerciseSetSlice";
import { setPopupType } from "../features/popupActionsType";

function Home() {
  // const [user, loading, error] = useAuthState(auth);
  const { user } = useUserAuth();

  return <>{user !== null && <Content />}</>;
}

export default Home;

function Content() {
  const [greeting, setGreeting] = useState("Welcome back,");

  useLayoutEffect(() => {
    fadeInPageTransition();

    setGreeting(() => getGreeting());
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useUserAuth();

  const [userName, setUserName] = useState("User");
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    getData(`users/${user.uid}/exercises`, setExercises);
    getData(`users/${user.uid}/exercisesSets`, setSets);
  }, [user]);

  useEffect(() => {
    setUserName(user.displayName);
  }, [user]);

  // HOME CONTAINER MAX HEIGHT
  const headerContainer = useRef();
  const homeContainer = useRef();

  useEffect(() => {
    if (exercises.length > 0) {
      const homeContainerOffsetTop = homeContainer.current.offsetTop;
      const headerContainerOffsetTop = headerContainer.current.offsetTop;
      const value = window.innerHeight - homeContainerOffsetTop - headerContainerOffsetTop * 2;

      homeContainer.current.style.maxHeight = `${value}px`;
    }
  }, [exercises]);

  // NAV FUNCTIONALITY
  const exercisesWrapper = useRef();
  const exercisesSetWrapper = useRef();

  const [selectedLink, setSelectedLink] = useState("exercisesLink");

  const handleLink = (e) => {
    setSelectedLink(e.target.value);
  };

  useEffect(() => {
    if (exercises.length > 0) {
      if (selectedLink === "exercisesLink") {
        fadeInTransition(exercisesWrapper.current);
      } else if (selectedLink === "exerciseSetsLink") {
        fadeInTransition(exercisesSetWrapper.current);
      }
    }
  }, [selectedLink]);
  return (
    <>
      <Nav
        signoutBtn={true}
        addBtn={true}
        setExercises={setExercises}
        exercises={exercises}
        sets={sets}
        setSets={setSets}
      />
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
          </div>
          {/* {data.length !== 0 && ( */}
          <div ref={homeContainer} className={home.home__main}>
            {selectedLink === "exercisesLink" && (
              <div ref={exercisesWrapper} className={btnStyles.entry__wrapper}>
                {exercises.map((exercise) => (
                  <div
                    onClick={() => {
                      dispatch(setSelectedExercise(exercise));
                      dispatch(setPopupType("exerciseOptions"));
                    }}
                    className={btnStyles.entry__btn}
                    key={exercise.id}
                  >
                    <span className={btnStyles.entry__btn__name}>{exercise.data.exerciseName}</span>
                    <span className={btnStyles.entry__btn__details}>
                      ({exercise.data.rm + "rm, " + exercise.data.weight + "kg"})
                    </span>
                  </div>
                ))}
              </div>
            )}
            {selectedLink === "exerciseSetsLink" && (
              <div ref={exercisesSetWrapper} className={btnStyles.entry__wrapper}>
                {sets.map((set) => (
                  <div
                    onClick={() => {
                      dispatch(setSelectedExerciseSet(set));
                      dispatch(setPopupType("exerciseSetOptions"));
                    }}
                    className={btnStyles.entry__btn}
                    key={set.id}
                  >
                    <span className={btnStyles.entry__btn__name}>{set.data.exerciseSetName}</span>
                    <span className={btnStyles.entry__btn__details}>
                      ({set.data.routine + ", " + set.data.volume})
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
