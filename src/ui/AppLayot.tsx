import { Container } from "@mui/material";

import { Outlet } from "react-router-dom";
import HeaderAndSideBar from "./FixedElements";

function AppLayot() {
  return (
    <>
      <HeaderAndSideBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayot;
