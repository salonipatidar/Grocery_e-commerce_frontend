import React, { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { useSelector } from "react-redux";
import { useHttpClient } from "../hooks/http-hook";
import CartItem from "../components/CartItems/CartItem";
import { useStripe } from "@stripe/react-stripe-js";

const Cart = () => {
  const { sendRequest, loading, error } = useHttpClient();
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const stripe = useStripe();
  const [pageType , setPageType] =useState("cart")

  const checkout = async () => {
    const body = cartItems.map((item) => {
      return {
        price: item.product.price,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        userId: 0,
      };
    });
    const {sessionId} = await sendRequest(
      "/order/create-checkout-session",
      "POST",
      JSON.stringify(body),
      { "Content-Type": "application/json" }
    );
    
    console.log(sessionId);
    await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

  };
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
        if (item.id == id) {
          item.quantity = quantity;
        }

        return item;
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
    <>
    {pageType === "cart" &&
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
        <button className={classes.checkoutBtn} onClick={()=>setPageType("order")}>
          Proceed to checkout
        </button>
        <div className={classes.checkoutCost}>Total Cost : ₹{totalCost}</div>
      </div>
    </div>
    

   }
   {
      pageType === "order" && 
      <div style={{margin:"auto"}}>
        <div>You will be redirected to stripe payment page to continue please click "proceed to payment " button</div>
        <br></br>
        <button className={classes.checkoutBtn} onClick={()=>setPageType("cart")}>
          Return to cart
        </button>&nbsp;&nbsp;&nbsp;
        <button className={classes.checkoutBtn} onClick={checkout}>
          Proceed to payment
        </button>
      </div>
   }

</>
  );
};

export default Cart;
