import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import matchesReducer from "./slices/matchesSlice";
import loadingSlice from "./slices/loadingSlice";

import authMiddleware from "./authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    matches: matchesReducer,
    loading: loadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
