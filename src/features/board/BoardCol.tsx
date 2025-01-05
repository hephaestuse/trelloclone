import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import JobCard from "./JobCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobs, postJobs } from "../../services/Jobs";
import React from "react";
import ModalCompound from "../../components/ModalCompound";
type props = { colTitle: string; colId: string };

function BoardCol({ colTitle, colId }: props) {
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
  // const mutation = useMutation({
  //   mutationFn: postJobs,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["jobs", colId] });
  //   },
  //   onError: () => {
  //     throw new Error();
  //   },
  // });
  return (
    <>
      <Paper
        sx={{
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
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold", color: "rgb(41, 41, 41)" }}
          >
            {colTitle}
          </Typography>
          <IconButton aria-label="job-settings" sx={{ ml: "auto" }}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
        <Stack spacing={2} sx={{ overflow: "auto", maxHeight: "70dvh" }}>
          {sortedJobs?.map((job) => (
            <JobCard key={job.card_id}>{job.title}</JobCard>
          ))}
        </Stack>
        <Box sx={{ mt: 2, color: "rgb(41, 41, 41)" }}>
          <ModalCompound buttontxt="Add Card">
            <ModalCompound.Title>Add new job</ModalCompound.Title>
            <ModalCompound.TextInput maxRows={2}>
              Tiltle
            </ModalCompound.TextInput>
            <ModalCompound.TextInput rows={10}>
              Description
            </ModalCompound.TextInput>
            <ModalCompound.Btn>Submit</ModalCompound.Btn>
          </ModalCompound>
        </Box>
      </Paper>
    </>
  );
}

export default BoardCol;
