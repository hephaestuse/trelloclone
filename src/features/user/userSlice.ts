import { createSlice } from "@reduxjs/toolkit";
type TinitialState = {
  userId: string | null;
  userProfile: {
    avatar: string | null;
    bg_color: string | null;
    created_at: string | null;
    theme: string | null;
    user_id: string | null;
    user_profile_Id: string | null;
    username: string | null;
  } | null;
};

const initialState: TinitialState = {
  userId: "",
  userProfile: {
    avatar: "",
    bg_color: "",
    created_at: "",
    theme: "",
    user_id: "",
    user_profile_Id: "", // Fixed key
    username: "",
  },
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
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null; // پاک کردن userId
    },
  },
});

export const { setUserId, clearUserId, setUserProfile, clearUserProfile } =
  userSlice.actions; // اکشن‌ها برای استفاده در کامپوننت‌ها
export default userSlice.reducer; // ردیوسر برای افزودن به استور
