import React, { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { useSelector } from "react-redux";
import { useHttpClient } from "../hooks/http-hook";
import CartItem from "../components/CartItems/CartItem";

const Cart = () => {
  const { sendRequest, loading, error } = useHttpClient();
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const getCart = async () => {
      const { cartItemDtos, totalCost } = await sendRequest(
        `cart/?token=${token}`
      );
      setCartItems(cartItemDtos);
      setTotalCost(totalCost);
    };
    getCart();
  }, []);

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
      const newCart = cartItems.map((item) => {
        if(item.id == id){
            item.quantity = quantity
        }

        return item 
      });
      setCartItems(newCart);
      let cost = 0;
      newCart.forEach((item) => (cost += item.product.price * item.quantity));
      setTotalCost(cost);
    }
  };

  const deleteCartItem = async (id) => {
    const data = await sendRequest(
      `cart/delete/${id}?token=${token}`,
      "DELETE"
    );

    if (data.success) {
      const newCart = cartItems.filter((item) => item.id !== id);
      setCartItems(newCart);
      let cost = 0;
      newCart.forEach((item) => (cost += item.product.price * item.quantity));
      setTotalCost(cost);
    }
  };

  return (
    <div className={classes.cartContainer}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item.product}
          qty={item.quantity}
          id={item.id}
          deleteCartItem={deleteCartItem}
          updatePrice={updateCost}
        />
      ))}
      <div className={classes.checkout}>
        <button className={classes.checkoutBtn}>Proceed to checkout</button>
        <div className={classes.checkoutCost}>Total Cost : ₹{totalCost}</div>
      </div>
    </div>
  );
};

export default Cart;
