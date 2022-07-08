import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import classes from "./CartItem.module.css";

const CartItem = ({ id, item, qty, deleteCartItem, updatePrice }) => {
  const [totalCost, setTotalCost] = useState(qty * item.price);
  const qtyRef = useRef();
  const { sendRequest, loading, effect } = useHttpClient();
  const token = useSelector((state) => state.auth.token);

  const updateCost = () => {
    setTotalCost(qtyRef.current.value * item.price);
    updatePrice(id, item.id, qtyRef.current.value);
  };
  return (
    <div className={classes.itemContainer}>
      <img src={item.imageUrl} />
      <div className={classes.details}>
        <div className={classes.header}>
          <div className={classes.title}>
            {item.name}
            <span className={classes.price}> &nbsp;&nbsp;₹{item.price}</span>
          </div>
          <FontAwesomeIcon
            className={classes.deleteButton}
            icon={faTrash}
            onClick={() => deleteCartItem(id)}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.description}>{item.description}</div>
          <input
            onChange={updateCost}
            type="number"
            defaultValue={qty}
            min="1"
            max="5"
            ref={qtyRef}
          />
          <div className={classes.totalCost}>Total Cost : ₹{totalCost} </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
