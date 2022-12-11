import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";
// css
import layout from "../css/layout.module.css";
import styles from "../css/signin.module.css";
import header from "../css/header.module.css";
import btnStyles from "../css/btns.module.css";
// components
import Nav from "../components/Nav";
// redux
import { login } from "../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  useLayoutEffect(() => {
    fadeInPageTransition();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { email, password } = formData;

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigateOutFunction("/home");
    }
  }, [user]);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };
  return (
    <>
      {error}
      <Nav backBtn={true} backBtnUrl={"/"} />
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
                <span>Sign in</span>
              </button>
            </div>
          </div>
          <div className={btnStyles.btns__col}>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigateOutFunction("/register");
              }}
              className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}
            >
              <span>Sign up</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
