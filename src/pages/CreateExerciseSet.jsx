import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// css
import layout from "../css/layout.module.css";
import btnStyles from "../css/btns.module.css";
import header from "../css/header.module.css";
import styles from "../css/signin.module.css";
import home from "../css/home.module.css";
// firebase crud
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase-config";
// components
import Nav from "../components/Nav";

function CreateExerciseSet() {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `users/${user.uid}/exercises`));

    (async () => {
      const data = await getDocs(q);

      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })();
  }, [user]);

  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const [exerciseSetData, setExerciseSetData] = useState({
    exerciseSetName: "",
    routine: "",
  });

  const { exerciseSetName, routine } = exerciseSetData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setExerciseSetData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // SELECTED EXERCISE HANDLER
  const [selectedExercises, setSelectedExercises] = useState([]);

  const checkboxHandler = (e) => {
    if (e.target.checked === true) {
      setSelectedExercises([...selectedExercises, e.target.value]);
    } else {
      setSelectedExercises([
        ...selectedExercises.filter((exercise) => exercise !== e.target.value),
      ]);
    }
  };

  // CHECK EMPTY FOR EMPTY VALUES

  const exerciseSetNameInput = useRef();

  let canProceed = false;

  const checkEmptyInputs = () => {
    if (exerciseSetName === "" && routine === "") {
      exerciseSetNameInput.current.scrollIntoView();
    } else if (exerciseSetName !== "" && routine !== "") {
      canProceed = true;
    }
  };

  const exerciseSetCollectionRef = collection(db, `users/${auth.currentUser.uid}/exercisesSets`);

  const onSubmit = async (e) => {
    e.preventDefault();

    checkEmptyInputs();

    const data = {
      exerciseSetName,
      routine,
      selectedExercises,
    };

    if (canProceed) {
      await addDoc(exerciseSetCollectionRef, {
        data,
      }).then(() => {
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
            <header className={home.home__header}>
              <h2 className={`${header.heading__h2}`}>Create new exercise set</h2>
              <p style={{ maxWidth: "unset" }} className={`${header.subheading}`}>
                Group exercises by the type of routine.
              </p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group} `}>
                <input
                  ref={exerciseSetNameInput}
                  type="text"
                  className={styles.form__control}
                  id="exerciseName"
                  name="exerciseSetName"
                  value={exerciseSetName}
                  onChange={onChange}
                  placeholder="Exercise set name"
                />
                <div className={styles.form__control__selected}></div>
              </div>
            </div>
            <div className={`${styles.input__wrapper} ${styles.radio__wrapper__col}`}>
              <header className={header.header}>
                <h3 className={`${header.heading__h3}`}>Type of routine</h3>
              </header>
              <div className={`${styles.form__group} `}>
                <div className={`${styles.form__control}`}>
                  <span>fullbody</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="fullbody"
                  name="routine"
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group} `}>
                <div className={`${styles.form__control}`}>
                  <span>upper split</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="upper split"
                  name="routine"
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group}`}>
                <div className={`${styles.form__control}`}>
                  <span>lower split</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="lower split"
                  name="routine"
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group}`}>
                <div className={`${styles.form__control}`}>
                  <span>push</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="push"
                  name="routine"
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group}`}>
                <div className={`${styles.form__control}`}>
                  <span>pull</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="pull"
                  name="routine"
                  className={styles.form__control__radio}
                />
              </div>
              <div className={`${styles.form__group}`}>
                <div className={`${styles.form__control}`}>
                  <span>legs</span>
                </div>
                <input
                  onChange={onChange}
                  type="radio"
                  value="legs"
                  name="routine"
                  className={styles.form__control__radio}
                />
              </div>
            </div>
            <div className={`${styles.input__wrapper} ${styles.radio__wrapper__col}`}>
              <header className={header.header}>
                <h3 className={`${header.heading__h3}`}>Select exercises</h3>
              </header>
              {data.map((exercise) => (
                <div key={exercise.id} className={`${styles.form__group} `}>
                  <div className={`${styles.form__control}`}>
                    <span className={btnStyles.entry__btn__name}>{exercise.data.exerciseName}</span>
                    <span className={btnStyles.entry__btn__details}>
                      ({exercise.data.rm + "rm, " + exercise.data.weight + "kg"})
                    </span>
                  </div>
                  <input
                    onChange={checkboxHandler}
                    type="checkbox"
                    value={exercise.id}
                    name="exercise"
                    className={styles.form__control__radio}
                  />
                </div>
              ))}
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

export default CreateExerciseSet;
