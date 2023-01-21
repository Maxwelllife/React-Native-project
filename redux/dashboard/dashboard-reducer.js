import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    posts: [],
};
const actions = {
    getPosts: (state, { payload }) => {
        return {
            ...state,
            posts: payload,
        };
    },
};
const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: actions,
});
export const { getPosts } = dashboardSlice.actions;
export default dashboardSlice.reducer;
