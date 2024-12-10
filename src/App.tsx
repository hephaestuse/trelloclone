import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Boardpage from "./pages/Boardpage";
import Pagenotfound from "./pages/Pagenotfound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import AppLayot from "./ui/AppLayot";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const queryClinte = new QueryClient();
  return (
    <QueryClientProvider client={queryClinte}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/****globals for Css reset for MUI*****/}
            <Routes>
              <Route element={<AppLayot />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/board" element={<Boardpage />} />
                <Route path="*" element={<Pagenotfound />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
