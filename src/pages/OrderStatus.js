import React from "react";
import classes from "./OrderStatus.module.css";

const OrderStatus = ({ placed, clearOrderStatus }) => {
  return (
    <div className={classes.container}>
      <div
        className={classes.text}
        style={{ color: placed ? "var(--green)" : "var(--orange)" }}
      >
        Order {placed ? "Placed" : "failed"}
        <div className={classes.button} onClick={clearOrderStatus}>
          Continue Shopping
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
