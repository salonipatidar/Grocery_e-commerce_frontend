import React, { useEffect, useRef, useState } from "react";
import classes from "./Item.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCartPlus,
  faHeart as solidHeart,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import useWishlist from "../hooks/wishlist-hook";
import useAddToCart from "../hooks/addToCart-hook";
import { useDispatch, useSelector } from "react-redux";
import { wishActions } from "../Store/Wishlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavActions } from "../Store/Navigation";

const Item = ({ product }) => {
  const { setWishlist, wishlisted, checkWishlist, wishlistLoading } =
    useWishlist();
  const { addToCart, cartLoading } = useAddToCart();
  const [qty, setQty] = useState(1);
  const wishlistEdited = useSelector((state) => state.wish.deleted);
  const dispatch = useDispatch();

  useEffect(() => {
    checkWishlist(product.id);
  }, []);

  useEffect(() => {
    if (wishlistEdited === product.id) {
      checkWishlist(product.id);
      dispatch(wishActions.clearDeleted());
    }
  }, [wishlistEdited]);

  const wishlist = async () => {
    const { itemId, type } = await setWishlist(product);
  };

  const cart = async () => {
    const data = await addToCart(product, qty);
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

  const setQuantity = (type) => {
    if (type == "dec") {
      if (qty > 1) {
        setQty(qty - 1);
      }
    } else if (type == "inc") {
      if (qty < 5) {
        setQty(qty + 1);
      }
    }
  };

  const selectItem = (product) => {
    dispatch(NavActions.setItem({ page: "item", product }));
  };

  return (
    <div className={classes.itemCard}>
      <div
        className={classes.itemImage}
        style={{
          backgroundImage: `url(${product.imageURL})`,
        }}
        onClick={() => {
          selectItem(product);
        }}
      ></div>
      <div
        className={classes.itemName}
        onClick={() => {
          selectItem(product);
        }}
      >
        {product.name}
      </div>
      <div className={classes.price}>₹ {product.price}</div>
      <div className={classes.itemOptions}>
        <div className={classes.quantity}>
          <div
            className={`${classes.quantityButton} ${classes.sub} ${
              qty === 1 && classes.disable
            }`}
            onClick={() => setQuantity("dec")}
          >
            <FontAwesomeIcon icon={faMinus} />
          </div>
          <input
            className={classes.amount}
            type="number"
            min={1}
            max={5}
            value={qty}
            onChange={() => {}}
          />
          <div
            className={`${classes.quantityButton} ${classes.add} ${
              qty === 5 && classes.disable
            }`}
            onClick={() => setQuantity("inc")}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className={classes.buttons}>
          {wishlistLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} className={classes.spinner} />
          ) : wishlisted ? (
            <FontAwesomeIcon icon={solidHeart} onClick={wishlist} />
          ) : (
            <FontAwesomeIcon icon={faHeart} onClick={wishlist} />
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

export default Item;
