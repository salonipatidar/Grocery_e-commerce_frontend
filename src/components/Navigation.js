import classes from "./Navigation.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth";

const Navigation = () => {

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated )
  const dispatch = useDispatch();

  const signOut = () =>{
    dispatch(authActions.signOut())
  }
  return (
    <nav className={classes.nav}>
      <div className={classes.brandName}>Grocery</div>
      <div className={classes.navLinks}>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? `${classes.navLink} ${classes.activeLink}`
              : classes.navLink;
          }}
          to={`/`}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? `${classes.navLink} ${classes.activeLink}`
              : classes.navLink;
          }}
          to={`/test`}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? `${classes.navLink} ${classes.activeLink}`
              : classes.navLink;
          }}
          to={`/test2`}
        >
          Home
        </NavLink>
        { isLoggedIn ? <button onClick={signOut}>SignOut</button> :
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? `${classes.navLink} ${classes.activeLink}`
              : classes.navLink;
          }}
          to={`/login`}
        >
          Login / Signup
        </NavLink>
        }
      </div>
    </nav>
  );
};

export default Navigation;
