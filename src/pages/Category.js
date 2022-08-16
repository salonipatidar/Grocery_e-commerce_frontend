import React, { useEffect, useState } from "react";
import classes from "./Category.module.css";
import Item from "../components/Item";
import { useHttpClient } from "../hooks/http-hook";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading";

const Category = () => {
  const { sendRequest, loading, error } = useHttpClient();
  const [productList, setProductList] = useState([]);
  const { id, categoryName, imageUrl } = useSelector(
    (state) => state.nav.category
  );

  useEffect(() => {
    const getProducts = async () => {
      const products = await sendRequest(`product/${id}`);
      setProductList(products);
    };
    getProducts();
  }, []);
  return (
    <div className={classes.categoryContainer}>
      {/* Header */}
      <div className={classes.header}>
        <div
          className={classes.headerImage}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className={classes.headerContent}>{categoryName}</div>
      </div>
      {/* Items */}
      <div className={classes.items}>
        {loading && <Loading />}
        {productList.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
