// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // 사용자 리듀서

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
