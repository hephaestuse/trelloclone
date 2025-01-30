import styled from "@emotion/styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobs, updateJobs } from "../../services/Jobs";

type TjobCard = {
  children: React.ReactNode;
  description: string;
  title: string;
  ownerCol: string;
  card_id: string;
};
const CustomPaper = styled(Paper)(() => ({
  background: "rgb(235, 235, 235)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  minWidth: 200,
  height: "fit-content",
  color: "rgb(80, 80, 80)",
  outlineOffset: 3,
  cursor: "pointer",
  padding: "15px 10px",
  "&:hover": {
    backgroundColor: "rgb(243, 243, 243)",
    outline: "solid 2px blue",
  },
  transition: "background-color 0.2s",
}));
const style = {
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
function JobCard({
  children,
  description,
  title,
  card_id,
  ownerCol: colId,
}: TjobCard) {
  const [inputdisable, setInputDisable] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [Description, setChangedDescription] = React.useState(description);
  const [Title, setChangedTitle] = React.useState(title);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleEdit() {
    setInputDisable(!inputdisable);
  }
  const queryClient = useQueryClient();
  const DeleteMutation = useMutation({
    mutationFn: deleteJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", colId] });
    },
  });
  function handleDeleteCard(card_id: string) {
    try {
      DeleteMutation.mutateAsync(card_id);
    } catch (error) {
      console.error("Error deleting card", error);
    }
  }
  const UpdateMutation = useMutation({
    mutationFn: updateJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", colId] });
    },
  });
  function handleUpdateCard() {   
    try {
      UpdateMutation.mutateAsync({
        updateData: {
          title: Title,
          description: Description,
        },
        card_id: card_id,
      });
      setInputDisable(!inputdisable);
    } catch (error) {
      console.error("Error updating card", error);
    }
    setInputDisable(!inputdisable);
  }
  return (
    <>
      <CustomPaper onClick={handleOpen}>{children}</CustomPaper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {inputdisable ? (
            <Typography variant="h5" component="h2">
              {Title}
            </Typography>
          ) : (
            <TextField
              value={Title}
              onChange={(e) => setChangedTitle(e.target.value)}
            ></TextField>
          )}

          {inputdisable ? (
            <Typography
              sx={{
                border: "1px solid#262779",
                borderRadius: "5px",
                padding: 2,
                marginY: 2,
              }}
              variant="body1"
              component="h6"
            >
              {Description}
            </Typography>
          ) : (
            <TextField
              multiline
              margin="normal"
              fullWidth={true}
              onChange={(e) => setChangedDescription(e.target.value)}
              value={Description ? Description : "there is no description!"}
            />
          )}
          <CustomButton
            customcolor={inputdisable ? "#262779" : "#337926"}
            custombgcolor={inputdisable ? "#4548e470" : "#5de44571"}
            onClick={inputdisable ? handleEdit : handleUpdateCard}
          >
            {inputdisable ? <EditIcon /> : <SaveIcon />}
            {inputdisable ? "Eddit" : "Save"}
          </CustomButton>
          <CustomButton
            customcolor={"#792634"}
            custombgcolor={"#e4455a6f"}
            onClick={() => handleDeleteCard(card_id)}
          >
            <DeleteForeverIcon
              sx={{
                fontSize: 20,
                marginLeft: "auto",
                "&:hover": {
                  color: "error.main",
                },
              }}
            />
            Delete
          </CustomButton>
        </Box>
      </Modal>
    </>
  );
}
export default JobCard;
