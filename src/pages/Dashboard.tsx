import {
  Box,
  Button,
  Container,
  Grid2,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BoardCard from "../ui/BoardCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBoard, getBoards } from "../services/boards";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "@emotion/styled";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CustomButton = styled(Button)<{
  customcolor?: string;
  custombgcolor?: string;
}>(({ customcolor, custombgcolor }) => ({
  textTransform: "capitalize",
  color: customcolor || "#292929",
  "&:hover": {
    backgroundColor: custombgcolor || "#00000019",
  },
}));
function Dashboard() {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoarDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const user_id = useSelector((state: RootState) => state.user.userId);
  const handleOpenModal = (): void => setOpenModal(true);
  const handleCloseModal = (): void => setOpenModal(false);
  function handleClickModal() {
    handleOpenModal();
  }
  const naviagte = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const { data, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(userId),
  });
  function handleClick(id: string) {
    naviagte(`/board/${id}`);
  }
  const { mutate } = useMutation({
    mutationFn: addBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  function handleAddBoard() {
    mutate({
      owner_id: user_id,
      name: boardName,
      description: boardDescription,
    });
    handleCloseModal();
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
        {!isLoading ? (
          <BoardCard type="plus" onclickFn={handleClickModal}></BoardCard>
        ) : null}
      </Grid2>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add board
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            label={"Board name"}
            multiline
            maxRows={2}
            margin="normal"
            fullWidth={true}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <TextField
            id="outlined-multiline-flexible"
            label={"Description"}
            multiline
            maxRows={2}
            margin="normal"
            fullWidth={true}
            onChange={(e) => setBoarDescription(e.target.value)}
          />
          <CustomButton
            autoCapitalize="words"
            size="small"
            customcolor="#337926"
            custombgcolor="#5de44571"
            onClick={handleAddBoard}
          >
            Add
          </CustomButton>
        </Box>
      </Modal>
    </Container>
  );
}
export default Dashboard;
