import styled from "@emotion/styled";
import { Title } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type TjobCard = {
  children: React.ReactNode;
  description: string;
  title: string;
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
function JobCard({ children, description, title }: TjobCard) {
  const [inputdisable, setInputDisable] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleEdit() {
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
              {title}
            </Typography>
          ) : (
            <TextField value={title}></TextField>
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
              {description}
            </Typography>
          ) : (
            <TextField
              multiline
              margin="normal"
              fullWidth={true}
              // onChange={}
              value={description ? description : "there is no description!"}
            />
          )}
          <CustomButton
            customcolor={inputdisable ? "#262779" : "#337926"}
            custombgcolor={inputdisable ? "#4548e470" : "#5de44571"}
            onClick={handleEdit}
          >
            {inputdisable ? "Eddit" : "Save"}
          </CustomButton>
          <CustomButton
            customcolor={"#792634"}
            custombgcolor={"#e4455a6f"}
            // onClick={}
          >
            Delete
          </CustomButton>
        </Box>
      </Modal>
    </>
  );
}
export default JobCard;
