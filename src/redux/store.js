import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./slices/matchesSlice";

import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import authMiddleware from "./authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    matches: matchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
