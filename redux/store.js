import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-reducer";
import { dashboardSlice } from "./dashboard/dashboard-reducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [dashboardSlice.name]: dashboardSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
