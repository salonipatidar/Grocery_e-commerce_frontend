import classes from "./Product.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <div className={classes.cardContainer}>
      <Link to={`/product/${props.item.id}`} className={classes.details}>
        <img src={props.item.imageURL} />
        <div className={classes.title}>{props.item.name}</div>
      </Link>
      <div>

      </div>
    </div>
  );
};

export default Product;
