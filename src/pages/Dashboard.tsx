import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import BoardCard from "../ui/BoardCard";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../services/boards";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const naviagte = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const { data, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(userId),
  });
  function handleClick(id: string) {
    naviagte(`/board/${id}`);
  }
  document.body.style.backgroundImage = ``;
  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <Typography
          variant="h4"
          color="textDisabled"
          component="p"
          marginX={5}
          sx={{ marginLeft: "auto" }}
        >
          boards
        </Typography>
        <Box
          sx={{
            backgroundColor: "GrayText",
            width: "70%",
            height: 2,
            marginLeft: "auto",
          }}
        ></Box>
      </Stack>
      {isLoading && (
        <CircularProgress size={100} sx={{ display: "flex", margin: "auto" }} />
      )}
      <Grid2 container spacing={3}>
        {data?.map((board) => (
          <BoardCard
            key={board.board_id}
            imgUrl={board.bg_Img}
            onclickFn={() => handleClick(board.board_id)}
          >
            {board.name}
          </BoardCard>
        ))}
        {!isLoading ? <BoardCard type="plus"></BoardCard> : null}
      </Grid2>
    </Container>
  );
}
export default Dashboard;
