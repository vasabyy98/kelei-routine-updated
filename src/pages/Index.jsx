import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";

import layout from "../css/layout.module.css";
import styles from "../css/index.module.css";
import btnStyles from "../css/btns.module.css";

function Index() {
  const content = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  return (
    <>
      <div className={styles.backgroundImage}></div>
      <section ref={content} className={layout.content__wrapper}>
        <div className={layout.twoRow__grid__layout}>
          <div className={styles.intro}>
            <header className={styles.intro__header}>
              <div className={`${styles.intro__header__line} ${"animate__item"}`}>
                <span className={styles.intro__header__heading}>kelei</span>
              </div>
              <div className={`${styles.intro__header__line} ${"animate__item"}`}>
                <span className={styles.intro__header__heading}>routine</span>
              </div>
            </header>
            <p className={`${styles.intro__subheading} ${"animate__item"}`}>
              Bodybuilding framework for lifters of any expertise to promote hypertrophy.
            </p>
          </div>
          <div className={`${btnStyles.btns__row}`}>
            <button
              onClick={() => navigateOutFunction("/login")}
              className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}
            >
              <span>Get started</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
