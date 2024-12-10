import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { drawerWidth } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUser } from "../services/user";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
type THeaderProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
function Header({ open, setOpen }: THeaderProps) {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const userId = useSelector((state: RootState) => state.user.userId);

  const { data: userProfile } = useQuery({
    queryKey: ["avatarUrl"],
    queryFn: () => getUser(userId),
  });
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h4"
          color="primary"
          noWrap
          component="div"
          marginX={5}
          sx={{ fontWeight: "bold" }}
        >
          Do It
        </Typography>
        <Typography
          variant="caption"
          color="textDisabled"
          noWrap
          component="p"
          marginX={5}
          sx={{ marginLeft: "auto" }}
        >
          {userProfile?.username}
        </Typography>

        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          src={userProfile?.avatar}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
