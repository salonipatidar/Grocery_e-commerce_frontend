import React from "react";
import classes from "./CategoryCard.module.css";

const CategoryCard = ({category , onClick}) => {
  return (
    <div onClick={()=>onClick(category)} className={classes.categoryCard}>
      <div
        className={classes.categoryImage}
        style={{
          backgroundImage: `url(${category.imageUrl})`,
        }}
      ></div>
      <div className={classes.categoryName}>{category.categoryName}</div>
    </div>
  );
};

export default CategoryCard;
