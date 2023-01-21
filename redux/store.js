import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-reducer";
import dashboardSlice from "./dashboard/dashboard-reducer";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice,
    [dashboardSlice.name]: dashboardSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});
