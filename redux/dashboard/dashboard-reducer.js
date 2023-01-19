import { createSlice } from "@reduxjs/toolkit";
import { addLike } from "./dashboard-operations";

const initialState = {
  posts: [],
};

const actions = {
  getPosts: (state, { payload }) => {
    // console.log("payload: ", payload);
    return {
      ...state,
      posts: payload.posts,
    };
  },

  getComments: (state, { payload }) => {
    return {
      ...state,
      comments: payload.comments,
    };
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: actions,
  // добавить лоадер и отображение ошибок
  extraReducers: (builder) => {
    builder.addCase(addLike.pending, (store) => {
      store;
    });
    builder.addCase(addLike.fulfilled, (store) => store);
    builder.addCase(addLike.rejected, (store) => store);
  },
});

export const { getPosts } = dashboardSlice.actions;
export default dashboardSlice;
