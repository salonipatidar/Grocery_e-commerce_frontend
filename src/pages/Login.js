import { useRef, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formType, setFormType] = useState("Login");
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const { sendRequest, loading, error } = useHttpClient();

  const dispatch = useDispatch();
  const history = useNavigate();

  const switchFormType = () => {
    if (formType === "Login") setFormType("SignUp");
    else setFormType("Login");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const loginDetails = await sendRequest(
      `user/${formType === "Login" ? "signin" : "signup"}`,
      "POST",
      JSON.stringify({
        userName: formType === "SignUp" ? userName.current.value : "",
        email: email.current.value,
        password: password.current.value,
      }),
      { "Content-Type": "application/json" }
    );

    if (loginDetails.status === "sucess" && formType === "Login") {
      dispatch(authActions.login({ token: loginDetails.token }));
      history("/");
    } else {
      setFormType("Login0");
    }
  };
  return (
    <form className={classes.container} onSubmit={submitForm}>
      <div className={classes.login}>{formType}</div>
      {loading && <div>loading</div>}
      {error && <div className="error">{error}</div>}
      {formType !== "Login" && (
        <div className={classes.formControl}>
          <input
            type="text"
            placeholder="Username"
            ref={userName}
            name="username"
            required
          />
        </div>
      )}
      <div className={classes.formControl}>
        <input
          type="email"
          placeholder="Email"
          ref={email}
          name="email"
          required
        />
      </div>
      <div className={classes.formControl}>
        <input
          type="password"
          placeholder="Password"
          ref={password}
          name="password"
          required
        />
      </div>
      <div className={classes.formControl}>
        <button>{formType}</button>
      </div>
      {formType === "Login" && (
        <>
          <div>Don't have an account ?</div>
          <div onClick={switchFormType}>SignUp</div>
        </>
      )}
      {formType === "SignUp" && (
        <>
          <div>Already have an account ?</div>
          <div onClick={switchFormType}>Login</div>
        </>
      )}
    </form>
  );
};

export default Login;
