import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../services/Jobs";
import React from "react";
type props = { colTitle: string; colId: string };

const CustomButton = styled(Button)({
  textTransform: "capitalize",
  color: "rgb(41, 41, 41)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
function BoardCol({ colTitle, colId }: props) {
  const { data: jobs, isLoading } = useQuery({
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

  return (
    <>
      <Paper
        sx={{
          background: "rgba(255, 255, 255, 0.685)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          minWidth: 250,
          height: "fit-content",
          maxHeight: "100%",
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
        <Stack spacing={2}>
          {sortedJobs?.map((job) => (
            <JobCard>{job.title}</JobCard>
          ))}
        </Stack>
        <Box sx={{ mt: 2, color: "rgb(41, 41, 41)" }}>
          <CustomButton
            autoCapitalize="words"
            size="small"
            startIcon={<AddIcon />}
          >
            add card
          </CustomButton>
        </Box>
      </Paper>
    </>
  );
}

export default BoardCol;
