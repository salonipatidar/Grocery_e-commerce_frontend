import classes from "./Product.module.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Product = (props) => {

  const isLoggedIn = useSelector((state)=>state.auth.isAuthenticated )
  const nav = useNavigate()

  const addToCart = () =>{
    if(isLoggedIn) 
      alert("added to cart");
      else
        nav("/login")
  }
  return (
    <div className={classes.cardContainer}>
      <Link to={`/product/${props.item.id}`} className={classes.details}>
        <img src={props.item.imageURL} />
        <div className={classes.title}>{props.item.name}</div>
      </Link>
      <div className={classes.addons}>
        <div className={classes.addToCart}>
          <input type="number" initialValue="1" min="1" max="5" />
          <button onClick={addToCart}>Add To Cart</button>
        </div>
        <div className={classes.heart}>
          <FontAwesomeIcon icon={faHeart} className={classes.heartStyle} />
        </div>
      </div>
    </div>
  );
};

export default Product;
