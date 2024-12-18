import { Container } from "@mui/material";

import { Outlet } from "react-router-dom";
import HeaderAndSideBar from "./FixedElements";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function AppLayot() {
  return (
    <>
      <HeaderAndSideBar />
      <ReactQueryDevtools></ReactQueryDevtools>
      <Container sx={{ maxWidth: "100vw!important", padding: "0px!important", height:"85dvh"}}>
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayot;
