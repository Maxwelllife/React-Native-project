import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userId: null,
    login: null,
    email: null,
    avatarURL: null,
};
const actions = {
    updateUserProfile: (state, { payload }) => {
        console.log("payload: ", payload);
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
const authSlice = createSlice({
    name: "auth",
    initialState,
    // в reducers - он же  actions прилетает payload и мы обновляем...
    reducers: actions,
});
export const { updateUserProfile, authLogOut } = authSlice.actions;
export default authSlice.reducer;
