import { createSlice } from "@reduxjs/toolkit";

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
  // getPostsById: (state, { payload }) => {
  //   console.log("payload: ", payload);
  //   return {
  //     ...state,
  //     posts: payload.posts.filter((post) => post.userId === userId),
  //   };
  // },
  getComments: (state, { payload }) => {
    return {
      ...state,
      comments: payload.comments,
    };
  },
  addLikeToStore: (state, { payload }) => {
    console.log("payload LIKES: ", payload);
    return {
      ...state,
      // comments: payload.comments,
    };
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: actions,
});
