import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: localStorage.getItem("userId") || null,
  token: localStorage.getItem("accessToken") || null,
  name: localStorage.getItem("name") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { userId, token, name } = action.payload;
      state.userId = userId;
      state.token = token;
      state.name = name;

      // LocalStorage에 저장
      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("name", name);
    },
    clearUserInfo: (state) => {
      state.userId = null;
      state.token = null;
      state.name = null;

      // LocalStorage에서 제거
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
