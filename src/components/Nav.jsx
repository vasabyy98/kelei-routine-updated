import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { fadeOutPageTransition } from "../utils/animations/pageTransition";
// hooks
import { useUserAuth } from "../hooks/UserAuthContext";
// css
import btnStyles from "../css/btns.module.css";
// assets
import { ReactComponent as SignOut } from "../assets/signout.svg";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import { ReactComponent as Add } from "../assets/add.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { ReactComponent as Back } from "../assets/backArrow.svg";
// css
import nav from "../css/nav.module.css";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setPopupType, resetPopupType } from "../features/popupActionsType";
import { deleteExercise, getExercises } from "../features/exercisesSlice";
import { deleteSet } from "../features/exercisesSetsSlice";
import { resetSelectedExercise } from "../features/selectedExerciseSlice";
import { resetSelectedExerciseSet } from "../features/selectedExerciseSetSlice";

function Nav({ homebtn, signoutBtn, backBtn, backBtnUrl, addBtn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logOut } = useUserAuth();
  const { user } = useUserAuth();

  const popupType = useSelector((state) => state.popupActionType.popupType);
  const selectedExercise = useSelector((state) => state.selectedExercise);
  const selectedExerciseSet = useSelector((state) => state.selectedExerciseSet);

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
  // ADD NEW POPUP
  const [addWrapperVisible, setAddWrapperVisible] = useState(false);
  const addWrapper = useRef();

  useEffect(() => {
    if (addWrapperVisible === true) {
      addWrapper.current.classList.add(nav.show__options);
    } else {
      addWrapper.current.classList.remove(nav.show__options);
    }
  }, [addWrapperVisible]);

  useEffect(() => {
    if (popupType === "exerciseOptions") {
      setAddWrapperVisible(true);
    } else if (popupType === "exerciseSetOptions") {
      setAddWrapperVisible(true);
    } else if (popupType === "addEntry") {
      setAddWrapperVisible(true);
    } else {
      setAddWrapperVisible(false);
    }
  }, [popupType]);

  // SMOOTH PAGE TRANSITION
  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  // logOut
  const handleLogOut = async () => {
    logOut();
    navigateOutFunction("/");
  };
  // delete exercise
  const onDeleteExercise = () => {
    dispatch(deleteExercise(selectedExercise._id))
      .then(() => dispatch(getExercises(user)))
      .then(() => dispatch(resetPopupType()));
  };
  // open exercise rep counter page
  const onStartWorkout = () => {
    navigateOutFunction("/rep-counter");
    setTimeout(() => {
      dispatch(resetPopupType());
    }, 300);
  };
  // edit exercise
  const onEditExercise = () => {
    navigateOutFunction("/change-exercise");
    setTimeout(() => {
      dispatch(resetPopupType());
    }, 300);
  };
  // delete exercise set
  const onDeleteExerciseSet = () => {
    dispatch(deleteSet(selectedExerciseSet._id))
      // .then(() => setAddWrapperVisible(false))
      .then(() => dispatch(resetPopupType()));
  };
  // edit exercise set
  const onEditExerciseSet = () => {
    navigateOutFunction("/change-exerciseset");
    setTimeout(() => {
      dispatch(resetPopupType());
    }, 300);
  };
  // create exercise or set
  const onCreate = (url) => {
    navigateOutFunction(url);
    setTimeout(() => {
      dispatch(resetPopupType());
    }, 300);
  };

  // on exercise set start workout
  const onSetClick = () => {
    navigateOutFunction("/select-exercise");
    setTimeout(() => {
      dispatch(resetPopupType());
    }, 300);
  };

  const hideOptions = () => {
    dispatch(resetSelectedExercise());
    dispatch(resetSelectedExerciseSet());
    dispatch(resetPopupType());
  };
  return (
    <>
      <div ref={addWrapper} className={nav.add__wrapper}>
        <div className={btnStyles.btns__col}>
          {popupType === "addEntry" && (
            <>
              <button
                onClick={() => onCreate("/create-exercise")}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              >
                <span>Exercise</span>
              </button>
              <button
                onClick={() => onCreate("/create-exerciseset")}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              >
                <span>Exercise Set</span>
              </button>
              <button
                onClick={hideOptions}
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
              >
                <span>Nothing</span>
              </button>
            </>
          )}
          {popupType === "exerciseOptions" && (
            <>
              <button
                onClick={onEditExercise}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              >
                <span>Edit</span>
              </button>
              <button
                onClick={onDeleteExercise}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              >
                <span>Delete</span>
              </button>
              <button
                onClick={onStartWorkout}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              >
                <span>Start workout</span>
              </button>
              <button
                onClick={hideOptions}
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
              >
                <span>Nothing</span>
              </button>
            </>
          )}
          {popupType === "exerciseSetOptions" && (
            <>
              <button
                onClick={onEditExerciseSet}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              >
                <span>Edit</span>
              </button>
              <button
                onClick={onDeleteExerciseSet}
                className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
              >
                <span>Delete</span>
              </button>
              <button onClick={onSetClick} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                <span>Start workout</span>
              </button>
              <button
                onClick={hideOptions}
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
              >
                <span>Nothing</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div onClick={navSwitchHandler} ref={navSwitchWrapper} className={nav.nav__switch__wrapper}>
        <div ref={navSwitch} className={nav.nav__switch}>
          <Hamburger className={nav.nav__svg} />
          <Close className={`${nav.nav__svg} ${nav.nav__svg__close}`} />
        </div>
      </div>
      <nav ref={navbar} className={nav.fixed__nav}>
        {signoutBtn && (
          <div onClick={() => handleLogOut()} className={nav.nav__btn}>
            <SignOut className={nav.nav__svg} />
          </div>
        )}
        {addBtn && (
          <div
            onClick={() => {
              dispatch(setPopupType("addEntry"));
              setAddWrapperVisible(true);
            }}
            className={nav.nav__btn}
          >
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
