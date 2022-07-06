import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  const { sendRequest, loading, error } = useHttpClient();
  const [product, setProduct] = useState({});
  const [quantity , setQuantity] = useState(1);
  let params = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const productDetail = await sendRequest(
        `product/details/${params.productId}`
      );
      console.log(productDetail);
      setProduct(productDetail);
    };
    getProduct();
  }, [params.productId]);

  const updateQuantity=(e) => {
    setQuantity(e.target.value);
  }

  return (
    <div className={classes.productCard}>
      <img src={product.imageURL} className={classes.productImage} />
      <div className={classes.detailContainer}>
        <div className={classes.title}>{product.name}</div>
        <div className={classes.description}>{product.description}</div>
        <div className={classes.price}>
          PRICE : Rs {product.price}
          <div className={classes.subText}>(inclusive of all taxes)</div>{" "}
        </div>
        <div className={classes.addons}>
          <div className={classes.addToCart}>
            <input type="number" initialValue="1" min="1" max="5" onChange={updateQuantity} />
            <button>Add To Cart</button>
          </div>
          <div className={classes.heart}>
            <FontAwesomeIcon icon={faHeart} className={classes.heartStyle} />
          </div>
        </div>
        <div className={classes.totalPrice}>Total price : Rs {quantity * product.price} </div>
      </div>
    </div>
  );
};

export default ProductDetail;
