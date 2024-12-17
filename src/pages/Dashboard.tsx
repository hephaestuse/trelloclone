import { Container, Grid2 } from "@mui/material";
import BoardCard from "../ui/BoardCard";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../services/boards";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CircularProgress from "@mui/material/CircularProgress";
function Dashboard() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const { data, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(userId),
  });
  return (
    <Container>
      {isLoading && (
        <CircularProgress size={100} sx={{ display: "flex", margin: "auto" }} />
      )}

      <Grid2 container spacing={1}>
        {data?.map((board) => (
          <BoardCard key={board.board_id} imgUrl={board.bg_Img}>
            {board.name}
          </BoardCard>
        ))}
        {isLoading || <BoardCard type="plus"></BoardCard>}
      </Grid2>
    </Container>
  );
}
export default Dashboard;
