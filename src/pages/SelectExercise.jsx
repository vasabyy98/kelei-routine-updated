import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setSelectedExercise } from "../features/selectedExerciseSlice";
// css
import layout from "../css/layout.module.css";
import btnStyles from "../css/btns.module.css";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// components
import Nav from "../components/Nav";

function SelectExercise() {
  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const { selectedExercises } = useSelector((state) => state.selectedExerciseSet);
  const { exercises } = useSelector((state) => state.exercises);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exercisesToChoose = [];
  exercises.forEach((exercise) => {
    selectedExercises.forEach((el) => {
      if (exercise.id === el) exercisesToChoose.push(exercise);
    });
  });

  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  return (
    <>
      <Nav homebtn={true} />
      <section className={layout.content__wrapper}>
        <div className={layout.flex__layout}>
          <div className={btnStyles.entry__wrapper}>
            {exercisesToChoose.map((exercise) => (
              <div
                onClick={() => {
                  dispatch(setSelectedExercise(exercise));
                  navigateOutFunction("/rep-counter");
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
        </div>
      </section>
    </>
  );
}

export default SelectExercise;
