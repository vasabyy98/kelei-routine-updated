import React, { useState, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// gsap
import { gsap } from "gsap";
// css
import layout from "../css/layout.module.css";
import styles from "../css/repcounter.module.css";
import btnStyles from "../css/btns.module.css";
import header from "../css/header.module.css";

function RepCounter() {
  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const selectedExercise = useSelector((state) => state.selectedExercise);
  const { volume } = useSelector((state) => state.selectedExerciseSet);

  const navigate = useNavigate();

  const [completedReps, setCompletedReps] = useState(0);

  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);

  const addRep = () => {
    setCurrentReps((currentReps) => {
      return currentReps + 1;
    });
  };

  const substractRep = () => {
    if (currentReps > 0) {
      setCurrentReps((currentReps) => {
        return currentReps - 1;
      });
    }
  };

  const nextSetHandler = () => {
    setCompletedReps((completed) => {
      return completed + currentReps;
    });

    setCurrentReps(0);
    setCurrentSet((set) => {
      return set + 1;
    });
  };

  const actionContainer = useRef();
  const volumeAnimationNumber = useRef();
  const tl = useRef();

  const finishAnimation = () => {
    actionContainer.current.classList.add(styles.action__container__visible);

    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .fromTo(
          ".animate__completed--volume",
          {
            opacity: 0,
            y: 25,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "+0.1"
        )
        .fromTo(
          ".animate__completed--msg",
          {
            opacity: 0,
            y: 25,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "+0.5"
        )
        .to(
          volumeAnimationNumber.current,
          {
            innerText: completedReps,
            duration: 3,
            snap: {
              innerText: 1,
            },
            onComplete: () => {
              if (volume === "") {
                setTimeout(() => {
                  navigateOutFunction("/home");
                }, 250);
              } else {
                setTimeout(() => {
                  navigateOutFunction("/select-exercise");
                }, 250);
              }
            },
          },
          "+1"
        );
    }, actionContainer);
  };

  // smooth navigate out func
  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  return (
    <>
      <section className={layout.content__wrapper}>
        <div ref={actionContainer} className={`${layout.flex__layout} ${styles.action__container}`}>
          <header style={{ alignItems: "center" }} className={header.header}>
            <h1
              style={{ opacity: 0 }}
              className={`${styles.exercise__reps} ${"animate__completed--volume"}`}
            >
              <span ref={volumeAnimationNumber}>0</span>
            </h1>
            <p
              style={{ maxWidth: "unset", opacity: 0 }}
              className={`${header.subheading} ${"animate__completed--msg"}`}
            >
              Exercise is completed!
            </p>
          </header>
        </div>
        <div className={` ${layout.twoRow__grid__layout}`}>
          <div className={layout.flex__layout}>
            <div className={`${layout.flex__layout} ${styles.exercises__wrapper}`}>
              <header className={header.header}>
                <h2 className={`${header.heading__h2}`}>{selectedExercise.exerciseName}</h2>
              </header>
              <div className={`${styles.exercise__details__wrapper} `}>
                <div className={styles.exercise__details}>
                  <div className={`${styles.exercise__inner}`}>
                    <span>weight:</span>
                    <span style={{ textTransform: "capitalize" }}>
                      {selectedExercise.weight}
                      <span style={{ textTransform: "uppercase" }}>KG</span>
                    </span>
                  </div>
                  <div className={`${styles.exercise__inner}`}>
                    <span>Current set:</span>
                    <span style={{ textTransform: "capitalize" }}>{currentSet}</span>
                  </div>
                  {volume === "" ? (
                    <div className={`${styles.exercise__inner}`}>
                      <span>Completed reps:</span>
                      <span style={{ textTransform: "capitalize" }}>
                        {completedReps}
                        <span style={{ textTransform: "uppercase" }}></span>
                      </span>
                    </div>
                  ) : (
                    <div className={`${styles.exercise__inner}`}>
                      <span>Completed reps:</span>
                      <span style={{ textTransform: "capitalize" }}>
                        {completedReps}
                        {"/" + volume}
                        <span style={{ textTransform: "uppercase" }}></span>
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.exercise__reps}>{currentReps}</div>
                <div style={{ marginBottom: "0" }} className={btnStyles.btns__row}>
                  <button
                    onClick={substractRep}
                    className={`${btnStyles.btn}  ${btnStyles.secondaryBtn}`}
                  >
                    <span>Substract</span>
                  </button>

                  <button
                    onClick={addRep}
                    className={`${btnStyles.btn}  ${btnStyles.secondaryBtn}`}
                  >
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={btnStyles.btns__row}>
            <button
              onClick={finishAnimation}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
            >
              <span>Finish</span>
            </button>
            <button onClick={nextSetHandler} className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Next set</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default RepCounter;
