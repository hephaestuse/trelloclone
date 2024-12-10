import { Container } from "@mui/material";

import { Outlet } from "react-router-dom";
import HeaderAndSideBar from "./FixedElements";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function AppLayot() {
  return (
    <>
      <HeaderAndSideBar />
      <ReactQueryDevtools></ReactQueryDevtools>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayot;
