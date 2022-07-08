import classes from "./Product.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import useWishlist from "../../hooks/wishlist-hook";
import { useHttpClient } from "../../hooks/http-hook";

const Product = (props) => {
  const { isAuthenticated: isLoggedIn, token } = useSelector(
    (state) => state.auth
  );
  const nav = useNavigate();
  const { setWishlist, wishlisted, checkWishlist } = useWishlist();
  const { sendRequest, loading, error } = useHttpClient();
  const qtyRef = useRef();

  useEffect(() => {
    checkWishlist(props.item.id);
  }, []);

  const addToCart = async () => {
    if (isLoggedIn) {
      const data = await sendRequest(
        `cart/add?token=${token}`,
        "POST",
        JSON.stringify({
          id : 1,
          productId : props.item.id,
          quantity : qtyRef.current.value ,
        }),
        { "Content-Type": "application/json" }
      );

      if(! data.success){
        alert(data.message);
      }
    } else nav("/login");
  };

  const wishlist = async () => {
   const {itemId , type} =  await setWishlist(props.item);
   if(type === "delete" && props.pageType === "wishlist"){
      props.refresh(itemId)
   }
  };
  return (
    <div className={classes.cardContainer}>
      <Link to={`/product/${props.item.id}`} className={classes.details}>
        <img src={props.item.imageURL} />
        <div className={classes.title}>{props.item.name}</div>
      </Link>
      <div className={classes.addons}>
        <div className={classes.addToCart}>
          <input type="number" defaultValue={1} min="1" max="5" ref={qtyRef} />
          <button onClick={addToCart}>Add To Cart</button>
        </div>
        <div className={classes.heart}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={wishlist}
            className={`${classes.heartStyle} ${
              wishlisted && classes.wishlisted
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
