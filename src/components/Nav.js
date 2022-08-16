import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCartShopping,
  faHeart,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavActions } from "../Store/Navigation";
import { authActions } from "../Store/Auth";

const Nav = () => {
  const dispatch = useDispatch();
  const { currentPage: page } = useSelector((state) => state.nav);
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className={classes.nav}>
      <div
        className={classes.brandName}
        onClick={() => dispatch(NavActions.setPage("home"))}
      >
        Freshop
      </div>
      <div className={classes.navLinks}>
        <div
          className={`${classes.navLink} ${page === "home" && classes.active}`}
        >
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => dispatch(NavActions.setPage("home"))}
          />
        </div>
        {isAuthenticated && (
          <>
            <div className={classes.navLink}>
              <FontAwesomeIcon
                icon={faHeart}
                onClick={() => dispatch(NavActions.setWishlist())}
              />
            </div>
            <div className={classes.navLink}>
              <FontAwesomeIcon
                icon={faCartShopping}
                onClick={() => dispatch(NavActions.setCart())}
              />
            </div>
            <div className={classes.navLink}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                onClick={() => dispatch(authActions.signOut())}
              />
            </div>
          </>
        )}
        {!isAuthenticated && (
          <div
            className={`${classes.navLink} ${
              page === "login" && classes.active
            }`}
          >
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              onClick={() => dispatch(NavActions.setPage("login"))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
