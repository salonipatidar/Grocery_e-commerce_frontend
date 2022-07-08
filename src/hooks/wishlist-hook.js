import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "./http-hook";

const useWishlist = () => {
  const [wishlisted, setWishlisted] = useState(true);
  const { isAuthenticated: isLoggedIn, token } = useSelector(
    (state) => state.auth
  );
  const nav = useNavigate();
  const { sendRequest, loading, error } = useHttpClient();

  const setWishlist = useCallback(async (item) => {
    let type = "add";
    if (isLoggedIn && !wishlisted) {
      const data = await sendRequest(
        `/wishlist/add?token=${token}`,
        "POST",
        JSON.stringify(item),
        { "Content-Type": "application/json" }
      );
      if (data.success) setWishlisted(true);
    } else if (!isLoggedIn) nav("/login");
    else if (wishlisted && isLoggedIn) {
      const data = await sendRequest(
        `/wishlist/${token}/${item.id}`,
        "DELETE",
        JSON.stringify(item),
        { "Content-Type": "application/json" }
      );
      if (data.success) {
        setWishlisted(false);
        type = "delete";
      }
    }

    return {itemId : item.id,  type};
  });

  const checkWishlist = useCallback(async (id) => {
    if (isLoggedIn) {
      const isWishlisted = await sendRequest(
        `wishlist/${token}/${parseInt(id)}`
      );
      setWishlisted(isWishlisted);
    } else setWishlisted(false);
  });

  return { setWishlist, wishlisted, checkWishlist };
};

export default useWishlist;
