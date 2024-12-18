// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // رنگ اصلی
      light: "#63a4ff", // رنگ روشن‌تر
      dark: "#004ba0", // رنگ تیره‌تر
      contrastText: "#ffffff", // رنگ متن
    },
    secondary: {
      main: "#4caf50", // رنگ اصلی
      light: "#80e27e", // رنگ روشن‌تر
      dark: "#087f23", // رنگ تیره‌تر
      contrastText: "#ffffff", // رنگ متن
    },
    background: {
      default: "#ffffff", // رنگ پس‌زمینه پیش‌فرض
      paper: "#f5f5f5", // رنگ پس‌زمینه برای کارت‌ها و جعبه‌ها
    },
    error: {
      main: "#d32f2f", // رنگ خطا
      light: "#ff6659", // رنگ روشن‌تر
      dark: "#9a0007", // رنگ تیره‌تر
    },
    text: {
      primary: "#000000", // رنگ اصلی متن
      secondary: "#555555", // رنگ فرعی متن
    },
  },
});

export default theme;
