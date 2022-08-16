import React, { useEffect } from "react";
import classes from "./WishlistItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import useWishlist from "../hooks/wishlist-hook";
import {
  faCircleNotch,
  faHeart as solidHeart,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import useAddToCart from "../hooks/addToCart-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistItem = ({ product }) => {
  const { setWishlist, wishlisted, checkWishlist, wishlistLoading } =
    useWishlist();
  const { addToCart, cartLoading } = useAddToCart();

  useEffect(() => {
    checkWishlist(product.id);
  }, []);

  const wishlistItem = async () => {
    await setWishlist(product);
  };

  const cart = async () => {
    const data = await addToCart(product, 1);
    if (data.success) {
      toast.success("Added to cart", {
        theme: "light",
        position: "bottom-right",
      });
    } else if (!data.success) {
      toast.error(data.message, {
        theme: "light",
        position: "bottom-right",
      });
    }
  };

  return (
    <div className={classes.wishItem}>
      <div
        className={classes.itemImage}
        style={{ backgroundImage: `url(${product.imageURL})` }}
      ></div>
      <div className={classes.details}>
        <div className={classes.itemName}>{product.name}</div>
        <div className={classes.itemPrice}>Rs. {product.price}</div>
        <div className={classes.wishIcon}>
          {wishlistLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} className={classes.spinner} />
          ) : wishlisted ? (
            <FontAwesomeIcon icon={solidHeart} onClick={wishlistItem} />
          ) : (
            <FontAwesomeIcon icon={faHeart} onClick={wishlistItem} />
          )}
          {cartLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} className={classes.spinner} />
          ) : (
            <FontAwesomeIcon icon={faCartPlus} onClick={cart} />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WishlistItem;
