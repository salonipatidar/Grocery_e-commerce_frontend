import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Store/Cart";
import { NavActions } from "../Store/Navigation";
import { useHttpClient } from "./http-hook";

const useAddToCart = () => {
  const { isAuthenticated: isLoggedIn, token } = useSelector(
    (state) => state.auth
  );
  const { sendRequest, loading } = useHttpClient();
  const dispatch = useDispatch();

  const addToCart = useCallback(async (item, qty) => {
    if (isLoggedIn) {
      const data = await sendRequest(
        `cart/add?token=${token}`,
        "POST",
        JSON.stringify({
          productId: item.id,
          quantity: qty,
        }),
        { "Content-Type": "application/json" }
      );
      if (data.success) {
        dispatch(
          cartActions.addItem({
            id: data.id,
            product: { ...item, imageUrl: item.imageURL },
            quantity: qty,
          })
        );
        dispatch(cartActions.updateTotalCost());
      }
      return data;
    } else dispatch(NavActions.setPage("login"));
  });

  return { addToCart, cartLoading: loading };
};

export default useAddToCart;
