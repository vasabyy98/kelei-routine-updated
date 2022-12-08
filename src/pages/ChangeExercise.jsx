import React, { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// css
import layout from "../css/layout.module.css";
import btnStyles from "../css/btns.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";
import styles from "../css/signin.module.css";
// firebase crud
import { updateExercise } from "../firebase-config";
import { useUserAuth } from "../hooks/UserAuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
// components
import Nav from "../components/Nav";
// redux
import { useSelector } from "react-redux";

function ChangeExercise() {
  const { user } = useUserAuth();
  const exercise = useSelector((state) => state.selectedExercise);

  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const [exerciseData, setExerciseData] = useState({
    exerciseName: exercise.exerciseName,
    weight: exercise.weight,
    rm: exercise.rm,
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

    if (canProceed) {
      await updateExercise(exercise._id, data).then(() => {
        navigateOutFunction("/home");
      });
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
              <h2 className={`${header.heading__h2}`}>Change exercise</h2>
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
                  checked={rm === "3-5"}
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
                  checked={rm === "8-15"}
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
                  checked={rm === "15-20"}
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
              <span>Edit</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ChangeExercise;
