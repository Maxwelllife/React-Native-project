import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  avatarURL: null,
  // commentsCounter: 0,
};

const actions = {
  updateUserProfile: (state, { payload }) => {
    // console.log("payload: ", payload);
    return {
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatarURL: payload.avatarURL,
    };
  },

  authLogOut: () => initialState,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // в reducers - он же  actions прилетает payload и мы обновляем...
  reducers: actions,
});


