import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBoardData } from "../services/boards";
import { Box} from "@mui/material";
import BoardCol from "../features/board/BoardCol";
import { getCols } from "../services/cols";
import React, { useEffect } from "react";
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
    queryKey: ["currentBoardData", boardId],
    queryFn: () => getBoardData(boardId),
    enabled: !!boardId,
  });

  const { data: cols } = useQuery({
    queryKey: ["currentBoardcols", boardId],
    queryFn: () => getCols(boardId),
    enabled: !!boardId,
  });

  useEffect(() => {
    if (data?.bg_Img) {
      document.body.style.backgroundImage = `url(${data.bg_Img})`;
    } else {
      document.body.style.backgroundImage = "";
    }
  }, [data?.bg_Img]);

  const sortedCols = React.useMemo(() => {
    if (cols) {
      return [...cols].sort((a, b) => a.position - b.position);
    }
    return [];
  }, [cols]);

  return (
    <Box sx={boxStyle}>
      {sortedCols.map((col) => (
        <BoardCol key={col.columns_id} colTitle={col.name} />
      ))}
    </Box>
  );
}

export default Boardpage;
