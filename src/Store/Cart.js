import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: { cartItemDtos: [], totalCost: 0 } };

const cartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    updateItem(state, action) {
      state.cart.cartItemDtos = state.cart.cartItemDtos.map((item) => {
        if (item.product.id === action.payload.id) {
          item.quantity = action.payload.quantity;
          return item;
        } else {
          return item;
        }
      });
    },
    deleteItem(state, action) {
      state.cart.cartItemDtos = state.cart.cartItemDtos.filter(
        (item) => item.product.id !== action.payload
      );
    },
    addItem(state, action) {
      state.cart.cartItemDtos = [...state.cart.cartItemDtos, action.payload];
    },
    clearCart(state) {
      state.cart = [];
    },
    updateTotalCost(state) {
      state.cart.totalCost = state.cart.cartItemDtos.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
