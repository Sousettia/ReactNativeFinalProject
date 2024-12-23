import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/auth-slice";
import planReducer from '../auth/plan-slice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    plan: planReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
