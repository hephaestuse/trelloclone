import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import HomeIcon from "@mui/icons-material/Home";
import { Collapse, Divider, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../services/boards";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

type TSidebar = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerWidth: number;
};
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export default function SideBar({ open, setOpen, drawerWidth }: TSidebar) {
  const navigate = useNavigate();
  const [boardsListOpen, setListOpen] = React.useState(false);
  const theme = useTheme();
  function handleClickToPage(boardId: string) {
    navigate(`/board/${boardId}`);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const userId = useSelector((state: RootState) => state.user.userId);

  const { data: boards } = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(userId),
  });
  function handleClickHome() {
    navigate(`/`);
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon color="primary" />
          ) : (
            <ChevronRightIcon color="primary" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {["Home", "Work space"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text === "Home" ? (
                  <HomeIcon color="primary" />
                ) : (
                  <WorkspacesIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                onClick={text === "Home" ? handleClickHome : undefined}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={() => setListOpen(!boardsListOpen)}>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="All boards" />
          {boardsListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={boardsListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {boards ? (
              boards.map((boards) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={boards.board_id}
                  onClick={() => handleClickToPage(boards.board_id)}
                >
                  <ListItemIcon>
                    <DashboardOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={boards.name} />
                </ListItemButton>
              ))
            ) : (
              <Typography
                variant="caption"
                color="error"
                component="p"
                marginX={3}
                sx={{ fontWeight: "bold" }}
              >
                there is a problem whith your connection to server
              </Typography>
            )}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        {["Settings"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text === "Settings" ? <SettingsIcon color="primary" /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
