import { createSlice } from "@reduxjs/toolkit";
import { addLike, deleteLike } from "./dashboard-operations";

const initialState = {
  posts: [],
};

const actions = {
  getPosts: (state, { payload }) => {
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
    builder
      .addCase(addLike.pending, (store) => store)
      .addCase(addLike.fulfilled, (store) => store)
      .addCase(addLike.rejected, (store) => store)

      .addCase(deleteLike.pending, (store) => store)
      .addCase(deleteLike.fulfilled, (store) => store)
      .addCase(deleteLike.rejected, (store) => store);
  },
});

export const { getPosts } = dashboardSlice.actions;
export default dashboardSlice;
