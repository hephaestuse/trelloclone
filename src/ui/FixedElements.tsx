import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "./SideBar";
import { drawerWidth } from "./constants";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/user";
import { RootState } from "../store";
import { setUserProfile } from "../features/userSetting/userSlice";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function FixedElements() {
  const [open, setOpen] = React.useState(false);
  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch();
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(userId),
  });
  dispatch(setUserProfile(userProfile));
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      <Header open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
      <Main sx={{ height: "100dvh" }} open={open}>
        <DrawerHeader />
        <Container
          sx={{
            maxWidth: "100vw!important",
            padding: "0px!important",
          }}
        >
          <Outlet />
        </Container>
      </Main>
    </Box>
  );
}
