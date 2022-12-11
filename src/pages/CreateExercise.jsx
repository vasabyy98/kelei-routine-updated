import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// css
import layout from "../css/layout.module.css";
import btnStyles from "../css/btns.module.css";
import header from "../css/header.module.css";
import styles from "../css/signin.module.css";
// redux
import { createNewExercise } from "../features/exercisesSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateExercise() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const { exercises } = useSelector((state) => state.exercises);

  useEffect(() => {
    // navigateOutFunction("/home");
  }, [exercises]);

  const [exerciseData, setExerciseData] = useState({
    exerciseName: "",
    weight: "",
    rm: "8-12",
  });

  const { exerciseName, weight, rm } = exerciseData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const exerciseNameInput = useRef();
  const weightInput = useRef();

  let canProceed = false;

  const checkEmptyInputs = () => {
    if (exerciseName === "" && weight === "") {
      exerciseNameInput.current.scrollIntoView();
    } else if (weight === 0) {
      weightInput.current.scrollIntoView();
    } else if (exerciseName !== "" && weight !== "") {
      canProceed = true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    checkEmptyInputs();

    const data = {
      exerciseName,
      weight,
      rm,
    };

    const result = { data, user };

    if (canProceed) {
      dispatch(createNewExercise(result));
      navigateOutFunction("/home");
    }
  };

  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  return (
    <>
      <section className={layout.content__wrapper}>
        <form onSubmit={onSubmit} className={`${styles.form} ${layout.twoRow__grid__layout}`}>
          <div className={styles.form__inner}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2}`}>Create new exercise</h2>
              <p style={{ maxWidth: "unset" }} className={`${header.subheading}`}>
                Set exercise name, weight and choose the repetition range.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group} `}>
                <input
                  ref={exerciseNameInput}
                  type="text"
                  className={styles.form__control}
                  id="exerciseName"
                  name="exerciseName"
                  value={exerciseName}
                  onChange={onChange}
                  placeholder="Exercise name"
                />
                <div className={styles.form__control__selected}></div>
              </div>
              <div className={`${styles.form__group} `}>
                <input
                  ref={weightInput}
                  type="number"
                  className={styles.form__control}
                  id="weight"
                  value={weight}
                  onChange={onChange}
                  name="weight"
                  placeholder="Weight(kg)"
                />
                <div className={styles.form__control__selected}></div>
              </div>
            </div>
            <div className={`${styles.input__wrapper} ${styles.radio__wrapper__row}`}>
              <div className={`${styles.form__group} `}>
                <div className={`${styles.form__control}`}>
                  <span>3-5</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="3-5"
                  name="rm"
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group} `}>
                <div className={`${styles.form__control}`}>
                  <span>8-12</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="8-12"
                  name="rm"
                  checked={rm === "8-12"}
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group}`}>
                <div className={`${styles.form__control}`}>
                  <span>8-15</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="8-15"
                  name="rm"
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group}`}>
                <div className={`${styles.form__control}`}>
                  <span>15-20</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="15-20"
                  name="rm"
                  className={styles.form__control__radio}
                />
              </div>
            </div>
          </div>
          <div className={btnStyles.btns__row}>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigateOutFunction("/home");
              }}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
            >
              <span>Cancel</span>
            </button>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Create</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateExercise;
