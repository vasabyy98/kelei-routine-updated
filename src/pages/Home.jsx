import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// utils
import {
  fadeInPageTransition,
  fadeOutTransition,
  fadeInTransition,
} from "../utils/animations/pageTransition";
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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedExercise, resetSelectedExercise } from "../features/selectedExerciseSlice";
import {
  setSelectedExerciseSet,
  resetSelectedExerciseSet,
} from "../features/selectedExerciseSetSlice";
import { setPopupType } from "../features/popupActionsType";
import { getExercises } from "../features/exercisesSlice";
import { getSets } from "../features/exercisesSetsSlice";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return <>{user !== null && <Content />}</>;
}

export default Home;

function Content() {
  const [greeting, setGreeting] = useState("Welcome back,");

  useLayoutEffect(() => {
    fadeInPageTransition();

    setGreeting(() => getGreeting());
  }, []);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("User");
  const { exercises } = useSelector((state) => state.exercises);
  const { exercisesSets } = useSelector((state) => state.exercisesSets);

  useEffect(() => {
    setUserName(user.displayName);
  }, [user]);

  useEffect(() => {
    if (user.uid !== undefined) {
      dispatch(getExercises(user));
      dispatch(getSets(user));

      dispatch(resetSelectedExercise());
      dispatch(resetSelectedExerciseSet());
    }
  }, [user, dispatch]);

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
  const [selectedLink, setSelectedLink] = useState("exercisesLink");

  const handleLink = (e) => {
    setSelectedLink(e.target.value);
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
          </div>
          <div ref={homeContainer} className={home.home__main}>
            {selectedLink === "exercisesLink" && <ExercisesWrapper exercises={exercises} />}
            {selectedLink === "exerciseSetsLink" && (
              <ExercisesSetWrapper exercisesSets={exercisesSets} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
function ExercisesWrapper({ exercises }) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    fadeInTransition(exercisesWrapper.current);
    return () => {
      fadeOutTransition(exercisesWrapper.current);
    };
  }, []);

  const exercisesWrapper = useRef();
  return (
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
  );
}

function ExercisesSetWrapper({ exercisesSets }) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    fadeInTransition(exercisesSetWrapper.current);
    return () => {
      fadeOutTransition(exercisesSetWrapper.current);
    };
  }, []);

  const exercisesSetWrapper = useRef();
  return (
    <div ref={exercisesSetWrapper} className={btnStyles.entry__wrapper}>
      {exercisesSets.map((set) => (
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
  );
}
