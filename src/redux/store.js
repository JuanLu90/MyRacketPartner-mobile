import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./slices/matchesSlice";

import authMiddleware from "./authMiddleware";

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
