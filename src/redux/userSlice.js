import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 기존 코드 (백엔드 연동)
  // userId: localStorage.getItem("userId") || null,
  // token: localStorage.getItem("accessToken") || null,
  // name: localStorage.getItem("name") || null,

  // 수정 코드 (백엔드 없이 동작하는 목 데이터)
  userId: "test-user", // 기본 사용자 ID
  token: "fake-token", // 기본 토큰
  name: "김루돌프", // 기본 사용자 이름
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.name = action.payload.name;

      // 기존 코드 (백엔드 연동)
      // localStorage.setItem("userId", action.payload.userId);
      // localStorage.setItem("accessToken", action.payload.token);
      // localStorage.setItem("name", action.payload.name);
    },
    logout: state => {
      // 기존 코드 (백엔드 연동)
      // state.userId = null;
      // state.token = null;
      // state.name = null;
      // localStorage.removeItem("userId");
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("name");

      // 수정 코드 (백엔드 없이 동작하는 목 데이터 유지)
      state.userId = "test-user";
      state.token = "fake-token";
      state.name = "김루돌프";
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
