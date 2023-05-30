import { createSlice } from "@reduxjs/toolkit";

initAuthState = {
  id: "",
  userName: "",
  email: "",
  avatarURL: null,
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
      return { ...state, ...initAuthState };
    },
  },
});

export const { updateAuth, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
