import { configureStore } from "@reduxjs/toolkit";

// Cia a store
export const store = configureStore({
  reducer: {},
});

//tipagens
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
