import { createSlice } from "@reduxjs/toolkit";
type TinitialState = { userId: string | null };
const initialState: TinitialState = {
  userId: "58f75f31-2b2e-4048-a061-57f0bb1f2a05", // مقدار اولیه
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // مقدار جدید userId
    },
    clearUserId: (state) => {
      state.userId = null; // پاک کردن userId
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions; // اکشن‌ها برای استفاده در کامپوننت‌ها
export default userSlice.reducer; // ردیوسر برای افزودن به استور
