import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Boardpage from "./pages/Boardpage";
import Pagenotfound from "./pages/Pagenotfound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
import FixedElements from "./ui/FixedElements";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClinte = new QueryClient();
  return (
    <QueryClientProvider client={queryClinte}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={Theme}>
            <CssBaseline /> {/****globals for Css reset for MUI*****/}
            <ReactQueryDevtools initialIsOpen={false} />
            <Routes>
              <Route element={<FixedElements />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/board/:boardId" element={<Boardpage />} />
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
