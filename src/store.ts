import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSetting/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // اضافه کردن userReducer به store
  },
});
export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store;
