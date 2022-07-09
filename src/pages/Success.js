import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttpClient } from "../hooks/http-hook";

const Success = () => {
  const { sendRequest, loading, error } = useHttpClient();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) deleteCart();
  }, [token]);

  const deleteCart = async () =>
    await sendRequest(`cart/deleteAll?token=${token}`, "DELETE");
  return (
    <div style={{ marginTop: "200px" }}>Payment Successfull keep browsing</div>
  );
};

export default Success;
