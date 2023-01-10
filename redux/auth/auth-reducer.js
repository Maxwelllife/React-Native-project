import { createSlice } from "@reduxjs/toolkit";

const store = {
  userId: null,
  login: null,
  stateChange: false,
};

const actions = {
  updateUserProfile: (store, { payload }) => {
    console.log("payload: ", payload);
    return {
      ...store,
      userId: payload.userId,
      login: payload.login,
    };
  },

  authStateChange: (store, { payload }) => {
    console.log("payload: ", payload);
    return {
      ...store,
      stateChange: payload.stateChange,
    };
  },
  authLogOut: () => store,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: store,
  // в reducers - он же  actions прилетает payload и мы обновляем...
  reducers: actions,
});

console.log("authSlice: ", authSlice);
