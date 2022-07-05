import { useRef, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import classes from "./Login.module.css";

const Login = () => {
  const [formType, setFormType] = useState("Login");
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const { sendRequest, loading , error} = useHttpClient();

  const switchFormType = () => {
    if (formType === "Login") setFormType("SignUp");
    else setFormType("Login");
  };

  const submitForm = async (e) => {
    e.preventDefault();

   const token = await sendRequest(
      `user/${formType === "Login" ?"signin":"signup" }`,
      "POST",
      {userName : formType === "SignUp" ? userName.current.value : "",email: email.current.value, password: password.current.value } ,
      { "Content-Type": "application/json" }
    );
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
