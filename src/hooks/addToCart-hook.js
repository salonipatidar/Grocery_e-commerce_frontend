import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "./http-hook";

const useAddToCart = () => {
  const { isAuthenticated: isLoggedIn, token } = useSelector(
    (state) => state.auth
  );
  const nav = useNavigate();
  const { sendRequest, loading, error } = useHttpClient();

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

      if (!data.success) {
        alert(data.message);
      }
    } else nav("/login");
  });

  return { addToCart };
};

export default useAddToCart;
