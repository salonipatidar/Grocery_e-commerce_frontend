import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ItemDetail.module.css";
import {
  faPlus,
  faMinus,
  faHeart as solidHeart,
  faCartPlus,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWishlist from "../hooks/wishlist-hook";
import useAddToCart from "../hooks/addToCart-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wishActions } from "../Store/Wishlist";

const ItemDetail = () => {
  const product = useSelector((state) => state.nav.item);

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

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.imageContainer}>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${product.imageURL})` }}
          ></div>
        </div>
        <div className={classes.content}>
          <div className={classes.productName}>{product.name}</div>

          <div className={classes.productDetail}>
            <div className={classes.description}>{product.description}</div>
          </div>

          <div className={classes.prices}>
            <div className={classes.price}>₹ {product.price}</div>
            {wishlistLoading ? (
              <FontAwesomeIcon
                icon={faCircleNotch}
                className={classes.spinner}
              />
            ) : wishlisted ? (
              <FontAwesomeIcon icon={solidHeart} onClick={wishlist} />
            ) : (
              <FontAwesomeIcon icon={faHeart} onClick={wishlist} />
            )}
          </div>

          <div className={classes.contentOptions}>
            <div className={classes.quantity}>
              <FontAwesomeIcon
                icon={faMinus}
                onClick={() => setQuantity("dec")}
                className={`${qty === 1 && classes.disable}`}
              />
              <input value={qty} onChange={() => {}} />
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => setQuantity("inc")}
                className={`${qty === 5 && classes.disable}`}
              />
            </div>
            <div className={classes.button}>
              {cartLoading ? (
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className={classes.spinner}
                />
              ) : (
                <div onClick={cart}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  &nbsp;&nbsp;Add to cart
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ItemDetail;
