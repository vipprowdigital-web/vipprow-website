import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "@/redux/slices/appConfigSlice";

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
  },
});

// Infer the `RootState` adn `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, uses: UserState}
export type AppDispatch = typeof store.dispatch;
