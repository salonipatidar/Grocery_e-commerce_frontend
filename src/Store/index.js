import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import cartReducer from "./Cart";
import navReducer from "./Navigation";
import wishReducer from "./Wishlist";

const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    wish: wishReducer,
    cart: cartReducer,
  },
});

export default store;
