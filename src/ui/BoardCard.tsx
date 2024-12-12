import { Grid2 } from "@mui/material";

type props = {
  gridTemplate?: object;
  children: string;
  imgUrl?: string;
  overeffect?: boolean;
};
const pallet = ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"];
function getRandomColor() {
  const color = pallet[Math.floor(Math.random() * 5)];
  console.log(color);

  return color;
}

function BoardCard({
  overeffect = true,
  imgUrl,
  children,
  gridTemplate = { xs: 6, md: 4, lg: 3 },
}: props) {
  return (
    <Grid2
      className={overeffect ? "hoverParent" : ""}
      component={"div"}
      size={gridTemplate}
      padding={1}
      sx={{
        backgroundColor: imgUrl ? undefined : getRandomColor(),
        backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 120,
        borderRadius: 2,
        color: "white",
        fontWeight: "bold",
        textShadow: "0px 1px 2px #000000",
        boxShadow: "0px 0px 5px 2px #ececec",
        position: "relative",
        overflow: "hidden", // جلوگیری از خروج overlay از Grid2
        "&:hover": {
          cursor: "pointer", // تغییر نشانگر برای نمایش حالت تعاملی
        },
      }}
    >
      {children}
      {overeffect ? <div className="blackOverlay"></div> : null}
    </Grid2>
  );
}

export default BoardCard;
