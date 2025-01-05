import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
type TModal = { children: React.ReactNode; buttontxt?: string };
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

const CustomButton = styled(Button)({
  textTransform: "capitalize",
  color: "rgb(41, 41, 41)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

type ModalContextType = {
  handleOpen: () => void;
  handleClose: () => void;
};

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

function ModalCompound({ children, buttontxt }: TModal) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ModalContext.Provider value={{ handleOpen, handleClose }}>
      <div>
        {/* <CustomButton
        autoCapitalize="words"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        add card
      </CustomButton> */}
        <CustomButton
          autoCapitalize="words"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          {buttontxt ? buttontxt : "open"}
        </CustomButton>
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {children}
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          </Box>
        </Modal>
      </div>
    </ModalContext.Provider>
  );
}

//children of ModalContext.Provider
//ModalBtn
function Btn({ children }: TModal) {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Btn must be used within a ModalCompound");
  }
  const { handleOpen } = context;
  return (
    <CustomButton
      autoCapitalize="words"
      size="small"
      startIcon={<AddIcon />}
      onClick={handleOpen}
    >
      {children}
    </CustomButton>
  );
}
//ModalTextInput
type TModalTextInput = {
  children: React.ReactNode;
  fullWidth?: boolean;
} & ({ rows: number; maxRows?: never } | { maxRows: number; rows?: never });
function TextInput({
  children,
  maxRows = 1,
  fullWidth = true,
  rows = 0,
}: TModalTextInput) {
  return (
    <TextField
      id="outlined-multiline-flexible"
      label={children}
      multiline
      maxRows={maxRows}
      rows={rows}
      margin="normal"
      fullWidth={fullWidth}
    />
  );
}
//addchildren

ModalCompound.Btn = Btn;
ModalCompound.TextInput = TextInput;
export default ModalCompound;
