import { Container, Grid2 } from "@mui/material";
import BoardCard from "../ui/BoardCard";

function Dashboard() {
  return (
    <Container>
      <Grid2 container spacing={1}>
        <BoardCard imgUrl="https://huqcuwgqbbzjbtxqlyio.supabase.co/storage/v1/object/sign/userAvatar/ahad.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VyQXZhdGFyL2FoYWQuanBnIiwiaWF0IjoxNzMzODI2NzgzLCJleHAiOjE3NjUzNjI3ODN9.se6YEuqsOWDbL5-gt8ylRwMyt_veZyBR54EUmXk7YJw&t=2024-12-10T10%3A33%3A04.705Z">sekjghskjebvkjb</BoardCard>
        <BoardCard>sekjghskjebvkjb</BoardCard>
        <BoardCard>sekjghskjebvkjb</BoardCard>
        <BoardCard>sekjghskjebvkjb</BoardCard>
        <BoardCard>sekjghskjebvkjb</BoardCard>
        <BoardCard>sekjghskjebvkjb</BoardCard>
      </Grid2>
    </Container>
  );
}
export default Dashboard;
