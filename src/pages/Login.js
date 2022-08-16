import React, { useRef, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { NavActions } from "../Store/Navigation";
import {authActions} from "../Store/Auth"
import { Loading } from "../components/Loading";

const Login = () => {
  const [state, setState] = useState("Login");
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const { sendRequest, loading, error } = useHttpClient();

  const dispatch = useDispatch();


  const submitForm = async () => {

    const loginDetails = await sendRequest(
      `user/${state === "Login" ? "signin" : "signup"}`,
      "POST",
      JSON.stringify({
        userName: state === "SignUp" ? userName.current.value : "",
        email: email.current.value,
        password: password.current.value,
      }),
      { "Content-Type": "application/json" }
    );

    if (loginDetails.status === "success" && state === "Login") {
      dispatch(authActions.login({ token: loginDetails.token }));
      dispatch(NavActions.setPage("home"));
    } else {
      changeState("Login");
    }
  };

  const changeState = () => {
    if (state === "Login") {
      setState("Signup");
    } else {
      setState("Login");
    }
  };

  return (
    <div className={classes.loginContainer}>
      {loading && <Loading/> }
      <div className={classes.loginCard}>
        <div className={classes.header}>{state}</div>
        {state === "Signup" && (
          <input className={classes.input} ref={userName} placeholder="Enter name" />
        )}
        <input className={classes.input} ref={email} placeholder="Enter email" />
        <input
          className={classes.input}
          ref={password}
          type="password"
          placeholder="Enter password"
        />
        <div className={classes.button} onClick={submitForm}>{state}</div>
        <div className={classes.questionContainer}>
          <div className={classes.question}>
            {state === "Login" ? "Don't" : "Already"} have an account?
          </div>
          <div className={classes.change} onClick={changeState}>
            {state === "Login" ? "Signup" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
