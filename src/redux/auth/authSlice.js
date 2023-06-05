import { createSlice } from "@reduxjs/toolkit";

initAuthState = {
  id: "",
  userName: "",
  email: "",
  avatarURL: null,
  isUserLogginedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    updateAuth(state, { payload }) {
      return {
        ...state,
        id: payload.id,
        email: payload.email,
        userName: payload.userName,
        avatarURL: payload.avatarURL,
      };
    },

    clearAuth(state, _) {
      return initAuthState;
    },

    changeUserLoginStatus(state, { payload }) {
      return { ...state, isUserLogginedIn: payload };
    },
  },
});

export const { updateAuth, clearAuth, changeUserLoginStatus } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
