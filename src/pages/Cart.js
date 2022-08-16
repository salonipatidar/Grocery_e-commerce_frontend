import React, { useEffect } from "react";
import classes from "./Cart.module.css";
import CartItem from "../components/CartItem";
import { useHttpClient } from "../hooks/http-hook";
import { useSelector, useDispatch } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cartActions } from "../Store/Cart";

const Cart = () => {
  const { sendRequest, loading } = useHttpClient();
  const token = useSelector((state) => state.auth.token);
  const { cartItemDtos: cart, totalCost } = useSelector(
    (state) => state.cart.cart
  );
  const dispatch = useDispatch();
  const stripe = useStripe();

  const checkout = async () => {
    const body = cart.map((item) => {
      return {
        price: item.product.price,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        userId: 0,
      };
    });
    const { sessionId } = await sendRequest(
      "order/create-checkout-session?base=" + window.location.toString(),
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
      const cart = await sendRequest(`cart/?token=${token}`);
      dispatch(cartActions.setCart(cart));
    };
    if (cart.length === 0) getCart();
  }, []);
  return (
    <div className={`${classes.cartContainer}`}>
      <div className={classes.header}>Cart</div>
      <div className={classes.cartItems}>
        {loading && (
          <FontAwesomeIcon icon={faCircleNotch} className={classes.spinner} />
        )}
        {cart.map((product) => {
          return <CartItem product={product} key={product.id} />;
        })}
      </div>
      <div className={classes.orderContainer}>
        <div className={classes.finalPrice}>Total Price: Rs {totalCost}</div>
        <div className={classes.orderButton} onClick={checkout}>
          Order
        </div>
      </div>
    </div>
  );
};

export default Cart;
