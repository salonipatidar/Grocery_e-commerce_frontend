import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Success from "../pages/Success";
import Wishlist from "../pages/Wishlist";

const Paths = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<Products />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      {isLoggedIn && (
        <>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </>
      )}
      {!isLoggedIn && (
        <>
          <Route path="/login" element={<Login />} />
        </>
      )}
      <Route path="*" element={<div>not found</div>} />
      <Route path="/payment/success" element={<Success />} />
    </Routes>
  );
};

export default Paths;
