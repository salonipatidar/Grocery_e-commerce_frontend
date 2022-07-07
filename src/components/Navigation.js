import classes from "./Navigation.module.css";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authActions.signOut());
    nav("/");
  };
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
          <FontAwesomeIcon className={classes.icon}  icon={faHouse}/>
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? `${classes.navLink} ${classes.activeLink}`
                  : classes.navLink;
              }}
              to={`/wishlist`}
            >
             <FontAwesomeIcon className={classes.icon} icon={faHeart}/>
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? `${classes.navLink} ${classes.activeLink}`
                  : classes.navLink;
              }}
              to={`/cart`}
            >
            <FontAwesomeIcon className={classes.icon} icon={faCartShopping}/>
            </NavLink>
          </>
        )}
        {isLoggedIn ? (
          <button className={classes.signOut} onClick={signOut}>Sign Out</button>
        ) : (
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? `${classes.navLink} ${classes.activeLink}`
                : classes.navLink;
            }}
            to={`/login`}
          >
            <FontAwesomeIcon className={classes.icon} icon={faUser} />
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
