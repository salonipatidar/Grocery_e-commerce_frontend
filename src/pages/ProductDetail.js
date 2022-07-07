import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useWishlist from "../hooks/wishlist-hook";

const ProductDetail = () => {
  const { sendRequest, loading, error } = useHttpClient();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  let params = useParams();
  const { setWishlist, wishlisted, checkWishlist } = useWishlist();

  useEffect(() => {
    const getProduct = async () => {
      const productDetail = await sendRequest(
        `product/details/${params.productId}`
      );
      setProduct(productDetail);
      checkWishlist(productDetail.id);
    };
    getProduct();
  }, [params.productId]);

  const updateQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const wishlist = async () => {
    await setWishlist(product);
  };
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
            <input
              type="number"
              initialvalue="1"
              min="1"
              max="5"
              onChange={updateQuantity}
            />
            <button>Add To Cart</button>
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
        <div className={classes.totalPrice}>
          Total price : Rs {quantity * product.price}{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
