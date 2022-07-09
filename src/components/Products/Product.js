import classes from "./Product.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import useWishlist from "../../hooks/wishlist-hook";
import { useHttpClient } from "../../hooks/http-hook";
import useAddToCart from "../../hooks/addToCart-hook";

const Product = (props) => {
  const { setWishlist, wishlisted, checkWishlist } = useWishlist();
  const qtyRef = useRef();
  const {addToCart} = useAddToCart();

  useEffect(() => {
    checkWishlist(props.item.id);
  }, []);


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
          <button onClick={()=>addToCart(props.item,qtyRef.current.value)}>Add To Cart</button>
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
