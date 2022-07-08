import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, token: null };

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    signOut(state){
        state.isAuthenticated = false;
        state.token = null
        localStorage.removeItem("token");
    }
    
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
