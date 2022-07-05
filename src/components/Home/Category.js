import classes from "./Category.module.css"
import React from 'react'
import { Link } from "react-router-dom";

const Category = (props) => {
  return (
    <Link to ={`/category/${props.item.id}`}className={classes.cardContainer}>
        <img src={props.item.imageUrl} />
        <div className={classes.title}>
            {props.item.categoryName}
        </div>
        <div className={classes.description}>
            {props.item.description}
        </div>
    </Link>
  )
}

export default Category