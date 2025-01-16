import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";
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
        <CustomButton
          autoCapitalize="words"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          {buttontxt ? buttontxt : "open"}
        </CustomButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>{children}</Box>
        </Modal>
      </div>
    </ModalContext.Provider>
  );
}

//children of ModalContext.Provider
//ModalBtn
function Btn({
  children,
  customcolor,
  custombgcolor,
  onClick,
}: TModal & {
  customcolor?: string;
  custombgcolor?: string;
  onClick?: () => void;
}) {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Btn must be used within a ModalCompound");
  }
  return (
    <CustomButton
      autoCapitalize="words"
      size="small"
      startIcon={<AddIcon />}
      onClick={onClick}
      customcolor={customcolor}
      custombgcolor={custombgcolor}
    >
      {children}
    </CustomButton>
  );
}
//ModalTextInput
type TModalTextInput = {
  children: React.ReactNode;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & ({ rows: number; maxRows?: never } | { maxRows: number; rows?: never });
function TextInput({
  children,
  maxRows = 1,
  fullWidth = true,
  rows = 0,
  onChange,
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
      onChange={onChange}
    />
  );
}
//ModalTitle
type TModalTitle = {
  children: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline";
  component?: React.ElementType;
};
function Title({ children, variant = "h6", component = "h2" }: TModalTitle) {
  return (
    <Typography variant={variant} component={component}>
      {children}
    </Typography>
  );
}
//addchildren

ModalCompound.Btn = Btn;
ModalCompound.TextInput = TextInput;
ModalCompound.Title = Title;
export default ModalCompound;
