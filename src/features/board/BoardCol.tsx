import {
  Box,
  colors,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import JobCard from "./JobCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { batchJobUpdate, getJobs, postJobs } from "../../services/Jobs";
import React from "react";
import ModalCompound from "../../components/ModalCompound";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
const paperStyle = {
  background: "rgba(255, 255, 255, 0.685)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  minWidth: 250,
  height: "fit-content",
  maxHeight: "100dvh",
  m: 1,
  py: 2,
  px: 1,
  color: "rgb(80, 80, 80)",
};
type props = { colTitle: string; colId: string };
function BoardCol({ colTitle, colId }: props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleButtonMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const queryClient = useQueryClient();
  const { data: jobs } = useQuery({
    queryKey: ["jobs", colId],
    queryFn: () => getJobs(colId),
    enabled: !!colId,
  });
  const sortedJobs = React.useMemo(() => {
    if (jobs) {
      return [...jobs].sort((a, b) => a.position - b.position);
    }
    return [];
  }, [jobs]);
  //text value controller
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  //mutation
  const postMutation = useMutation({
    mutationFn: postJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", colId] });
    },
    onError: () => {
      throw new Error();
    },
  });

  function handlePostCards() {
    postMutation.mutate({
      title: title,
      column_id: colId,
      description: description,
      position: sortedJobs.length + 1,
    });
  }
  const positionMutation = useMutation({
    mutationFn: batchJobUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", colId] });
    },
  });
  async function handleChangePosition(direction: number, card_id: string) {
    const currentIndex = sortedJobs.findIndex((job) => job.card_id === card_id);
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const updateData =
      direction === -1
        ? [
            {
              card_id: sortedJobs[currentIndex].card_id,
              position: sortedJobs[currentIndex].position - 1,
            },
            {
              card_id: sortedJobs[prevIndex].card_id,
              position: sortedJobs[prevIndex].position + 1,
            },
          ]
        : [
            {
              card_id: sortedJobs[currentIndex].card_id,
              position: sortedJobs[currentIndex].position + 1,
            },
            {
              card_id: sortedJobs[nextIndex].card_id,
              position: sortedJobs[nextIndex].position - 1,
            },
          ];
    try {
      await positionMutation.mutateAsync(updateData);
      console.log("Records updated successfully");
    } catch (error) {
      console.error("Error updating records", error);
    }
  }
  return (
    <>
      <Paper sx={paperStyle}>
        <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold", color: "rgb(41, 41, 41)" }}
          >
            {colTitle}
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              aria-label="job-settings"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleButtonMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleClose} sx={{ color: "#262779" }}>
                <EditIcon /> Edit title
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
                <DeleteForeverIcon /> Delete
              </MenuItem>
            </Menu>
          </div>
        </Stack>
        <Stack spacing={2} sx={{ overflow: "auto", maxHeight: "70dvh" }}>
          {sortedJobs?.map((job) => (
            <JobCard
              key={job.card_id}
              description={job.description}
              title={job.title}
              ownerCol={colId}
              card_id={job.card_id}
            >
              <>
                <Box display="flex" justifyContent="left">
                  <ArrowDropUpIcon
                    sx={{
                      fontSize: 30,
                      "&:hover": {
                        color: "info.main",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangePosition(-1, job.card_id);
                    }}
                  />

                  <ArrowDropDownIcon
                    sx={{
                      fontSize: 30,
                      "&:hover": {
                        color: "info.main",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangePosition(1, job.card_id);
                    }}
                  />
                </Box>
                <Divider sx={{ mb: 2 }} />
                {job.title}
              </>
            </JobCard>
          ))}
        </Stack>
        <Box sx={{ mt: 2, color: "rgb(41, 41, 41)" }}>
          <ModalCompound buttontxt="Add Card">
            <ModalCompound.Title>Add new job</ModalCompound.Title>
            <ModalCompound.TextInput
              maxRows={2}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
              }}
            >
              Tiltle
            </ModalCompound.TextInput>
            <ModalCompound.TextInput
              rows={10}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
            >
              Description
            </ModalCompound.TextInput>
            <ModalCompound.Btn
              customcolor="#337926"
              custombgcolor="#5de44571"
              onClick={handlePostCards}
            >
              Submit
            </ModalCompound.Btn>
          </ModalCompound>
        </Box>
      </Paper>
    </>
  );
}

export default BoardCol;
