import React, { useState } from "react";
import classes from "./CartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { useHttpClient } from "../hooks/http-hook";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartActions } from "../Store/Cart";

const CartItem = ({ product }) => {
  const [qty, setQty] = useState(product.quantity);
  const { sendRequest, loading } = useHttpClient();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const setQuantity = (type) => {
    if (type === "dec") {
      if (qty > 1) {
        setQty(qty - 1);
        updateCost(product.id, product.product.id, qty - 1);
      } else if (qty === 1) {
        deleteCartItem(product.id, product.product.id);
      }
    } else if (type === "inc") {
      if (qty < 5) {
        setQty(qty + 1);
        updateCost(product.id, product.product.id, qty + 1);
      }
    }
  };

  const updateCost = async (id, productId, quantity) => {
    const data = await sendRequest(
      `cart/update/${id}?token=${token}`,
      "PUT",
      JSON.stringify({
        id: id,
        productId: productId,
        quantity: quantity,
      }),
      { "Content-Type": "application/json" }
    );

    if (data.success) {
      toast.success("Item updated", {
        theme: "light",
        position: "bottom-right",
      });
      dispatch(cartActions.updateItem({ id: productId, quantity: quantity }));
      dispatch(cartActions.updateTotalCost());
    } else if (!data.success) {
      toast.error("Item updation failed", {
        theme: "light",
        position: "bottom-right",
      });
    }
  };

  const deleteCartItem = async (id, productId) => {
    const data = await sendRequest(
      `cart/delete/${id}?token=${token}`,
      "DELETE"
    );

    if (data.success) {
      toast.success("Item deleted from cart", {
        theme: "light",
        position: "bottom-right",
      });
      dispatch(cartActions.deleteItem(productId));
      dispatch(cartActions.updateTotalCost());
    } else if (!data.success) {
      toast.error("Item deletion failed", {
        theme: "light",
        position: "bottom-right",
      });
    }
  };

  return (
    <div className={classes.cartItem}>
      <div
        className={classes.itemImage}
        style={{
          backgroundImage: `url(${product.product.imageUrl})`,
        }}
      ></div>
      <div className={classes.details}>
        <div className={classes.itemName}>{product.product.name}</div>
        <div className={classes.itemPrice}>
          ₹ {product.product.price}
          {loading ? (
            <FontAwesomeIcon icon={faCircleNotch} className={classes.spinner} />
          ) : (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                deleteCartItem(product.id, product.product.id);
              }}
              className={classes.trash}
            />
          )}
        </div>
        <div className={classes.options}>
          <div className={classes.quantity}>
            <div
              className={`${classes.quantityButton} ${classes.sub} ${
                (qty === 0 || loading) && classes.disable
              }`}
              onClick={() => setQuantity("dec")}
            >
              <FontAwesomeIcon icon={faMinus} />
            </div>
            <input
              className={classes.amount}
              type="number"
              min={1}
              max={5}
              value={qty}
              onChange={() => {}}
            />
            <div
              className={`${classes.quantityButton} ${classes.add} ${
                (qty === 5 || loading) && classes.disable
              }`}
              onClick={() => setQuantity("inc")}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
        <div className={classes.totalPrice}>
          Total: Rs {product.product.price * qty}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartItem;
