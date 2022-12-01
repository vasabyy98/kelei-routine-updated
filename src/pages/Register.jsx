// react
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// auth
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../firebase-config";
// css
import layout from "../css/layout.module.css";
import styles from "../css/signin.module.css";
import header from "../css/header.module.css";
import btnStyles from "../css/btns.module.css";

function Login() {
  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigateOutFunction("/home");
    }
  }, [user, loading]);

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
              <h2 className={`${header.heading__h2} `}>Let's sign you in!</h2>
              <p className={`${header.subheading} `}>Log in or sign up to get started.</p>
            </header>
            <div className={styles.input__wrapper}>
              <div className={`${styles.form__group}`}>
                <input
                  type="text"
                  className={styles.form__control}
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="First name"
                />
                <div className={styles.form__control__selected}></div>
              </div>
              <div className={`${styles.form__group}`}>
                <input
                  type="email"
                  className={styles.form__control}
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email adress"
                />
                <div className={styles.form__control__selected}></div>
              </div>
              <div className={`${styles.form__group}`}>
                <input
                  type="password"
                  className={styles.form__control}
                  id="password"
                  value={password}
                  onChange={onChange}
                  name="password"
                  placeholder="Password"
                />
                <div className={styles.form__control__selected}></div>
              </div>
            </div>
            <div className={btnStyles.btns__row}>
              <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                <span>Sign up</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
