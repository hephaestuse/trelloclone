import styled from "@emotion/styled";
import { Paper } from "@mui/material";

type props = {
  children: React.ReactNode;
  onclickfn?: any;
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
function JobCard({ children, onclickfn }: props) {

  return <CustomPaper onClick={onclickfn}>{children}</CustomPaper>;
}

export default JobCard;
