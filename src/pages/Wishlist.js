import React, { useEffect } from "react";
import classes from "./Wishlist.module.css";
import WishlistItem from "../components/WishlistItem";
import { useHttpClient } from "../hooks/http-hook";
import { useDispatch, useSelector } from "react-redux";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { wishActions } from "../Store/Wishlist";

const Wishlist = () => {
  const { sendRequest, loading } = useHttpClient();
  const token = useSelector((state) => state.auth.token);
  const wishlist = useSelector((state) => state.wish.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const products = await sendRequest(`wishlist/${token}`);
      dispatch(wishActions.setWishlist(products));
    };
    if (wishlist.length === 0) getProducts();
  }, []);

  return (
    <div className={classes.wishContainer}>
      <div className={classes.header}>Wishlist</div>
      <div className={classes.wishItems}>
        {loading && (
          <FontAwesomeIcon icon={faCircleNotch} className={classes.spinner} />
        )}
        {wishlist.map((product) => (
          <WishlistItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
