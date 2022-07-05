import classes from "./Home.module.css";
import React from "react";
import Categories from "../components/Home/Categories";

const Home = () => {
  return <div className={classes.container}>
    <Categories/>  
  </div>;
};

export default Home;
