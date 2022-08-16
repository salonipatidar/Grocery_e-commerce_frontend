import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { useHttpClient } from "../hooks/http-hook";
import Category from "./Category";
import classes from "./Home.module.css";
import { useDispatch } from "react-redux";
import { NavActions } from "../Store/Navigation";
import { Loading } from "../components/Loading";

const Home = () => {
  const { sendRequest, loading, error } = useHttpClient();
  const [categoryList, setCategoryList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categories = await sendRequest("category/list");
      setCategoryList(categories);
    };
    getCategories();
  }, []);

  const selectCategory = (category) => {
    dispatch(NavActions.setCategory({ page: "category", category }));
  };
  return (
    <div className={classes.homeContainer}>
      {/* Header */}
      <div className={classes.header}>
        <div className={classes.headerImage}></div>
        <div className={classes.headerContent}>Welcome to Freshop</div>
      </div>

      {/* Categories */}

      <div className={classes.categoriesContainer}>
        <div className={classes.categoriesTitle}>Categories</div>
        <div className={classes.categories}>
          {loading && <Loading />}
          {categoryList.map((category) => (
            <CategoryCard
              onClick={selectCategory}
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
