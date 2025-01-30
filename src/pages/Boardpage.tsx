import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBoardData } from "../services/boards";
import { Box, Paper } from "@mui/material";
import BoardCol from "../features/board/BoardCol";
import { addCol, getCols } from "../services/cols";
import React, { useEffect } from "react";
import ModalCompound from "../components/ModalCompound";
const boxStyle = {
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  width: "100%",
  height: "90dvh",
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
const paperStyle = {
  background: "rgba(255, 255, 255, 0.685)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  minWidth: 250,
  height: "fit-content",
  maxHeight: "100dvh",
  m: 1,
  py: 2,
  px: 1,
  color: "rgb(80, 80, 80)",
  transition: "0.3s",
  "&:hover": {
    cursor: "pointer",
    color: "black",
  },
};
function Boardpage() {
  const [title, setTitle] = React.useState("");
  const { boardId } = useParams();
  const queryClient = useQueryClient();
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
  const addColMutation = useMutation({
    mutationFn: addCol,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["currentBoardcols", boardId],
      }),
  });
  function handleAddCol() {
    if (title) {
      const postData = {
        name: title,
        board_id: boardId,
        position: sortedCols.length + 1,
      };
      addColMutation.mutate(postData);
      setTitle("");
    }
  }
  return (
    <Box sx={boxStyle}>
      {sortedCols.map((col) => (
        <BoardCol
          key={col.columns_id}
          colTitle={col.name}
          colId={col.columns_id}
        />
      ))}
      <Paper sx={paperStyle}>
        {/* <AddIcon sx={{ fontSize: 30 }} /> add new column */}
        <ModalCompound buttontxt="Add new column">
          <ModalCompound.TextInput
            maxRows={2}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          >
            Tiltle
          </ModalCompound.TextInput>
          <ModalCompound.Btn onClick={handleAddCol}>
            Add column
          </ModalCompound.Btn>
        </ModalCompound>
      </Paper>
    </Box>
  );
}

export default Boardpage;
