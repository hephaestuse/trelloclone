import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBoardData } from "../services/boards";
import { Box } from "@mui/material";
import BoardCol from "../features/board/BoardCol";
import { getCols } from "../services/cols";
const boxStyle = {
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  width: "100%",
  height: "100%",
  margin: 0,
  padding: "0!important",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(128, 128, 128, 0.8)",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
};
function Boardpage() {
  const { boardId } = useParams();
  const { data } = useQuery({
    queryKey: ["currentBoardData"],
    queryFn: () => getBoardData(boardId),
  });
  console.log(data);

  const { data: cols } = useQuery({
    queryKey: ["currentBoardcols"],
    queryFn: () => getCols(boardId),
  });

  if (cols) {
    cols.sort((a, b) => a.position - b.position);
  }

  if (data?.bg_Img) {
    document.body.style.backgroundImage = `url(${data.bg_Img})`;
  }
  if (data?.bg_Img === null) {
    document.body.style.backgroundImage = "";
  }

  return (
    <Box sx={boxStyle}>
      {cols?.map((cols) => (
        <BoardCol key={cols.columns_id} colTitle={cols.name} />
      ))}
    </Box>
  );
}

export default Boardpage;
